var contactsLoaded = new Event("contactsloaded");
var PhoneBook;
(function (PhoneBook) {
    var ContactManager = /** @class */ (function () {
        function ContactManager() {
            this._contacts = [];
        }
        Object.defineProperty(ContactManager.prototype, "contacts", {
            get: function () {
                return this._contacts;
            },
            enumerable: true,
            configurable: true
        });
        ContactManager.prototype.loadContacts = function () {
            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;
            // Return all contact fields.
            var fields = ["*"];
            navigator.contacts.find(fields, this.onContactFindSuccess.bind(this), this.onContactFindError.bind(this), options);
        };
        ContactManager.prototype.loadContactById = function (id) {
            var options = new ContactFindOptions();
            options.filter = id;
            options.multiple = false;
            // Return all contact fields.
            var fields = ["id"];
            navigator.contacts.find(fields, this.onContactFindSuccess.bind(this), this.onContactFindError.bind(this), options);
        };
        ContactManager.prototype.addContact = function (firstName, lastName, phone) {
            var newContact = navigator.contacts.create({
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
            });
            // Save the contact.
            newContact.save(function (contact) {
                console.log("Contact added: " + contact.displayName);
                window.location.href = "index.html";
            }, function (error) {
                console.error("Unable to add contact. Error: " + error.message);
            });
        };
        ContactManager.prototype.updateContact = function (id, firstName, lastName, phone) {
            // Use the first contact since it's the only one that would have been 
            // found in the search.
            var contact = this._contacts[0];
            contact.id = id;
            // Update the values
            contact.name.givenName = firstName;
            contact.name.familyName = lastName;
            contact.displayName = firstName + " " + lastName;
            contact.phoneNumbers[0].value = phone;
            // Save the contact.
            contact.save(function (contact) {
                console.log("Contact saved: " + contact.displayName);
                window.location.href = "index.html";
            }, function (error) {
                console.error("Unable to save contact. Error: " + error.message);
            });
        };
        ContactManager.prototype.deleteContact = function (id) {
            if (!confirm("Do you really want to delete this contact?")) {
                return false;
            }
            var options = new ContactFindOptions();
            options.filter = id;
            options.multiple = false;
            // Return all contact fields.
            var fields = ["id"];
            navigator.contacts.find(fields, this.onContactDeleteFindSuccess.bind(this), this.onContactFindError.bind(this), options);
            return true;
        };
        ContactManager.prototype.onContactDeleteFindSuccess = function (contacts) {
            contacts[0].remove(function () {
                console.log("Contact removed.");
                window.location.href = "index.html";
            }, function (error) {
                console.log("Error: Contact unable to be removed: " + error.message);
            });
        };
        ContactManager.prototype.onContactFindSuccess = function (contacts) {
            this._contacts = contacts;
            document.dispatchEvent(contactsLoaded);
        };
        ContactManager.prototype.onContactFindError = function (error) {
            console.error("Error retrieving contacts:" + error.message);
        };
        return ContactManager;
    }());
    PhoneBook.ContactManager = ContactManager;
})(PhoneBook || (PhoneBook = {}));
var PhoneBook;
(function (PhoneBook) {
    var DocumentHelper = /** @class */ (function () {
        function DocumentHelper() {
        }
        DocumentHelper.GetInputElement = function (elementId) {
            return document.getElementById(elementId);
        };
        DocumentHelper.CreateSpan = function (className, content) {
            var span = document.createElement("span");
            span.className = className;
            span.innerHTML = content;
            return span;
        };
        DocumentHelper.CreateDiv = function (className) {
            var div = document.createElement("div");
            div.className = className;
            return div;
        };
        DocumentHelper.CreateContactListItem = function (contact) {
            var item = DocumentHelper.CreateDiv("contact-item");
            // Attach the contact to the item element.
            item.setAttribute("data-contactId", contact.id);
            item.addEventListener("click", function () {
                // Pass the id to editContact.html. "this" context is the element that was clicked.
                window.location.href = "editContact.html?id=" + this.getAttribute("data-contactId");
            });
            // The name of the contact.
            item.appendChild(DocumentHelper.CreateSpan("contact-name", contact.displayName));
            // The contact phone number
            var content = contact.phoneNumbers[0] ? contact.phoneNumbers[0].value : "";
            item.appendChild(DocumentHelper.CreateSpan("contact-phone", content));
            return item;
        };
        return DocumentHelper;
    }());
    PhoneBook.DocumentHelper = DocumentHelper;
})(PhoneBook || (PhoneBook = {}));
/// <reference path="contactManager.ts" />
var PhoneBook;
(function (PhoneBook) {
    var Application = /** @class */ (function () {
        function Application() {
            this._isEditMode = false;
            this._documentLoaded = false;
            this._deviceReady = false;
            document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
            document.addEventListener("contactsloaded", this.onContactsLoaded.bind(this), false);
            window.addEventListener("load", this.onDocumentLoaded.bind(this));
        }
        Application.prototype.initialize = function () {
            this._contactManager = new PhoneBook.ContactManager();
            this.setupElementsFromPage();
            // If the list element is present, list out all contacts.
            if (this._listObject !== undefined && this._listObject !== null) {
                this._contactManager.loadContacts();
            }
            // Check if editing, and set the hidden field if so.
            if (this._idField !== undefined && this._idField !== null) {
                var urlParams = new URLSearchParams(window.location.search);
                var idParam = urlParams.get("id");
                this._idField.value = idParam;
                this._contactManager.loadContactById(idParam);
                this._isEditMode = true;
            }
        };
        Application.prototype.onDocumentLoaded = function () {
            this._documentLoaded = true;
            if (this._deviceReady) {
                this.initialize();
            }
        };
        Application.prototype.onDeviceReady = function () {
            this._deviceReady = true;
            if (this._documentLoaded) {
                this.initialize();
            }
        };
        Application.prototype.onCancelClicked = function () {
            document.location.href = 'index.html';
        };
        Application.prototype.createContact = function () {
            this._contactManager.addContact(this._firstNameTextbox.value, this._lastNameTextbox.value, this._phoneTextbox.value);
        };
        Application.prototype.updateContact = function () {
            this._contactManager.updateContact(this._idField.value, this._firstNameTextbox.value, this._lastNameTextbox.value, this._phoneTextbox.value);
        };
        Application.prototype.deleteContact = function () {
            this._contactManager.deleteContact(this._idField.value);
        };
        Application.prototype.setupElementsFromPage = function () {
            this._listObject = document.getElementById("contact-list");
            // Input fields
            this._idField = PhoneBook.DocumentHelper.GetInputElement("idField");
            this._firstNameTextbox = PhoneBook.DocumentHelper.GetInputElement("firstNameTextbox");
            this._lastNameTextbox = PhoneBook.DocumentHelper.GetInputElement("lastNameTextbox");
            this._phoneTextbox = PhoneBook.DocumentHelper.GetInputElement("phoneTextbox");
            // Buttons
            this._cancelButton = PhoneBook.DocumentHelper.GetInputElement("cancelButton");
            if (this._cancelButton !== undefined && this._cancelButton !== null) {
                this._cancelButton.addEventListener("click", this.onCancelClicked.bind(this));
            }
            this._createButton = PhoneBook.DocumentHelper.GetInputElement("createButton");
            if (this._createButton !== undefined && this._createButton !== null) {
                this._createButton.addEventListener("click", this.createContact.bind(this));
            }
            this._callButton = document.getElementById("callButton");
            this._updateButton = PhoneBook.DocumentHelper.GetInputElement("updateButton");
            if (this._updateButton !== undefined && this._updateButton !== null) {
                this._updateButton.addEventListener("click", this.updateContact.bind(this));
            }
            this._deleteButton = PhoneBook.DocumentHelper.GetInputElement("deleteButton");
            if (this._deleteButton !== undefined && this._deleteButton !== null) {
                this._deleteButton.addEventListener("click", this.deleteContact.bind(this));
            }
        };
        Application.prototype.onContactsLoaded = function () {
            if (this._listObject !== undefined && this._listObject !== null) {
                this.outputContactList();
            }
            if (this._isEditMode) {
                // If edit mode, assume that one contact has been loaded.
                var contact = this._contactManager.contacts[0];
                var phone = contact.phoneNumbers[0] ? contact.phoneNumbers[0].value : "";
                // Set call button href - remove all non-numerics from the phone number
                this._callButton.href = "tel:" + phone.replace(/[^0-9]+/g, "");
                // Set fields
                this._idField.value = contact.id;
                this._firstNameTextbox.value = contact.name.givenName;
                this._lastNameTextbox.value = contact.name.familyName;
                this._phoneTextbox.value = phone;
            }
        };
        Application.prototype.outputContactList = function () {
            // Create an entry for each contact.
            for (var _i = 0, _a = this._contactManager.contacts; _i < _a.length; _i++) {
                var contact = _a[_i];
                this._listObject.appendChild(PhoneBook.DocumentHelper.CreateContactListItem(contact));
            }
        };
        return Application;
    }());
    PhoneBook.Application = Application;
})(PhoneBook || (PhoneBook = {}));
var app = new PhoneBook.Application();
