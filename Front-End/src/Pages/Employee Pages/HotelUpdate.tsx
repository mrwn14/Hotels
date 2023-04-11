import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee, Hotel} from "../../DTO/dtos";
type Props = {
    employee: Employee | undefined
}
export const HotelUpdate = ({employee}: Props) => {
    const [category, setCategory] = useState<number>();
    const [newCategory, setNewCategory] = useState<number>();

    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [hotelInfo, setHotelInfo] = useState<Hotel>();

    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setNewCategory(event.target.value as unknown as number);
    };
    const getHotel = () => {
        fetch("http://localhost:4000/Hotel/" + employee?.hotelid)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                
                setCategory(data[0].category);
                setEmail(data[0].contactemail);
                setAddress(data[0].address);
                setPhone(data[0].phonenumber);
                setHotelInfo(data[0]);
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let categoryValue = (newCategory? newCategory : category);
        let emailValue = (emailRef.current?.value == "") ? email : emailRef.current?.value;
        let addressValue = (addressRef.current?.value == "") ? address : addressRef.current?.value;
        let phoneValue = (phoneRef.current?.value == "") ? phone : phoneRef.current?.value;

        let data = {
            hotelid : hotelInfo?.hotelid,
            chainid: hotelInfo?.chainid,
            category: categoryValue,
            numofrooms: hotelInfo?.numofrooms,
            address: addressValue,
            contactemail: emailValue,
            phonenumber: phoneValue
        };
        console.log(data);
        axios
            .patch("http://localhost:4000/UpdateHotel", data)
            .then((response) => {
                alert("The hotel information has been updated");
                nav("/")
            })
            .catch((error) => {
                alert(error.response.data);
            });
    }
   
    useEffect(() => {
        getHotel();
    }, [])

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 mx-auto lg:py-0 h-screen">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-16">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                <u>Update Hotel info</u>
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit}
                                autoComplete="off"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Category
                                    </label>
                                    <div className="flex">
                                        <div className="flex-1 h-6">
                                            <input
                                                type="number"
                                                value={category}
                                                name="name"
                                                className="h-14 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required={true}
                                            />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">
                                                        New Category
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={newCategory as unknown as string}
                                                        label="rating"
                                                        onChange={handleCategoryChange}
                                                    >
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
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
                                        Phone Number
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="tel"
                                            value={phone}
                                            name="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                        <input
                                            type="tel" 
                                            id="phone" 
                                            name="phone" 
                                            pattern="[0-9]{10}"
                                            ref={phoneRef}
                                            placeholder="new phone number"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
