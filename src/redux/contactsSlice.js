import { createSlice } from '@reduxjs/toolkit';
import { initialContacts } from '../data/initialContacts';



const initialState = {
  contacts: initialContacts,
  filters:'',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    saveContact: (state, action) => {
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
