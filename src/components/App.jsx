import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveContact,
  deleteContact,
  updateFilter,
} from '../redux/contactsSlice';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, PhonebookImage } from './App.styled';
import phonebookImage from '../asset/phonebook.png';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
];

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (!storedContacts) {
      localStorage.setItem('contacts', JSON.stringify(defaultContacts));
      dispatch(saveContact(defaultContacts));
    } else {
      dispatch(saveContact(JSON.parse(storedContacts)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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

  localStorage.clear(); // Clear local storage before returning

  return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookImage src={phonebookImage} alt="Phonebook" />
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList contacts={filteredContacts} onDelete={handleDelete} />
    </Container>
  );
};

export default App;
