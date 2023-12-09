import { Component } from 'react';
import AddContactForm from './AddContactForm/AddContactForm';
import ListOfContacts from './ListOfContacts/ListOfContacts';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  createUser = data => {
    let namesOfUsers = [];
    namesOfUsers = this.state.contacts.map(userName => userName.name);
    if (!namesOfUsers.includes(data.name)) {
      const newUser = {
        ...data,
        id: nanoid(),
      };

      // For change array in state , we need to create copy of array, change him, and then setState
      const copyArray = this.state.contacts.slice(0);
      copyArray.push(newUser);

      //====================== Add users data to localStorage
      localStorage.setItem('users', JSON.stringify(copyArray));
      return this.setState({ contacts: copyArray });
    } else {
      alert(`User ${data.name} already exist`);
    }
  };
  //========================== When renew page render data from localStorage
  componentDidMount() {
    const dataFromLocalStorage = localStorage.getItem('users');
    const parsedDataUsers = JSON.parse(dataFromLocalStorage);
    if (parsedDataUsers) {
      this.setState({ contacts: parsedDataUsers });
    }
  }
  //======================== If state change we renew this data to localStorage
  componentDidUpdate() {
    localStorage.setItem('users', JSON.stringify(this.state.contacts));
  }

  changeFilter = e => this.setState({ filter: e.target.value });

  filterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = ({ target }) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== target.id
        ),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.filterContacts();
    return (
        <div className="container">
          <h1>Phonebook</h1>
          <AddContactForm createUser={this.createUser} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          {ListOfContacts(visibleContacts, this.deleteContact)}
        </div>
    );
  }
}
