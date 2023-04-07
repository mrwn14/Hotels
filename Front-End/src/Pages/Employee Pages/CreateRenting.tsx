import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
interface roomAndId {
    roomnumber: string,
    roomid: number
}
export const CreateRenting = ({employee}) => {
    const [rooms, setRooms] = useState<roomAndId[]>();
    const [room, setRoom] = useState<number>();
    const nav = useNavigate();
    const [checkOutValue, setCheckOutValue] = useState<Dayjs | null>();
    const ssnRef = useRef<HTMLInputElement>(null);
    const formChecker = (event: React.FormEvent<HTMLFormElement>) => {
        if(ssnRef.current?.value.length != 9){
            alert('Please input a 9 letter long SSN')
        } else {
            if(!room){
                alert('Select a room number!')
            } else {
                if(!checkOutValue){
                    alert('Enter a checkout value!')
                } else {
                    return true;
                }
            }
        }
        return false;
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(formChecker(event)){
            let data = {
                ssn: ssnRef.current?.value,
                checkOutValue: checkOutValue?.format("YYYY-MM-DD"),
                roomid: rooms?.filter((roomf)=> parseInt(roomf.roomnumber) == room)[0].roomid,
                employeeid: employee.employeeid,
                checkInValue: dayjs().format("YYYY-MM-DD"),
                hotelid: employee.hotelid,
            };
            console.log(data);
            
            axios
                .post("http://localhost:4000/CreateRenting", data)
                .then((response) => {
                    alert('Renting created!'),
                    nav('/Rentings')
                })
                .catch((error) => {
                    alert(error.response.data);
                });
        }
        console.log('hamidddddd', ssnRef.current?.value, room, checkOutValue?.format("YYYY-MM-DD"));

    }
    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as unknown as number);
    }
    const getAvailableRooms = () => {
        let url = new URL("http://localhost:4000/AvailableRooms");
        url.searchParams.append("hotelid", employee.hotelid);
        fetch(url)
            .then((response) => response.json())
            .then((data: roomAndId[]) => {
                console.log(data);
                
                setRooms(data);
            });
    }
    useEffect(() => {
        getAvailableRooms();
    }, []);
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 mx-auto lg:py-0 h-screen">
                    <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mt-16">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                <u>Create a renting</u>
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} autoComplete="off">
                                <div>
                                    <label
                                        htmlFor="ssn"
                                        className="ml-1 block mb-2 text-sm text-gray-900 dark:text-white"
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
                                <div className="mt-2">
                                    
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">
                                                Room number
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={room}
                                                label="capacity"
                                                onChange={handleRoomChange}
                                            >
                                                {rooms && rooms.map((room) => (
                                                    <MenuItem value={room.roomnumber}>
                                                        {room.roomnumber}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="TimePickers">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={["DatePicker", "DatePicker"]}
                                        >
                                            <DatePicker
                                                label="Check-out"
                                                disablePast={true}
                                                minDate={dayjs().add(1, 'day')}
                                                maxDate={dayjs().add(2, 'month')}
                                                value={checkOutValue}
                                                onChange={(newValue) =>
                                                    setCheckOutValue(newValue)
                                                }
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>


                                <div className="mt-6">
                                    <button  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                        Register
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
