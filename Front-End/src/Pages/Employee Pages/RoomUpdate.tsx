import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Employee, Hotel, Room} from "../../DTO/dtos";
type Props = {
    employee: Employee | undefined
}
export const RoomUpdate = ({employee}: Props) => {
    const [showRest, setShowRest] = useState<boolean>(false);

    //default data
    const [roomInfo, setRoomInfo] = useState<Room>();
    const [rooms, setRooms] = useState<Room[]>();
    const [capacity, setCapacity] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [amenities, setAmenities] = useState<string>();
    const [seaView, setSeaView] = useState<boolean>();
    const [mountainView, setMountainView] = useState<boolean>();
    const [extendable, setExtendable] = useState<boolean>();
    const [damages, setDamages] = useState<boolean>();
    //inputted data
    const [room, setRoom] = useState<Number>();
    const [newCapacity, setNewCapacity] = useState<number>();
    const priceRef = useRef<HTMLInputElement>(null);
    const amenitiesRef = useRef<HTMLInputElement>(null);
    const seaViewRef = useRef<HTMLInputElement>(null);
    const mountainViewRef = useRef<HTMLInputElement>(null);
    const extendableRef = useRef<HTMLInputElement>(null);
    const damagesRef = useRef<HTMLInputElement>(null);



    const nav = useNavigate();

    
    const getRooms = () => {
        fetch("http://localhost:4000/Room/" + employee?.hotelid)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setRooms(data);
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(seaView);
        
        let capacityValue = (newCapacity? newCapacity : capacity);
        let priceValue = (priceRef.current?.value == "") ? price : priceRef.current?.value;
        let amenitiesValue = (amenitiesRef.current?.value == "") ? amenities : amenitiesRef.current?.value;

        let data = {
            roomid: roomInfo?.roomid,
            hotelid: roomInfo?.hotelid,
            roomnumber: roomInfo?.roomnumber,
            price: priceValue,
            amenities: amenitiesValue,
            capacity: capacityValue,
            seaview: seaView,
            mountainview: mountainView,
            extendable: extendable,
            damages: damages,
        };
        console.log(data);
        
        axios
            .patch("http://localhost:4000/UpdateRoom", data)
            .then((response) => {
                alert("Your account has been updated");
                nav("/")
            })
            .catch((error) => {
                alert(error.response.data);
            });
    }

    const handleRoomChange = (event: SelectChangeEvent) => {
        setRoom(event.target.value as unknown as number);
        rooms?.forEach((room) => {
          if(room.roomnumber == parseInt(event.target.value)){
            setRoomInfo(room);
            setCapacity(room.capacity);
            setPrice(room.price);
            setAmenities(room.amenities);
            setShowRest(true);
            setSeaView(room.seaview);
            setMountainView(room.mountainview);
            setExtendable(room.extendable);
            setDamages(room.damages);
          };
        });
        
    };
    const handleCapacityChange = (event: SelectChangeEvent) => {
        setNewCapacity(event.target.value as unknown as number);
    };

    useEffect(() => {
        getRooms();
    }, []);

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
                                {showRest && <>

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Capacity
                                    </label>
                                    <div className="flex">
                                        <div className="flex-1 h-6">
                                            <input
                                                type="number"
                                                value={capacity}
                                                name="name"
                                                className="h-14 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required={true}
                                            />
                                        </div>
                                        
                                        <div className="flex-1">
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">
                                                        Capacity
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={newCapacity as unknown as string}
                                                        label="rating"
                                                        onChange={handleCapacityChange}
                                                    >
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Price
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="number"
                                            value={price}
                                            name="price"
                                            id="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                        <input
                                            ref={priceRef}
                                            type="tel" 
                                            id="price" 
                                            name="phone" 
                                            pattern="[0-9]{0,4}"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="new price"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Amenities
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="amenities"
                                            value={amenities}
                                            name="amenities"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required={true}
                                        />
                                        <input
                                            type="amenities"
                                            ref={amenitiesRef}
                                            name="amenities"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="new amenities"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-around">
                                  <div>
                                      <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={seaView} 
                                                                             inputProps={{ 'aria-label': 'controlled' }}
                                                                             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                              setSeaView(event.target.checked);
                                                                              }}

                                                                             />} label="Sea View" />
                                        <FormControlLabel control={<Checkbox checked={mountainView} 
                                                                             inputProps={{ 'aria-label': 'controlled' }}
                                                                             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                              setMountainView(event.target.checked);
                                                                              }}

                                                                             />} label="Mountain View" />
                                    </FormGroup>
                                  </div>
                                  <div>
                                    <FormGroup>
                                      <FormControlLabel control={<Checkbox checked={extendable} 
                                                                              inputProps={{ 'aria-label': 'controlled' }}
                                                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setExtendable(event.target.checked);
                                                                              }}

                                                                              />} label="Extendable" />
                                      <FormControlLabel control={<Checkbox checked={damages} 
                                                                              inputProps={{ 'aria-label': 'controlled' }}
                                                                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setDamages(event.target.checked);
                                                                              }}

                                                                              />} label="Damages" />
                                  </FormGroup>
                                  </div>
                                </div>
                                
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2C55D3] rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                        Update
                                    </button>
                                </div>
                                </> }
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
