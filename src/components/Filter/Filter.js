import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactFilter } from 'redux/selectors';
import { setContactFilter } from 'redux/filterSlice';
import { Input } from './Filter.styled';
import { nanoid } from 'nanoid';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getContactFilter);

  const handleFilterChange = e => {
    dispatch(setContactFilter(e.target.value));
  };

  
return (
  <input
    name="filter"
    type="text"
    value={filter}
    onChange={handleFilterChange}
    placeholder="Search contacts"
  />
);
};



export default Filter;
