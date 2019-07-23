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

        public addContact( firstName: string, lastName: string, phone: string ): void {
            let newContact = navigator.contacts.create( { 
                name: {
                    givenName: firstName,
                    familyName: lastName
                },
                phoneNumbers: [
                    {
                        type: "home",
                        value: phone,
                        pref: true
                    }
                ]
            } );

            // Save the contact.
            newContact.save(
                ( contact: Contact ) => {
                    console.log( "Contact added: " + contact.displayName );
                    window.location.href = "index.html";
                },
                ( error: Error ) => {
                    console.error( "Unable to add contact. Error: " + error.message );
                }
            );
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