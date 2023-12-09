import css from './ListOfContacts.module.css';
import PropTypes from 'prop-types';

const ListOfContacts = (arrayCont, deleteContact) => {
  return (
    <div>
      <ul className={css.contactList}>
        {arrayCont.map(contact => {
          const { id, name, number } = contact;
          return (
            <li key={id} className={css.user}>
              <h3>{name}:</h3>
              <p>{number}</p>
              <button type="button" className={css.deleteBtn} onClick={deleteContact} id={id}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ListOfContacts.propTypes = {
  arrayCont: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ListOfContacts;
