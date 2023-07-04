import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container, PhonebookImage } from './App.styled';
import phonebookImage from '../asset/phonebook.png';
import { persistor } from '../redux/store';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const [filter, setFilter] = useState('');

  const handleFilterChange = value => {
    setFilter(value);
  };

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Container>
        <h1>Phonebook</h1>
        <PhonebookImage src={phonebookImage} alt="Phonebook" />
        <ContactForm />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList />
      </Container>
    </PersistGate>
  );
};

export default App;
