import React, {useEffect, useState} from 'react';
import './App.css';
import * as EmployeeServiceApi from "../API/EmployeeService";
import {Header} from "./Layout/Header/Header";
import {Main} from "./Layout/Main/Main";
import {Footer} from "./Layout/Footer/Footer";

function App() {
  return (
    <div id={"app-wrapper"}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
