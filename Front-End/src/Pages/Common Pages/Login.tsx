import axios from "axios";
import dayjs from "dayjs";
import * as React from "react";
import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Customer, Employee } from "../../DTO/dtos";

export const Login = ({customer, setCustomer, employee, setEmployee}) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [logged, setLogged] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        };
        axios
            .post("http://localhost:4000/Login", data)
            .then((response) => {
                if (response.status === 200) {
                    let tempResponse = response.data[0];
                    setCustomer(
                        {
                            address : tempResponse.address,
                            customerid: tempResponse.customerid,
                            dateofregistration: dayjs(tempResponse.dateofregistration),
                            email: tempResponse.email,
                            fullname: tempResponse.fullname,
                            ssn: tempResponse.ssn,
                        } as Customer
                    );
                }
                else if (response.status === 201) {
                    let tempResponse = response.data[0];
                    setEmployee(
                        {
                            employeeid: tempResponse.employeeid,
                            email: tempResponse.email,
                            password: tempResponse.password,
                            hotelid: tempResponse.hotelid,
                            fullname: tempResponse.fullname,
                            address: tempResponse.address,
                            ssn: tempResponse.ssn,
                            ismanager: tempResponse.ismanager
                        } as Employee
                    );
                }
                setLogged(true);
            })
            .catch((error) => {
                console.log(error);
                alert('Email/Password combination not found.');
            });

    };
    return (
        <div className="relative  max-w-md mx-auto mt-20">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-[#202020] underline">
                    Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            ref={emailRef}
                            className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            ref={passwordRef}
                            className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-[#2C55D3] hover:underline"
                        onClick={() => alert('too bad')}
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                        to="/Register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
                {logged && (
                    <Navigate to="/" replace={true} />
                 )}
            </div>
        </div>
    );
};
