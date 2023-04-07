import axios from "axios";
import { useRef } from "react";
import { Customer } from "../DTO/dtos";
type Props = {
    customer: Customer
  }
export const Update = ({ customer }: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const fullnameRef = useRef<HTMLInputElement>(null);
    const ssnRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('the id is ', customer.customerid);
        
        let data = {
            customerid: customer.customerid,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            fullname: fullnameRef.current?.value,
            ssn: ssnRef.current?.value,
            address: addressRef.current?.value,
            dateofregistration: customer.dateofregistration,
        };
        axios
            .patch("http://localhost:4000/UpdateCustomer", data)
            .then((response) => {
                console.log(response.data[0])
            })
            .catch((error) => {
                alert(error.response.data);
            });
    }
    return(
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 mx-auto lg:py-0 h-screen">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-16">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                <u>Update account info</u>
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
                                        defaultValue={customer.fullname}
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
                                        defaultValue={customer.email}
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
                                        defaultValue={customer.password}
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
                                        defaultValue={customer.ssn}
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
                                        defaultValue={customer.address}
                                        name="address"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="38 Connor St, ON, Canada"
                                        required={true}
                                    />
                                </div>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                        Update
                                    </button>
                                </div>

                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
