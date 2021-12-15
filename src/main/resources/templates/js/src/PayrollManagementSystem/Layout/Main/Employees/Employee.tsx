import React, {createRef, useEffect, useState} from "react";
import {Employee} from "../../../AppTypes";
import "./Employee.css"
import * as EmployeeServiceApi from '../../../../API/EmployeeService';
import {updateEmployee} from "../../../../API/EmployeeService";

type Props = {
  employee: Employee,
  link: String
}

const EmployeeContainer = (props: Props) => {
  let [optionsVisiblity, setOptionsVisibility] = useState(false)
  let [optionsStyle, setOptionsStyle] = useState({display: 'none'})

  useEffect(() => {
    displayOptionsMenu();
  }, [optionsVisiblity])

  const showOptionsMenu = (e: React.MouseEvent) => {
    if (!optionsVisiblity) {
      setOptionsVisibility(true);
      e.stopPropagation();
      document.addEventListener('click', closeOptionsMenu);
    }
  }

  const closeOptionsMenu = () => {
    setOptionsVisibility(false);
    document.removeEventListener('click', closeOptionsMenu);
  }

  const displayOptionsMenu = () => {
    if (optionsVisiblity) {
      setOptionsStyle({display: 'block'});
    } else {
      setOptionsStyle({display: 'none'});
    }
  }

  const onDelete = () => {
    const employeeLink = props.employee._links.self.href;
    const apiLink = employeeLink.substring(employeeLink.indexOf("/api"))
    EmployeeServiceApi.deleteEmployee(apiLink);
  }

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

  const updateEmployee = () => {
    const newEmployee: any = {};
    const apiLink = props.link.substring(props.link.indexOf("/api"))

    let firstName = firstNameRef.current?.value as string;
    let lastName = lastNameRef.current?.value as string;
    let description = descriptionRef.current?.value as string;
    let hourlyRate = hourlyRateRef.current?.value as unknown as number;
    let hoursWorked = hoursWorkedRef.current?.value as unknown as number;

    if (!firstName || !lastName || !description || !hourlyRate || !hoursWorked){
      setIsEmpty(true);
      return;
    }

    EmployeeServiceApi.updateEmployee(apiLink, {
      firstName: firstName,
      lastName: lastName,
      description: description,
      hourlyRate: hourlyRate,
      hoursWorked: hoursWorked,
    });
    setShowDialog(false);
  }

  const [isEmpty, setIsEmpty] = useState(false);


  return (
    <tr className={"employee-row"} onMouseLeave={closeOptionsMenu}>
      <td>{props.employee.firstName}</td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.description}</td>
      <td>${props.employee.hourlyRate}</td>
      <td>{props.employee.hoursWorked}</td>
      <td style={{paddingLeft: 0, paddingRight: 20, paddingTop: 10}}>
        <i onClick={showOptionsMenu} className="fas fa-ellipsis-h employee-options">
          <div className={'employee-options-popup-wrapper'}>
            <div className={'employee-options-popup'} style={optionsStyle}>
              <div className={'employee-option'} onClick={onDelete}>
                Delete
              </div>

              <div className={'employee-option'} onClick={() => setShowDialog(true)}>
                Update
              </div>
            </div>
          </div>
        </i>
      </td>
      {showDialog ? (
        <div id={"popup-background"}>
          <div id={"add-employee-dialog"} ref={dialogRef}>
            <div id={"add-employee-form-wrapper"}>
              <i id={"close-dialog"} className="fas fa-times" onClick={() => setShowDialog(false)}/>
              <form action="" id={"add-employee-form"} onSubmit={updateEmployee}>
                {isEmpty ? <p style={{color: 'red', fontWeight: 900}}> A field is empty </p> : null}
                <p> Update an employee </p>
                <p> First Name: </p>
                <input type="text" placeholder={"First Name"} ref={firstNameRef}/>
                <p> Last Name: </p>
                <input type="text" placeholder={"Last Name"} ref={lastNameRef}/>
                <p> Description: </p>
                <input type="text" placeholder={"Description"} ref={descriptionRef}/>
                <p> Hourly Rate: </p>
                <input type="text" placeholder={"Hourly Rate"} ref={hourlyRateRef}/>
                <p> Hours Worked: </p>
                <input type="text" placeholder={"Hours Worked"} ref={hoursWorkedRef}/>
                <input type="submit" value={"Update"} id={"create-employee"} className={"button"} formAction={"#"}/>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </tr>
  )
}

export {EmployeeContainer};


