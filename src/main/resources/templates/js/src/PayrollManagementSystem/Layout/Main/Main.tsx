import React, {createRef, MouseEventHandler, useEffect, useRef, useState} from "react";
import "./Main.css";
import * as EmployeeServiceApi from "../../../API/EmployeeService";
import {Employee} from "../../AppTypes";
import {EmployeeList} from "./Employees/EmployeeList";

export function Main() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = createRef<HTMLDivElement>();
  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  const descriptionRef = createRef<HTMLInputElement>();
  const hourlyRateRef = createRef<HTMLInputElement>();
  const hoursWorkedRef = createRef<HTMLInputElement>();

  useEffect(() => {
    document.addEventListener('click', closeDialog, true);
    return () => {
      document.removeEventListener('click', closeDialog, true);
    };
  });

  const displayDialog = (e: any) => {
    setShowDialog(true);
  }

  const closeDialog = (e: any) => {
    if (dialogRef.current && !dialogRef.current?.contains(e.target as Node) && showDialog) {
      setShowDialog(false);
      setIsEmpty(false);
    }
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      const getEmployees = await EmployeeServiceApi.getEmployees();
      setEmployees(getEmployees);
    }
    fetchEmployees();
  });

  const [isEmpty, setIsEmpty] = useState(false);

  const createEmployee = () => {
    const newEmployee: any = {};
    let firstName = firstNameRef.current?.value as string;
    let lastName = lastNameRef.current?.value as string;
    let description = descriptionRef.current?.value as string;
    let hourlyRate = hourlyRateRef.current?.value as unknown as number;
    let hoursWorked = hoursWorkedRef.current?.value as unknown as number;

    if (!firstName || !lastName || !description || !hourlyRate || !hoursWorked) {
      setIsEmpty(true)
      return;
    }
    EmployeeServiceApi.createEmployee({
      firstName: firstName,
      lastName: lastName,
      description: description,
      hourlyRate: hourlyRate,
      hoursWorked: hoursWorked,
    });
    setShowDialog(false);
  }

  return (
    <main id={'main'}>
      {showDialog ? (
        <div id={"popup-background"}>
          <div id={"add-employee-dialog"} ref={dialogRef}>
            <div id={"add-employee-form-wrapper"}>
              <i id={"close-dialog"} className="fas fa-times" onClick={() => setShowDialog(false)}/>
              <form action="" id={"add-employee-form"} onSubmit={createEmployee}>
                {isEmpty ? <p style={{color: 'red', fontWeight: 900}}> A field is empty </p> : null}
                <p> Create an employee </p>
                <p> First Name: </p>
                <input type="text" placeholder={"First Name"} ref={firstNameRef}/>
                <p> Last Name: </p>
                <input type="text" placeholder={"Last Name"} ref={lastNameRef}/>
                <p> Description: </p>
                <input type="text" placeholder={"Description"} ref={descriptionRef}/>
                <p> Hours Worked: </p>
                <input type="text" placeholder={"Hours Worked"} ref={hoursWorkedRef}/>
                <p> Hourly Rate: </p>
                <input type="text" placeholder={"Hourly Rate"} ref={hourlyRateRef}/>
                <input type="submit" value={"Create"} id={"create-employee"} className={"button"} formAction={"#"}/>
              </form>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <div id={"employees"}>
          <EmployeeList employees={employees}/>
        </div>
        <div id={'buttons'}>
          <div className={'button'} onClick={displayDialog}>
            Add employee
          </div>
        </div>
      </div>
    </main>
  )
}
