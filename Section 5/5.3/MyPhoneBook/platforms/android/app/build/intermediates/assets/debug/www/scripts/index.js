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
        };
        Application.prototype.onContactsLoaded = function () {
            if (this._listObject !== undefined && this._listObject !== null) {
                this.outputContactList();
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
