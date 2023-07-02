import React from 'react';
import { AddContact } from './addContactForm/AddContact';
import { ContactList } from './addContactList/ContactList';
import css from './app.module.css';
import { FilterContact } from './filterContacts/FilterContact';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'contacts';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  onSubmit = event => {
    event.preventDefault();
    const { contacts } = this.state;
    const name = event.target.name.value.trim();
    const number = event.target.number.value.trim();
    this.setState({ contacts: [...contacts, { name, number, id: nanoid() }] });
  };
  onFilterContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };
  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  componentDidMount() {
    // зчитати з локал сторедж і zapysaty v contacts
    const storageContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storageContacts) {
      this.setState({ contacts: storageContacts });
    }
  }
  componentDidUpdate(prevState) {
    // перезаписати локалсторедж
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filtered = this.onFilterContact();

    return (
      <div className={css.container}>
        <h1>PhoneBook:</h1>
        <AddContact onHandleSubmit={this.onSubmit}></AddContact>
        <h2>Contacts</h2>
        <FilterContact
          value={filter}
          onFilterChange={this.onInputChange}
        ></FilterContact>
        <ContactList contacts={filtered} onDelete={this.onDelete}></ContactList>
      </div>
    );
  }
}
