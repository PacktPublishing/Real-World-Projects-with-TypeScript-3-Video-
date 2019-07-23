import WebSocket from "websocket";
import { ResponseType } from "./responsePackets";
import { UserManager } from "./users";
import { RequestType } from "./requestPackets";
import { Server } from "./app";

/**
 * Represents a single client connection.
 */
export class ClientConnection {
    private static _GLOBAL_CONNECTION_ID: number = 0;

    private _server: Server;
    private _connection: WebSocket.connection;
    private _connectionID: number;
    private _userId: number = -1;

    public constructor( server: Server, request: WebSocket.request ) {
        this._server = server;

        // Set the connection id and increment the global counter.
        this._connectionID = ClientConnection._GLOBAL_CONNECTION_ID++;

        // Create the connection.
        this._connection = request.accept( null, request.origin );

        // Setup event handlers.
        this._connection.on( "message", this.onMessage.bind( this ) );

        this._connection.on( "close", ( code: number, description: string ) => {
            console.log( `Connection closed (${this._connectionID}):`, code, description )
            this._server.onClientDisconnected( this );
        } );

        this._connection.on( "error", ( error: Error ) => {
            console.log( "Error:", error );
        } );
    }

    public get connectionID(): number {
        return this._connectionID;
    }

    public get userId(): number {
        return this._userId;
    }

    public send( response: any ): void {
        this._connection.sendUTF( JSON.stringify( response ) );
    }

    public disconnect(): void {

        // Tell the server about the disconnection, then actually close the connection.
        this._server.onClientDisconnected( this );
        this._connection.close();
    }

    private onMessage( message: WebSocket.IMessage ): void {
        console.debug( message );

        // This only accepts text.
        if ( message.type === "utf8" ) {
            let packet = JSON.parse( message.utf8Data );
            if ( this._userId === -1 ) {
                // If the user is not authenticated, only process authentication requests are valid.
                if ( packet.requestType !== RequestType.LOGIN ) {
                    this.respondFail();
                } else {
                    if ( this.tryAuth( packet ) ) {
                        this.respondSuccess();
                    } else {
                        this.respondFail();
                    }
                }
            } else {

                // User is authenticated and sending a chat. Broadcast it to all users. 
                // Otherwise it is invalid - disconnect the user.
                if ( packet.requestType === RequestType.CHAT_SEND ) {
                    let response = {
                        responseType: ResponseType.CHAT_RESULT,
                        content: packet.message,
                        userData: UserManager.getUserDataForId( this.userId )
                    };
                    Server.broadcast( response );
                } else {
                    this.respondFail();
                }
            }
        }
    }

    private respondSuccess(): void {
        this.send( { responseType: ResponseType.LOGIN_RESULT, success: true } );

        // Notify other users this one has logged in.
        this._server.onClientAuthenticated( this );
    }

    private respondFail(): void {
        this.send( { responseType: ResponseType.LOGIN_RESULT, success: false } );
        this.disconnect();
    }

    private tryAuth( packet: any ): boolean {
        this._userId = UserManager.tryAuthenticateUser( packet );
        return this._userId !== -1;
    }
}