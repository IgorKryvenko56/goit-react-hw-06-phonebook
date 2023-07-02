import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const { name, number } = contact;
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


// import React from 'react';
// import PropTypes from 'prop-types';

// const ContactItem = ({ contact, onDelete }) => {
//   const { id, name, phone } = contact;

//   const handleDelete = () => {
//     onDelete(id);
//   };

//   return (
//     <li>
//       <p>
//         {name}: {phone}
//       </p>
//       <button type="button" onClick={handleDelete}>
//         Delete
//       </button>
//     </li>
//   );
// };

// ContactItem.propTypes = {
//   contact: PropTypes.object.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default ContactItem;
