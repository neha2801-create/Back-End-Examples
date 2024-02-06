import React from 'react';

const ContactCard = (props) => {
    const { id, name, email } = props.contact;
    return (
        <div className='container'>
            <div className="row border">
                <i className="col-sm bi-file-earmark-person" ></i>
                <div className='col-sm'>
                    {name}
                </div>
                <div className='col-sm'>
                    {email}
                </div>
                <button className="col-sm" onClick={() => props.deleteContact(id)}>
                    <i className=" bi-trash3 color-red"></i>
                </button>

            </div>
        </div>
    )
};

export default ContactCard;