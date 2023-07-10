 import React from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { deleteContact } from '../../redux/contactsSlice';
 import { getContactFilter, getContacts } from '../../redux/selectors';
 import {
   ListContainer,
   ListItem,
   ContactName,
   ContactNumber,
   DeleteButton,
 } from './ContactList.styled';


export const ContactList = () => {
   const dispatch = useDispatch();
   const contacts = useSelector(getContacts);
   const filter = useSelector(getContactFilter);

   const filteredContacts = contacts.filter(contact =>
     contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
     <>
     <ListContainer>
       {filteredContacts.map(contact => (
        <ListItem key={contact.id}>
           <ContactName>{contact.name}</ContactName>
           <ContactNumber>{contact.number}</ContactNumber>
           <DeleteButton type="button" onClick={() => handleDelete(contact.id)}>
             Delete
           </DeleteButton>
       </ListItem>
       ))}
      </ListContainer>
    </>
  );
 };

export default ContactList;
