import React, { useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const DEFAULT_CONTACT_LABELS = {
  'mother': 'Апакем',
  'father': 'Атакем',
  'sister': 'Карындашым/Эжем',
  'brother': 'Иним/Байкем'
}

const INTERVAL_LABELS = {
  once: 'Бир жолу',
  daily: 'Кун сайын',
  weekly: 'Жума сайын',
  monthly: 'Ай сайын'
}

const DEFAULT_CONTACTS = Object.keys(DEFAULT_CONTACT_LABELS)

function App() {
  const [activeContacts, setActiveContacts] = useState(DEFAULT_CONTACTS.reduce((contactMap, contact) => {
    contactMap[contact] = true
    return contactMap
  }, {}))
  const [reminderData, setReminderData] = useState({
    frequency: 'daily',
    time: new Date()
  })
  const [isLoadedFromStore, setIsLoadedFromStore] = useState(false)

  useEffect(() => {
    const savedContacts = window.localStorage.getItem('contacts')
    if (savedContacts && savedContacts.length) {
      setActiveContacts(JSON.parse(savedContacts).reduce((contactMap, contact) => {
        contactMap[contact] = true
        return contactMap
      }, {}))
      setIsLoadedFromStore(true)
    }
  }, [])

  useEffect(() => {
    if (window.Android && window.Android.syncContactSchedule && isLoadedFromStore) {
      const selectedContacts = DEFAULT_CONTACTS.filter(item => activeContacts[item])
      const data = {
        contacts: selectedContacts.map(item => DEFAULT_CONTACT_LABELS[item]),
        ...reminderData
      }

      window.Android.syncContactSchedule(JSON.stringify(data))
      window.localStorage.setItem('contacts', JSON.stringify(selectedContacts))
    }
  }, [reminderData, activeContacts, isLoadedFromStore])

  const handleContactChange = (contact, isChecked) => {
    setActiveContacts({
      ...activeContacts,
      [contact]: isChecked
    })
  }

  const handleScheduleChange = (field, value) => {
    setReminderData({
      ...reminderData,
      [field]: value
    })
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Жакынынды унутпа</h1>
      </header>
      <main>

        <div className="block">
          <h3>Жакындарым</h3>
          {DEFAULT_CONTACTS.map(contact => (
            <div className="row" key={contact}>
              <InputSwitch
                inputId={contact}
                checked={activeContacts[contact]}
                onChange={event => handleContactChange(contact, event.value)}
              />
              <label htmlFor={contact} className="p-radiobutton-label">{DEFAULT_CONTACT_LABELS[contact]}</label>
              
            </div>
          ))}
        </div>

        <div className="block">
          <h3>Эскертуу</h3>
          {Object.keys(INTERVAL_LABELS).map(item => (
            <div className="row" key={item}>
              <RadioButton
                key={item}
                value={item}
                name={item}
                inputId={item}
                onChange={event => handleScheduleChange('frequency', event.value)}
                checked={reminderData.frequency === item}
              />
              <label htmlFor={item} className="p-radiobutton-label">{INTERVAL_LABELS[item]}</label>
            </div>
          ))}
          
        </div>

        <div className="block">
          <h3>Эскертуунун убакты</h3>
          <div className="row">
            {INTERVAL_LABELS[reminderData.frequency]} саат: 
            <Calendar
              value={reminderData.time}
              onChange={(e) => handleScheduleChange('time', e.value)}
              showSeconds={false}
              baseZIndex={100}
              showTime
              touchUI
              hideOnDateTimeSelect
              readOnlyInput
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
