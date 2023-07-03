import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { PersistGate } from 'redux-persist/integration/react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, PhonebookImage } from './App.styled';
import phonebookImage from '../asset/phonebook.png';
import {
  saveContact,
  deleteContact,
  updateFilter,
} from '../redux/contactsSlice';
import { persistor } from '../redux/store';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleSubmit = contact => {
    const isDuplicateName = contacts.find(
      c => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicateName) {
      alert('Этот контакт уже есть в списке!');
    } else {
      const newContact = { ...contact, id: nanoid() };
      dispatch(saveContact(newContact));
      alert('Contact added successfully!');
    }
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = value => {
    dispatch(updateFilter(value));
  };

  const filterContacts = () => {
    const normalizedFilter = filter && filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(normalizedFilter || '')
    );
  };

  const filteredContacts = filterContacts();

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Container>
        <h1>Phonebook</h1>
        <PhonebookImage src={phonebookImage} alt="Phonebook" />
        <ContactForm onSubmit={handleSubmit} />

        <h2>Contacts</h2>
        <Filter
          value={filter !== undefined ? filter : ''}
          onChange={handleFilter}
        />
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      </Container>
    </PersistGate>
  );
};

export default App;
