import { createSlice } from '@reduxjs/toolkit';
import { initialContacts } from '../data/initialContacts';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  list: initialContacts,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    saveContact: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },

      prepare: ({ id, name, number }) => ({
          payload: {
            id,
            name,
            number,
          },
      }),
    },

    deleteContact: (state, action) => {
      state.list = state.list.filter(contact => contact.id !== action.payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactReducer = contactsSlice.reducer;
export const { saveContact, deleteContact } = contactsSlice.actions;
export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactReducer
);

