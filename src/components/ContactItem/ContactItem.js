import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const {id, name, number } = contact;
  return (
      <li>
      {name}: {number}
    </li>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
