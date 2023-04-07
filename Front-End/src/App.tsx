import { useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import { NavBar } from "./components/NavBar";
import { Customer, Employee } from "./DTO/dtos";
import { Login } from "./Pages/Common Pages/Login";
import { Register } from "./Pages/Common Pages/Register";
import { EmployeeBookings, EmployeeRentings, EmployeeUpdate, CreateRenting, HotelUpdate, RoomUpdate } from "./Pages/Employee Pages/index";
import { HotelView, Bookings, Views, Home, CustomerUpdate} from "./Pages/Customer Pages/index";

function App() {
    const [customer, setCustomer] = useState<Customer | undefined>(undefined);
    const [employee, setEmployee] = useState<Employee | undefined>(undefined);
    return (
        <>
            <NavBar customer={customer} setCustomer={setCustomer} employee ={employee} setEmployee = {setEmployee} />
            <Routes>
                <Route path="/" element={!employee? (<Home customer={customer}/>) : (<EmployeeBookings employee={employee}/>)}></Route>
                <Route path="/login" element={<Login customer={customer} setCustomer={setCustomer} employee={employee} setEmployee={setEmployee}/>}></Route>
                <Route path="/Register" element={<Register customer={customer} setCustomer={setCustomer}/>}></Route>
                <Route path="/Bookings" element={<Bookings customer={customer}/>}></Route>
                <Route path="/CustomerUpdate" element={<CustomerUpdate customer={customer} setCustomer={setCustomer}/>}></Route>
                <Route path="/EmployeeUpdate" element={<EmployeeUpdate employee={employee} setEmployee={setEmployee}/>}></Route>
                <Route path="/Views" element={<Views/>}></Route>
                <Route path="/Rentings" element={<EmployeeRentings employee={employee}/>}></Route>
                <Route path="/CreateRenting" element={<CreateRenting employee={employee}/>}></Route>
                <Route path="/HotelUpdate" element={<HotelUpdate employee={employee}/>}></Route>
                <Route path="/RoomUpdate" element={<RoomUpdate employee={employee}/>}></Route>
                <Route path="/HotelDetails/:extendable/:damages/:mountain/:sea/:address/:fullAddress/:hotelid/:hotelChain/:rating/:price/:amenities/:checkInValue/:checkOutValue/:capacity/:roomid/:customerid" element={<HotelView customer={customer}/>}></Route>            
                
            </Routes>
        </>
    );
}

export default App;
