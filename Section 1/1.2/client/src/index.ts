namespace Chat {

    export class App {
        private static _serverConnection: ServerConnection;
        
        public static start(): void {

            // Prepare a server connection.
            App._serverConnection = new ServerConnection(
                "127.0.0.1",
                5001,
                App.onConnected,
                App.processPacket,
                App.onDisconnected );

            DocumentHelper.initialize();
        }

        public static connect(): void {
            App._serverConnection.connect();
        }

        public static disconnect(): void {
            App._serverConnection.disconnect();
            DocumentHelper.toggleLogin( true );

            // Clear the user box.
            DocumentHelper.getInputElement( "username" ).value = "";
        }

        /** Sends the content in the entry box as a chat message. */
        public static sendChat(): void {
            let input = DocumentHelper.getInputElement( "entry" );
            let text = input.value;
            input.value = "";

            // Special cases for commands.
            if ( text[0] == "/" ) {
                let command = text.substr( 1 ).toLowerCase();
                if ( command === "logout" || command === "disconnect" || command === "quit" ) {
                    App.disconnect();
                }

                return;
            }

            let request = {
                requestType: RequestType.CHAT_SEND,
                message: text
            };
            this._serverConnection.send( request );
        }

        private static onConnected(): void {
            let username = DocumentHelper.getInputElement( "username" ).value;

            // Attempt login.
            DocumentHelper.toggleLogin( username === undefined );
            App._serverConnection.login( username );
        }

        private static onDisconnected(): void {
            DocumentHelper.toggleLogin( true );
            DocumentHelper.appendMessage( UserData.SERVER, "You have been disconnected from the chat server." );
        }

        private static processPacket( packet: IResponsePacket ): void {
            switch ( packet.responseType ) {
                case ResponseType.CHAT_RESULT:

                    // Add message to the log.
                    let response = packet as ChatResponse;
                    DocumentHelper.appendMessage( response.userData, response.content );
                    break;
                case ResponseType.LOGIN_RESULT:
                    let result = packet as LoginResponse;
                    if ( result.success ) {
                        DocumentHelper.appendMessage( UserData.SERVER, "Welcome to the chat server." );
                    }
                    DocumentHelper.toggleLogin( !result.success );
                    break;
            }
        }
    }
}