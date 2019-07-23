namespace Chat {

    /** Handles a connection to the chat server. */
    export class ServerConnection {
        private _connection: WebSocket;

        public constructor(
            public readonly host: string,
            public readonly port: number,
            private _connectionCallback: () => void,
            private _packetResponseCallback: ( packet: IResponsePacket ) => void,
            private _connectionCloseCallback: () => void ) {
        }

        public connect(): void {
            this._connection = new WebSocket( `ws://${this.host}:${this.port}` );
            this._connection.addEventListener( "open", this._connectionCallback.bind( this ) );
            this._connection.addEventListener( "error", () => alert( "Unable to connect to server." ) );
            this._connection.addEventListener( "message", this.onMessage.bind( this ) );
            this._connection.addEventListener( "close", this._connectionCloseCallback.bind( this ) );
        }

        public login( username: string ): void {
            // SECURITY NOTE: This should not be sent in clear text, but should be hashed and sent.
            // The server should then compare the password against its own hashed version
            // of the password.
            let request = {
                requestType: RequestType.LOGIN,
                username: username
            }
            this._connection.send( JSON.stringify( request ) );
        }

        public disconnect(): void {
            this._connection.close( 1000, "User disconnect" );
        }

        public send( request: any ): void {
            this._connection.send( JSON.stringify( request ) );
        }

        private onMessage( message: MessageEvent ): void {
            this._packetResponseCallback( JSON.parse( message.data ) as IResponsePacket );
        }
    }
}