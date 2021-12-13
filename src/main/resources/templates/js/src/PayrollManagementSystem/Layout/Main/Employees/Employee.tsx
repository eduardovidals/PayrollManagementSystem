import React, {useEffect, useState} from "react";
import {Employee} from "../../../AppTypes";
import "./Employee.css"
import * as EmployeeServiceApi from '../../../../API/EmployeeService';

type Props = {
  employee: Employee,
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

  return (
    <tr className={"employee-row"} onMouseLeave={closeOptionsMenu}>
      <td>{props.employee.firstName}</td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.description}</td>
      <td style={{paddingLeft: 0, paddingRight: 20, paddingTop: 10}}>
        <i onClick={showOptionsMenu} className="fas fa-ellipsis-h employee-options">
          <div className={'employee-options-popup-wrapper'}>
            <div className={'employee-options-popup'} style={optionsStyle}>
              <div className={'employee-option'} onClick={onDelete}>
                Delete
              </div>

              <div className={'employee-option'}>
                Update
              </div>
            </div>
          </div>
        </i>
      </td>
    </tr>
  )
}

export {EmployeeContainer};


