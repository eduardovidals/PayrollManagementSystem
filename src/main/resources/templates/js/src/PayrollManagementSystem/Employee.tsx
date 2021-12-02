import React from "react";

type EmployeeType = {
  firstName: String,
  lastName: String,
  description: String,
  _links: any,
}

type Props = {
  employee: EmployeeType
}

const Employee = (props: Props) => {
  return (
    <tr>
      <td>{props.employee.firstName}</td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.description}</td>
    </tr>
  )
}

export {Employee};


