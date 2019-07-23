namespace Chat {

    export class DocumentHelper {

        public static initialize(): void {
            DocumentHelper.getInputElement( "username" ).addEventListener( "keyup", DocumentHelper.userKeyUp );
            DocumentHelper.getInputElement( "entry" ).addEventListener( "keyup", DocumentHelper.entryKeyUp );
        }

        public static toggleLogin( showLogin: boolean ): void {
            DocumentHelper.toggleForm( "joinDiv", showLogin );
            DocumentHelper.toggleForm( "inputWrapper", !showLogin );
        }

        public static getInputElement( id: string ): HTMLInputElement {
            return ( document.getElementById( id ) as HTMLInputElement )
        }

        public static userKeyUp( event: KeyboardEvent ): void {
            let value = DocumentHelper.getInputElement( "username" ).value;
            let valueEmpty = value === "";
            DocumentHelper.getInputElement( "loginbutton" ).disabled = valueEmpty;

            if ( event.keyCode === 13 ) {
                if ( valueEmpty ) {
                    alert( "A username is required." );
                } else {
                    App.connect();
                }
            }
        }

        public static entryKeyUp( event: KeyboardEvent ): void {
            let value = DocumentHelper.getInputElement( "entry" ).value;
            let valueEmpty = value === "";
            DocumentHelper.getInputElement( "sendbutton" ).disabled = valueEmpty;

            if ( event.keyCode === 13 && !valueEmpty ) {
                App.sendChat();
            }
        }

        public static appendMessage( userData: UserData, content: string ): void {
            if ( content.trim() !== "" ) {
                let wrapper = document.createElement( "div" );
                wrapper.className = "messageWrapper";
                let userSection = document.createElement( "span" );
                userSection.style.color = userData.color;
                userSection.innerHTML = `[${userData.name}]:&nbsp;`;
                let contentSection = document.createElement( "span" );

                // [img]https://www.gstatic.com/webp/gallery/1.jpg[/img]
                // <img src="https://www.gstatic.com/webp/gallery/1.jpg"/>
                let replacedContent = content.replace( /\[img\]/g, "<img src=\"" )
                .replace( /\[\/img\]/g, "\"/>" );

                contentSection.innerHTML = replacedContent;
                wrapper.appendChild( userSection );
                wrapper.appendChild( contentSection );

                let log = document.getElementById( "chatlog" );
                log.appendChild( wrapper );

                // Make sure to always scroll to the bottom.
                log.scrollTo( 0, log.clientHeight );
            }
        }

        private static toggleForm( id: string, value: boolean ): void {
            document.getElementById( id ).style.display = value ? "block" : "none";
        }
    }
}