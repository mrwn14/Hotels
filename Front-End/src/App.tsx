import { useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import { NavBar } from "./components/NavBar";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login/>}></Route>
                
            </Routes>
        </>
    );
}

export default App;
