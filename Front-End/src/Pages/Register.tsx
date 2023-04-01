import axios from "axios";
import dayjs from "dayjs";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Customer } from "../DTO/dtos";

export const Register = ({ customer, setCustomer }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fullnameRef = useRef<HTMLInputElement>(null);
    const ssnRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let data = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            fullname: fullnameRef.current?.value,
            ssn: ssnRef.current?.value,
            address: addressRef.current?.value,
            dateofregistration: dayjs().format().slice(0,10), //current day in YYYY-MM-DD format
        };
        axios
            .post("http://localhost:4000/Register", data)
            .then((response) => {
                console.log(response.data[0])
                setCustomer({
                    customerid: response.data[0].customerid, //adding the generated id
                    ...data //adding the data we already have
                })  
            })
            .catch((error) => {
                alert(error.response.data);
            });
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 mx-auto lg:py-0 h-screen">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-16">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                <u>Create an account</u>
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} autoComplete="off">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Full name
                                    </label>
                                    <input
                                        type="name"
                                        ref={fullnameRef}
                                        name="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Paul McCartney"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@email.com"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        ref={passwordRef}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="ssn"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        SSN
                                    </label>
                                    <input
                                        type="number"
                                        ref={ssnRef}
                                        name="ssn"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="xxxxxxxxx trust us 😇"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="address"
                                        ref={addressRef}
                                        name="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="38 Connor St, ON, Canada"
                                        required={true}
                                    />
                                </div>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                        Register
                                    </button>
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
