import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { v4 as uuid } from 'uuid';
import AddContact from "./AddContact";
import Header from './Header';
import ContactList from './ContactList';
import { useEffect, useState } from 'react';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

    

  const addContact = (contact) => {
    console.log(`Adding contact ${contact}`)
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  const deleteContact = (id) => {
    const newContacts = contacts.filter(contact => {
      return contact.id !== id;
    })
    setContacts(newContacts);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Header></Header>
      <AddContact addContact={addContact}></AddContact>
      <ContactList contacts={contacts} deleteContact={deleteContact}></ContactList>
    </div>
  );
}

export default App;
