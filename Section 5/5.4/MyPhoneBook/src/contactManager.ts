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

        public loadContactById( id: string ): void {
            let options = new ContactFindOptions();
            options.filter = id;
            options.multiple = false;

            // Return all contact fields.
            let fields = ["id"];
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

        public updateContact( id: string, firstName: string, lastName: string, phone: string ): void {

            // Use the first contact since it's the only one that would have been 
            // found in the search.
            let contact = this._contacts[0];
            contact.id = id;

            // Update the values
            contact.name.givenName = firstName;
            contact.name.familyName = lastName;
            contact.displayName = firstName + " " + lastName;
            contact.phoneNumbers[0].value = phone;

            // Save the contact.
            contact.save(
                ( contact: Contact ) => {
                    console.log( "Contact saved: " + contact.displayName );
                    window.location.href = "index.html";
                },
                ( error: Error ) => {
                    console.error( "Unable to save contact. Error: " + error.message );
                }
            );
        }

        public deleteContact( id: string ): boolean {
            if ( !confirm( "Do you really want to delete this contact?" ) ) {
                return false;
            }

            let options = new ContactFindOptions();
            options.filter = id;
            options.multiple = false;

            // Return all contact fields.
            let fields = ["id"];
            navigator.contacts.find(
                fields,
                this.onContactDeleteFindSuccess.bind( this ),
                this.onContactFindError.bind( this ),
                options );

            return true;
        }

        private onContactDeleteFindSuccess( contacts: Contact[] ): void {
            contacts[0].remove(
                () => {
                    console.log( "Contact removed." );
                    window.location.href = "index.html";
                },
                ( error: Error ) => {
                    console.log( "Error: Contact unable to be removed: " + error.message );
                } );
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