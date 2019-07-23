namespace PhoneBook {

    export class DocumentHelper {

        public static GetInputElement( elementId: string ): HTMLInputElement {
            return document.getElementById( elementId ) as HTMLInputElement;
        }

        public static CreateSpan( className: string, content: string ): HTMLSpanElement {
            let span = document.createElement( "span" );
            span.className = className;
            span.innerHTML = content;
            return span;
        }

        public static CreateDiv( className: string ): HTMLDivElement {
            let div = document.createElement( "div" );
            div.className = className;
            return div;
        }

        public static CreateContactListItem( contact: Contact ): HTMLDivElement {
            let item = DocumentHelper.CreateDiv( "contact-item" );

            // Attach the contact to the item element.
            item.setAttribute( "data-contactId", contact.id );
            item.addEventListener( "click", function () {
                
                // Pass the id to editContact.html. "this" context is the element that was clicked.
                window.location.href = "editContact.html?id=" + this.getAttribute( "data-contactId" );
            } );

            // The name of the contact.
            item.appendChild( DocumentHelper.CreateSpan( "contact-name", contact.displayName ) );

            // The contact phone number
            let content = contact.phoneNumbers[0] ? contact.phoneNumbers[0].value : "";
            item.appendChild( DocumentHelper.CreateSpan( "contact-phone", content ) );

            return item;
        }
    }
}