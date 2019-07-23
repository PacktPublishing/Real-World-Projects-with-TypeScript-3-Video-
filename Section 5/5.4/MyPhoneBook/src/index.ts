/// <reference path="contactManager.ts" />

namespace PhoneBook {
    export class Application {

        private _isEditMode: boolean = false;
        private _contactManager: ContactManager;
        private _documentLoaded: boolean = false;
        private _deviceReady: boolean = false;

        // Houses the complete list of contacts when on the home page.
        private _listObject: HTMLDivElement;

        // input fields
        private _idField: HTMLInputElement;
        private _firstNameTextbox: HTMLInputElement;
        private _lastNameTextbox: HTMLInputElement;
        private _phoneTextbox: HTMLInputElement;

        // Buttons
        private _cancelButton: HTMLInputElement;
        private _createButton: HTMLInputElement;
        private _callButton: HTMLAnchorElement;
        private _updateButton: HTMLInputElement;
        private _deleteButton: HTMLInputElement;

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

            // Check if editing, and set the hidden field if so.
            if ( this._idField !== undefined && this._idField !== null ) {
                var urlParams = new URLSearchParams( window.location.search );
                let idParam = urlParams.get( "id" );
                this._idField.value = idParam;
                this._contactManager.loadContactById( idParam );
                this._isEditMode = true;
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

        private onCancelClicked(): void {
            document.location.href = 'index.html';
        }

        private createContact(): void {
            this._contactManager.addContact(
                this._firstNameTextbox.value,
                this._lastNameTextbox.value,
                this._phoneTextbox.value );
        }

        private updateContact(): void {
            this._contactManager.updateContact(
                this._idField.value,
                this._firstNameTextbox.value,
                this._lastNameTextbox.value,
                this._phoneTextbox.value );
        }

        private deleteContact(): void {
            this._contactManager.deleteContact( this._idField.value );
        }

        private setupElementsFromPage(): void {
            this._listObject = document.getElementById( "contact-list" ) as HTMLDivElement;

            // Input fields
            this._idField = DocumentHelper.GetInputElement( "idField" );
            this._firstNameTextbox = DocumentHelper.GetInputElement( "firstNameTextbox" );
            this._lastNameTextbox = DocumentHelper.GetInputElement( "lastNameTextbox" );
            this._phoneTextbox = DocumentHelper.GetInputElement( "phoneTextbox" );

            // Buttons
            this._cancelButton = DocumentHelper.GetInputElement( "cancelButton" );
            if ( this._cancelButton !== undefined && this._cancelButton !== null ) {
                this._cancelButton.addEventListener( "click", this.onCancelClicked.bind( this ) );
            }

            this._createButton = DocumentHelper.GetInputElement( "createButton" );
            if ( this._createButton !== undefined && this._createButton !== null ) {
                this._createButton.addEventListener( "click", this.createContact.bind( this ) );
            }

            this._callButton = document.getElementById( "callButton" ) as HTMLAnchorElement;

            this._updateButton = DocumentHelper.GetInputElement( "updateButton" );
            if ( this._updateButton !== undefined && this._updateButton !== null ) {
                this._updateButton.addEventListener( "click", this.updateContact.bind( this ) );
            }

            this._deleteButton = DocumentHelper.GetInputElement( "deleteButton" );
            if ( this._deleteButton !== undefined && this._deleteButton !== null ) {
                this._deleteButton.addEventListener( "click", this.deleteContact.bind( this ) );
            }
        }

        private onContactsLoaded(): void {
            if ( this._listObject !== undefined && this._listObject !== null ) {
                this.outputContactList();
            }

            if ( this._isEditMode ) {

                // If edit mode, assume that one contact has been loaded.
                let contact = this._contactManager.contacts[0];

                let phone = contact.phoneNumbers[0] ? contact.phoneNumbers[0].value : "";

                // Set call button href - remove all non-numerics from the phone number
                this._callButton.href = "tel:" + phone.replace( /[^0-9]+/g, "" );

                // Set fields
                this._idField.value = contact.id;
                this._firstNameTextbox.value = contact.name.givenName;
                this._lastNameTextbox.value = contact.name.familyName;
                this._phoneTextbox.value = phone;
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