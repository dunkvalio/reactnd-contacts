import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as api from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id),
    }));
    api.remove(contact);
  }

  createContact = (contact) => {
    api.create(contact).then(contact => {
      this.setState(state => (
        { contacts: state.contacts.concat([contact]) }
      ))
    });
  }

  componentDidMount() {
    api.getAll().then((contacts) => {
      this.setState({ contacts });
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onRemoveContact={this.removeContact}
          />
        )}/>
        <Route path='/create' render={({ history }) => (
          <CreateContact 
            onCreateContact={ contact => {
              this.createContact(contact);
              history.push('/');
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
