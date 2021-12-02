import React from "react"
import {Employee} from "./Employee";

type Employee = {
  firstName: String,
  lastName: String,
  description: String,
  _links: any,
}

type Props = {
  employees: Employee[]
}

const EmployeeList = (props: Props) => {

  let employees = props.employees.map(employee =>
    <Employee key={employee._links.self.href} employee={employee}/>
  );
  return (
    <table>
      <tbody>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Description</th>
      </tr>
      {employees}
      </tbody>
    </table>
  );
}

export {EmployeeList};
