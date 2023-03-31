import { useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import { NavBar } from "./components/NavBar";
import { Customer, Employee } from "./DTO/dtos";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { EmployeeDashboard } from "./Pages/EmployeeDashboard";

function App() {
    const [customer, setCustomer] = useState<Customer | undefined>(undefined);
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);
    return (
        <>
            <NavBar customer={customer} setCustomer={setCustomer} employee ={employee} setEmployee = {setEmployee} />
            <Routes>
                <Route path="/" element={!employee? (<Home customer={customer}/>) : (<EmployeeDashboard employee={employee}/>)}></Route>
                <Route path="/login" element={<Login customer={customer} setCustomer={setCustomer} employee={employee} setEmployee={setEmployee}/>}></Route>
                <Route path="/Register" element={<Register customer={customer} setCustomer={setCustomer}/>}></Route>
                
            </Routes>
        </>
    );
}

export default App;
