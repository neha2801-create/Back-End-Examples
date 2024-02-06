import React, { useState } from 'react';

export default function AddContact(props){
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    return (
        <div>
            <h2>Add Contact</h2>
            <form onSubmit={(e) => {e.preventDefault(); props.addContact({name: name, email: email})}}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input required type="text" name="name" id="name" placeholder='Name'
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input required type="text" name="email" id="email" placeholder='Email'
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                </div>
                <button>Add Contact</button>
            </form>
        </div>
    );
};