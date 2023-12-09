import AddContactForm from './AddContactForm/AddContactForm';
import ListOfContacts from './ListOfContacts/ListOfContacts';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import { useEffect, useState } from 'react';

export const App = () => {
 const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('users')) ?? []);
 const [filterQuery, setFilter] = useState('');

 function createUser (data) {
    let namesOfUsers = [];
    namesOfUsers = contacts.map(userName => userName.name);
    if (!namesOfUsers.includes(data.name)) {
      const newUser = {
        ...data,
        id: nanoid(),
      };

      // For change array in state , we need to create copy of array, change him, and then setState
      const copyArray = contacts.slice(0);
      copyArray.push(newUser);

      //====================== Add users data to localStorage
      localStorage.setItem('users', JSON.stringify(copyArray));
      setContacts( copyArray );
    } else {
      alert(`User ${data.name} already exist`);
    }
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(contacts));
  }, [contacts])

  
  function filterContacts () {
    const normalizedFilter = filterQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

 function deleteContact ({ target }) {
    setContacts(prev => prev.filter(contact => contact.id !== target.id),
    );
  };

    return (
        <div className="container">
          <h1>Phonebook</h1>
          <AddContactForm createUser={createUser} />
          <h2>Contacts</h2>
          <Filter value={filterQuery} onChange={(e) => setFilter( e.target.value )} />
          {ListOfContacts(filterContacts(), deleteContact)}
        </div>
    );
  
}
