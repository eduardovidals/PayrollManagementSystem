import React, {useEffect, useState} from "react";
import "./Main.css";
import * as EmployeeServiceApi from "../../../API/EmployeeService";
import {Employee} from "../../AppTypes";
import {EmployeeList} from "./Employees/EmployeeList";

export function Main() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const getEmployees = await EmployeeServiceApi.getEmployees();
      setEmployees(getEmployees);
    }
    fetchEmployees();
  });

  return (
    <main id={'main'}>
      <div>
        <div id={"employees"}>
          <EmployeeList employees={employees}/>
        </div>
        <div id={'buttons'}>
          <div className={'button'}>
            Add employee
          </div>
        </div>
      </div>
    </main>
  )
}
