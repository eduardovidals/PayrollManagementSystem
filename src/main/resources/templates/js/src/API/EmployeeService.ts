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

export const deleteEmployee = (employeeLink:string) => (
  fetch(employeeLink,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
)


