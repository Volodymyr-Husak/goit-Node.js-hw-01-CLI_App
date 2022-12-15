// import { nanoid } from "nanoid";
const fs = require("fs").promises;
const path = require("path");

// const contactsPath = path.resolve("contacts.json");
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      console.table(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  })();
}

function getContactById(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const currentContact = contacts.find(
        (contact) => contact.id === contactId
      );
      console.table([currentContact]);
    } catch (err) {
      console.log(err);
    }
  })();
}

function removeContact(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
      const newData = await fs.readFile(contactsPath, "utf8");
      console.table(JSON.parse(newData));
    } catch (err) {
      console.log(err);
    }
  })();
}

function addContact(name, email, phone) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const id = Math.round(Math.random() * 100000000000).toString();
      const newContact = {
        id,
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
      const newData = await fs.readFile(contactsPath, "utf8");
      console.table(JSON.parse(newData));
    } catch (err) {
      console.log(err);
    }
  })();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
