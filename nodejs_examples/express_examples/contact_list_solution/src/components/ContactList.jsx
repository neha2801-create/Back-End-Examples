import React from 'react';
import ContactCard from "./ContactCard";

const ContactList = (props) => {

    const deleteContact = (id) => {
        props.deleteContact(id);
    }

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard
            key={contact.id} 
            contact={contact}
            deleteContact={deleteContact}
            ></ContactCard>
        )
    });

    return (
        <div>
            {renderContactList}
        </div>
    );
};

export default ContactList;