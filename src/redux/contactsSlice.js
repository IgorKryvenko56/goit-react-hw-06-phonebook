import { createSlice } from '@reduxjs/toolkit';
// import { initialContacts } from '../data/initialContacts';



const initialState = {
  contacts: [],
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    saveContact: (state, action) => {
     const { id, name, number } = action.payload;
      const isDuplicateName = state.contacts.some(
        contact =>
          contact.name && contact.name.toLowerCase() === name.toLowerCase()
      );
      if (isDuplicateName) {
        throw new Error('This contact name already exists in the phone book!');
      }
      state.contacts.push(action.payload);
    }, 
  
  deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { saveContact, deleteContact, updateFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;
