import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation, Dialog, Classes, Intent, RadioGroup, Radio } from "@blueprintjs/core";
import AddNewContact from './AddNewContact'

function App() {
  const [contacts, setContacts] = useState([
    {
      name: 'Chyngyz',
      frequency: 'daily',
      reminderTime: '20:13',
      date: new Date()
    }
  ])

  useEffect(() => {
    const savedContacts = window.localStorage.getItem('contacts')
    if (savedContacts && savedContacts.length) {
      setContacts(savedContacts)
    }
  }, [])

  const handleSave = (contact) => {
    setContacts([
      ...contacts,
      contact
    ])
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Call Reminder</h1>
      </header>
      <main>
        {contacts.map(contact => (
          <Card elevation={Elevation.TWO} className="contact-card">
            <h2>Call <i>{contact.name}</i></h2>
            <p>Your call schedule is <b>{contact.frequency}</b> at <b>{contact.reminderTime}</b></p>

            <div className="contact-card__actions">
              <Button
                text="Called"
                intent={Intent.PRIMARY}
              />

              <Button
                text="Missed"
                intent={Intent.DANGER}
              />
            </div>
          </Card>
        ))}
      </main>
      <footer>
        <AddNewContact
          onSave={handleSave}
        />
      </footer>
    </div>
  );
}

export default App;
