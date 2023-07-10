 import React from 'react';
 import PropTypes from 'prop-types';
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
// import { nanoid } from 'nanoid';

export const ContactList = () => {
   const dispatch = useDispatch();
   const contacts = useSelector(getContacts);
   const filter = useSelector(getContactFilter);

   const filteredContacts = contacts.filter(
     contact =>
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

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
