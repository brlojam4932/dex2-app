import React from 'react';
import Person from './Person';

// https://youtu.be/0sasRxl35_8

function NameList() {

  //const names = ["bruce", "clark", "diana"]
  //const nameList = names.map((name) => <h2>{name}</h2>)

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

  const personList = persons.map(person => (
    <Person key={person.id} person={person} />
  ));
  
  return (
    <div>
    
      {personList}

    </div>

  )
}

export default NameList