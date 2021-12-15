import {Employee} from "../PayrollManagementSystem/AppTypes";

export const getEmployees = () =>
  fetch('api/employees',
    {
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      }
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => res._embedded.employees);

export const deleteEmployee = (employeeLink: string) => (
  fetch(employeeLink,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
)

export const createEmployee = ({firstName, lastName, description, hourlyRate, hoursWorked}: {firstName: string, lastName: string, description: string, hourlyRate: number, hoursWorked: number}) => {
  fetch('api/employees',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        description: description,
        hourlyRate: hourlyRate,
        hoursWorked: hoursWorked
      })
    }).then(r => r.json());
}

export const updateEmployee = (apiLink:string, {firstName, lastName, description, hourlyRate, hoursWorked}: {firstName: string, lastName: string, description: string, hourlyRate: number, hoursWorked: number}) => {
  fetch(apiLink,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        description: description,
        hourlyRate: hourlyRate,
        hoursWorked: hoursWorked
      })
    }).then(r => r.json());
}





