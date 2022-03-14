import React from 'react';
import Person from './Person';

// https://youtu.be/0sasRxl35_8

function NameList() {

  //const names = ["bruce", "clark", "diana"]
  //const nameList = names.map((name) => <h2>{name}</h2>)

  const names = ["john", "pedro", "jill"]

  const persons = [
    {
      id: 1,
      name: "Bruce",
      age: 30,
      skill: "React"
    },
    {
      id: 2,
      name: "Clark",
      age: 25,
      skill: "Angular"
    },
    {
      id: 3,
      name: "Janet",
      age: 36,
      skill: "JS"
    }

  ]

  // the key could also be {person.name} or another key that is it's the Objects
  const personList = persons.map(person => (
    <Person key={person.id} person={person} />
  ));

  const namesList = names.map((name, index) => (
    <h2 key={index}>
      {index} {name}
    </h2>
  ))

  return (
    <div>
      <div>
        <h3>dot map list with ids'</h3>
        <br />
        {personList}
      </div>
      <br />
      <div>
        <h3>dot map list with index as Id'</h3>
        <br />
        {namesList}
      </div>
    </div>

  )
}

export default NameList;