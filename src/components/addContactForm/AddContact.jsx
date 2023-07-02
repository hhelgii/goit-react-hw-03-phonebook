import React from 'react';
import propTypes from 'prop-types';
import css from './addCotact.module.css';
export class AddContact extends React.Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onHandleSubmit: propTypes.func.isRequired,
  };

  onInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { name, number } = this.state;
    const { onHandleSubmit } = this.props;

    return (
      <form
        className={css.contactForm}
        onSubmit={event => {
          onHandleSubmit(event);
          this.setState({
            name: '',
            number: '',
          });
        }}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={this.onInput}
            required
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={this.onInput}
            required
          />
        </label>
        <button className={css.addContact}>Add contact</button>
      </form>
    );
  }
}
