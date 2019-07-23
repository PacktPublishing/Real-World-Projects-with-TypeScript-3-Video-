var contactsLoaded: Event = new Event( "contactsloaded" );

namespace PhoneBook {
    export class ContactManager {

        private _contacts: Contact[] = [];

        public get contacts(): Contact[] {
            return this._contacts;
        }

        public loadContacts(): void {
            let options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;

            // Return all contact fields.
            let fields = ["*"];
            navigator.contacts.find(
                fields,
                this.onContactFindSuccess.bind( this ),
                this.onContactFindError.bind( this ),
                options );
        }

        private onContactFindSuccess( contacts: Contact[] ): void {
            this._contacts = contacts;
            document.dispatchEvent( contactsLoaded );
        }

        private onContactFindError( error: ContactError ): void {
            console.error( "Error retrieving contacts:" + error.message );
        }
    }
}