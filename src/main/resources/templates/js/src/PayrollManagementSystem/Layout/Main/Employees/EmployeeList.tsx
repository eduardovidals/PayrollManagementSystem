import React from "react"
import "./EmployeeList.css"
import {Employee} from "../../../AppTypes";
import {EmployeeContainer} from "./Employee";

type Props = {
  employees: Employee[]
}

const EmployeeList = (props: Props) => {
  let employees = props.employees.map(employee =>
    <EmployeeContainer key={employee._links.self.href} employee={employee} link={employee._links.self.href}/>
  );
  return (
    <div id={"employee-table-wrapper"}>
      <table id={"employee-table"}>
        <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Description</th>
          <th>Hourly Rate</th>
          <th>Hours Worked</th>
        </tr>
        {employees}
        </tbody>
      </table>
    </div>
  );
}

export {EmployeeList};
