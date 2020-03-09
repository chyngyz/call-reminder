import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, Switch } from '@blueprintjs/core';
import { TimePicker, TimePrecision } from "@blueprintjs/datetime";

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

  useEffect(() => {
    const savedContacts = window.localStorage.getItem('contacts')
    if (savedContacts && savedContacts.length) {
      setActiveContacts(savedContacts)
    }
  }, [])

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
        <h1>Телефон чалуу</h1>
      </header>
      <main>

        <div className="block">
          <h3>Кимге чалуу</h3>
          {DEFAULT_CONTACTS.map(contact => (
            <Switch
              key={contact}
              onChange={event => handleContactChange(contact, event.target.checked)}
              labelElement={DEFAULT_CONTACT_LABELS[contact]}
              checked={activeContacts[contact]}
              large
            />
          ))}
        </div>

        <div className="block">
          <h3>Чалуунун колому</h3>
          <RadioGroup
            onChange={event => handleScheduleChange('frequency', event.target.value)}
            selectedValue={reminderData.frequency}
          >
            {Object.keys(INTERVAL_LABELS).map(item => (
              <Radio
                key={item}
                label={INTERVAL_LABELS[item]}
                value={item}
              />
            ))}
          </RadioGroup>
        </div>

        <div className="block">
          <h3>Качан чалуу</h3>
          {INTERVAL_LABELS[reminderData.frequency]} саат: 
          <TimePicker
            onChange={value => handleScheduleChange('time', value)}
            precision={TimePrecision.MINUTE}
            selectAllOnFocus={false}
            showArrowButtons
            useAmPm={false}
            value={reminderData.time}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
