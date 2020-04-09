import React, { useState, useEffect } from 'react'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({});

  useEffect(() => {
    personService.getAll().then(r => setPersons(r))
  }, [])

  const handleFilterChange = e => setFilter(e.target.value);
  const handleNameChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);

  const checkExist = name => persons.reduce((exist, person) => exist || person.name === name, false)

  const handleDelete = (person) => {
    const { id, name } = person;
    const confirmed = window.confirm(`Delete ${name}?`)
    if (confirmed) {
      personService.deleteOne(id)
        .then(r => setPersons(persons.filter(person => person.id !== id)))
        .catch(() => setNotification({ type: 'error', message: `Information of ${name} has already been removed from the server`}))
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const exist = checkExist(newName);
    
    if (exist) {
      const confirmed = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (confirmed) {
        const [person] = persons.filter(person => person.name === newName);
        const updatedPerson = { ...person, number: newNumber };
        personService.updateOne(updatedPerson)
          .then(updated => setPersons(persons.map(existing => existing.id === updated.id ? updated : existing)))
      }
    } else {
      const person = {
        name: newName,
        number: newNumber
      };
      personService.createOne(person).then(p => {
        setNotification({ type: 'success', message: `Added ${newName}` });
        setPersons(persons.concat(p));

        setTimeout(() => {
          setNotification({})
        }, 5000);
      })
      setNewName('');
      setNewNumber('');
    }
  }

  const hasNotification = Object.keys(notification).length > 0;

  return (
    <div>
      <h2>Phonebook</h2>
      {hasNotification && <Notification {...notification}/>}
      <Filter filter={filter} handleChange={handleFilterChange} />
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App