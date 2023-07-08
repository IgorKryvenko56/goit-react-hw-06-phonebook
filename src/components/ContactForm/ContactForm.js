import React, { useState } from 'react';
 import PropTypes from 'prop-types';
 import { useDispatch, useSelector } from 'react-redux';
 import { getContacts } from '../../redux/selectors';
 import { saveContact } from '../../redux/contactsSlice';
 import { FormContainer, Input, Button } from './ContactForm.styled';
 import { nanoid } from 'nanoid';
 
const initialValues = {
       id: '',
     name: '',
    number: '',
   };
export const ContactForm = () => {  
   const dispatch = useDispatch();
   const contacts = useSelector(getContacts);
   const [contact, setContact] = useState(initialValues);
   const { name, number } = contact;

   const handleChange = e => {
     const { name, value } = e.target;
     setContact(prevState => ({
      ...prevState,   [name]: value,
    }));
   };

  
  const handleSubmit = e => {
    e.preventDefault();
     
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: `id-${nanoid()}`,
        name: name,
        number: number,
      };
     
      dispatch(saveContact(newContact));
      setContact(initialValues);
    }
   };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <Input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="Phone number"
        required
      />
      <Button type="submit">Add Contact</Button>
    </FormContainer>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ContactForm;
