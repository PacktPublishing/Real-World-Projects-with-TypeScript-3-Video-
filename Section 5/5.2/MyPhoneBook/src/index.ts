/// <reference path="contactManager.ts" />

namespace PhoneBook {
    export class Application {

        private _contactManager: ContactManager;
        private _documentLoaded: boolean = false;
        private _deviceReady: boolean = false;

        // Houses the complete list of contacts when on the home page.
        private _listObject: HTMLDivElement;

        public constructor() {
            document.addEventListener( "deviceready", this.onDeviceReady.bind( this ), false );
            document.addEventListener( "contactsloaded", this.onContactsLoaded.bind( this ), false );
            window.addEventListener( "load", this.onDocumentLoaded.bind( this ) );
        }

        private initialize(): void {
            this._contactManager = new ContactManager();

            this.setupElementsFromPage();

            // If the list element is present, list out all contacts.
            if ( this._listObject !== undefined && this._listObject !== null ) {
                this._contactManager.loadContacts();
            }
        }

        private onDocumentLoaded(): void {
            this._documentLoaded = true;
            if ( this._deviceReady ) {
                this.initialize();
            }
        }

        private onDeviceReady(): void {
            this._deviceReady = true;
            if ( this._documentLoaded ) {
                this.initialize();
            }
        }

        private setupElementsFromPage(): void {
            this._listObject = document.getElementById( "contact-list" ) as HTMLDivElement;
        }

        private onContactsLoaded(): void {
            if ( this._listObject !== undefined && this._listObject !== null ) {
                this.outputContactList();
            }
        }

        private outputContactList(): void {
            // Create an entry for each contact.
            for ( let contact of this._contactManager.contacts ) {
                this._listObject.appendChild( DocumentHelper.CreateContactListItem( contact ) );
            }
        }
    }
}

var app: PhoneBook.Application = new PhoneBook.Application();