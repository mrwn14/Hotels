import { useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import { NavBar } from "./components/NavBar";
import { Customer } from "./DTO/dtos";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

function App() {
    const [customer, setCustomer] = useState<Customer>();
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home customer={customer}/>}></Route>
                <Route path="/login" element={<Login customer={customer} setCustomer={setCustomer}/>}></Route>
                <Route path="/Register" element={<Register customer={customer} setCustomer={setCustomer}/>}></Route>
                
            </Routes>
        </>
    );
}

export default App;
