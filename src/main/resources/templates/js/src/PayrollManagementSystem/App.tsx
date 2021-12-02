import React, {useEffect, useState} from 'react';
import './App.css';
import {EmployeeList} from "./EmployeeList";

type Employee = {
  firstName: String,
  lastName: String,
  description: String,
  _links: any,
}


function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const URL = 'api/employees';
  useEffect(() => {
    fetch(URL,
      {
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        }
      }
    ).then(r => r.json())
      .then(r => {
        setEmployees(r._embedded.employees);
      });
  });

  return (
    <div className="App">
      <EmployeeList employees={employees}/>
    </div>
  );
}

export default App;
