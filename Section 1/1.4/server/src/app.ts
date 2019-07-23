import WebSocket from "websocket";
import Http from "http";
import { ClientConnection } from "./clientConnection";
import { UserManager, UserData } from "./users";
import { ResponseType } from "./responsePackets";

export class Server {

    // Hold all connections.
    private static _connections: { [connectionID: number]: ClientConnection } = {};


    public static broadcast( response: any ): void {
        Object.values( Server._connections ).map( x => x ).forEach( x => x.send( response ) );
    }

    public constructor( public readonly port: number ) {

        // Create the http server.
        let httpServer = Http.createServer( this.listenerCallback.bind( this ) );

        // Create the websocket server and pass the http server to it.
        let wsServer = new WebSocket.server( { httpServer: httpServer } );

        // Setup event handlers.
        wsServer.on( "request", this.onWebSocketRequest.bind( this ) );

        // Listen
        httpServer.listen( this.port, this.requestCallback.bind( this ) );
    }

    public static getConnectedUserIds(): number[] {
        return Object.values( Server._connections ).map( x => x.userId ).filter( x => x !== -1 );
    }

    public onClientDisconnected( client: ClientConnection ): void {

        // If client was authenticated, tell all the other clients about the disconnect.
        if ( client.userId !== -1 ) {
            console.log( "User disconnected: " + client.userId );
            let user = UserManager.getUserDataForId( client.userId );
            let message = ( user ? user.name : "Someone" ) + " has gone offline.";
            let response = {
                responseType: ResponseType.CHAT_RESULT,
                userData: UserData.SERVER,
                content: message
            };
            Server.broadcast( response );
        }

        console.log( "Connection id disconnected: " + client.connectionID );
        Server._connections[client.connectionID] = undefined;
        delete Server._connections[client.connectionID];
    }

    public onClientAuthenticated( client: ClientConnection ): void {

        // If the client is authenticated, tell all the other clients about the connection.
        if ( client.userId !== -1 ) {
            console.log( "User signed on: " + client.userId );
            let user = UserManager.getUserDataForId( client.userId );
            let message = ( user ? user.name : "Someone" ) + " has come online.";
            let response = {
                responseType: ResponseType.CHAT_RESULT,
                userData: UserData.SERVER,
                content: message
            };
            Server.broadcast( response );
        }
    }

    private listenerCallback( message: Http.IncomingMessage, response: Http.ServerResponse ): void {
        // Handle HTTP requests. This will be useful for registration.
    }

    private requestCallback(): void {
        console.log( ( new Date() ) + " - Server started and listening on port: " + this.port );
    }

    private onWebSocketRequest( request: WebSocket.request ): void {
        console.log( ( new Date() ) + " - New client connection:" + request.remoteAddress );
        let connection = new ClientConnection( this, request );
        Server._connections[connection.connectionID] = connection;
    }
}

// Server config
process.title = "Chat Sever";
var server = new Server( 5001 );