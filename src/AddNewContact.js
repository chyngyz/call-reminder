import React, { useState } from 'react'
import { Button, Card, Elevation, Dialog, Classes, Intent, RadioGroup, Radio, FormGroup, InputGroup } from "@blueprintjs/core";

const AddNewContact = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [contact, setContact] = useState({
    name: '',
    frequency: 'daily',
    reminderTime: '11:00',
    date: new Date()
  })
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleScheduleChange = (event) => {
    setContact({
      ...contact,
      frequency: event.target.value
    })
  }

  const handleNameChange = (event) => {
    setContact({
      ...contact,
      name: event.target.value
    })
  }

  const handleCreate = () => {
    onSave(contact)

    handleClose()
    setContact({
      name: '',
      frequency: 'daily',
      reminderTime: '11:00',
      date: new Date()
    })
  }

  return (
    <>
      <Button
        icon="add"
        intent={Intent.PRIMARY}
        onClick={handleOpen}
        text="Add new call reminder"
        large
      />
      <Dialog
          onClose={handleClose}
          title="Add new call reminder"
          isOpen={isOpen}
          autoFocus
          canEscapeKeyClose
          canOutsideClickClose
          enforceFocus
          usePortal
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label="Contact name"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              value={contact.name}
              onChange={handleNameChange}
              placeholder="Malik Kekenov" />
          </FormGroup>
          <RadioGroup
            label="Number of calls"
            onChange={handleScheduleChange}
            selectedValue={contact.frequency}
            inline
          >
            <Radio label="Once" value="once" />
            <Radio label="Daily" value="daily" />
            <Radio label="Weekly" value="weekly" />
            <Radio label="Monthly" value="monthly" />
          </RadioGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handleClose}>Close</Button>
            <Button
              intent={Intent.PRIMARY}
              onClick={handleCreate}
            >
              Create
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddNewContact
