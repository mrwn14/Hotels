import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../DTO/dtos";
type Props = {
    customer: Customer | undefined;
    setCustomer;
};
export const CustomerUpdate = ({ customer, setCustomer }: Props) => {
    const [fullname, setFullname] = useState(customer?.fullname);
    const [email, setEmail] = useState(customer?.email);
    const [address, setAddress] = useState(customer?.address);
    const [SSN, setSSN] = useState(customer?.ssn);
    const [password, setPassword] = useState(customer?.password);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fullnameRef = useRef<HTMLInputElement>(null);
    const ssnRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();


    const getCustomer = () => {
        fetch("http://localhost:4000/Customer/" + customer?.customerid)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setFullname(data[0]["fullname"]);
                setEmail(data[0]["email"]);
                setAddress(data[0]["address"]);
                setSSN(data[0]["ssn"]);
                setPassword(data[0]["password"]);
            });
    };

    useEffect(() => {
        getCustomer();
    });

    const handleSubmit = () => {

        let emailValue = (emailRef.current?.value == "")? email : emailRef.current?.value;
        let passwordValue = (passwordRef.current?.value == "")? password : passwordRef.current?.value;
        let fullnameValue = (fullnameRef.current?.value == "")? fullname : fullnameRef.current?.value;
        let ssnValue = (ssnRef.current?.value == "")? SSN : ssnRef.current?.value;
        let addressValue = (addressRef.current?.value == "")? address : addressRef.current?.value;

        let data = {
            customerid: customer?.customerid,
            email: emailValue,
            password: passwordValue,
            fullname: fullnameValue,
            ssn: ssnValue,
            address: addressValue,
            dateofregistration: customer?.dateofregistration,
        };
        axios
            .patch("http://localhost:4000/UpdateCustomer", data)
            .then((response) => {
                alert("Your account has been updated");
                setCustomer(data);
                nav("/");
            })
            .catch((error) => {
                alert(error.response.data);
            });
    };

    const handleDelete = () => {
            let url = new URL(
                "http://localhost:4000/Customer/" + customer?.customerid
            );
            fetch(url, { method: "DELETE" })
                .then((response) => {
                    if (response.status === 200) {
                        alert("Account deleted successfully");
                        window.location.replace("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 mx-auto lg:py-0 h-screen">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-16">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                <u>Update account info</u>
                            </h1>
                            <div
                                className="space-y-4 md:space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Full name
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="name"
                                            value={fullname}
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />

                                        <input
                                            type="name"
                                            ref={fullnameRef}
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="New name"
                                        />
                                    </div>

                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="email"
                                            value={email}
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                        <input
                                            type="email"
                                            ref={emailRef}
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="new email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="password"
                                            value={password}
                                            name="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                        <input
                                            type="password"
                                            ref={passwordRef}
                                            name="password"
                                            id="password"
                                            placeholder="new password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>

                                </div>
                                <div>
                                    <label
                                        htmlFor="ssn"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        SSN
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            value={SSN}
                                            name="ssn"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="xxxxxxxxx trust us 😇"
                                            required={true}
                                        />
                                        <input
                                            ref={ssnRef}
                                            type="tel" 
                                            id="ssn" 
                                            name="ssn" 
                                            pattern="[0-9]{9}"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="new SSN"
                                        />
                                    </div>

                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Address
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="address"
                                            value={address}
                                            name="address"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="38 Connor St, ON, Canada"
                                            required={true}
                                        />
                                        <input
                                            type="address"
                                            ref={addressRef}
                                            name="address"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="new address"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                            onClick = {handleSubmit}
                                    >
                                        Update
                                    </button>
                                </div>
                                <div className="mt-6">
                                    <button
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                                        onClick={handleDelete}
                                    >
                                        DELETE ACCOUNT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
