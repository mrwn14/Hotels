import { NavBar } from "../../components/NavBar";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
    Container,
    FormControl,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    Box,
    SelectChangeEvent,
    TextField,
    Button,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { cities, hotelChains } from "../../data/data";
import { Room } from "../../DTO/dtos";
import { HotelCard } from "../../components/HotelCard";
export const getHotelName = (id : string) : string => {
    switch (id.charAt(1)) {
        case "1":
            return "Marriott";
        case "2":
            return "Hilton";
        case "3":
            return "Fairmont";
        case "4":
            return "Galaxy";
        case "5":
            return "Refresh Resort";
        default:
            return "";
    }
}
export const Home = ({customer}) => {
    const [checkInValue, setCheckInValue] = useState<Dayjs | null>(dayjs());
    const [checkOutValue, setCheckOutValue] = useState<Dayjs | null>();
    const [capacity, setCapacity] = useState<Number>();
    const [rating, setRating] = useState<Number>();
    const [city, setCity] = useState<string>();
    const [hotelChain, setHotelChain] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [rooms, setRooms] = useState<string>();
    const [data, setData] = useState<Room[]>();
    const [queried, setQueried] = useState<boolean>(false);

    let minCheckOutDate: Dayjs | null = null;

    if (checkInValue != null) {
        let temp = checkInValue;
        minCheckOutDate = temp.add(1, "day");

    }

    const handleCapacityChange = (event: SelectChangeEvent) => {
        setCapacity(event.target.value as unknown as Number);
    };
    const handleRatingChange = (event: SelectChangeEvent) => {
        setRating(event.target.value as unknown as Number);
    };
    const handleCityChange = (event: SelectChangeEvent) => {
        setCity(event.target.value);
    };
    const handleHotelChainChange = (event: SelectChangeEvent) => {
        setHotelChain(event.target.value);
    };
    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };
    const handleRoomsChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRooms(event.target.value);
    };

    const getCity = (address: string) : string =>  {
        const addressArr = address.split(", ");
        const city = addressArr[addressArr.length - 2];
        return city;
      }

    const compileData = (checkInValue: dayjs.Dayjs | null | undefined, checkOutValue: dayjs.Dayjs | null | undefined, capacity: Number | null | undefined, rating: Number | null | undefined, city: string | null | undefined, hotelChain: string | null | undefined, price: string | null | undefined, rooms: string | null | undefined) => {
        let newCheckIn: string, newCheckOut: string, newCapacity:string, newRating:string, newCity:string, newHotelChain:string, newPrice:string, newRooms;
        // newCheckIn = ((checkInValue===undefined||checkInValue===null)? "undefined" : checkInValue.format("YYYY-MM-DD"));
        if (checkInValue === undefined || checkInValue == null) {
            newCheckIn = "undefined"; 
        } else newCheckIn = checkInValue.format("YYYY-MM-DD");
        if (checkOutValue === undefined || checkOutValue == null) {
            newCheckOut = "undefined";
        } else newCheckOut = checkOutValue.format("YYYY-MM-DD");
        if (capacity == undefined || capacity == null || capacity == 0) {
            newCapacity = "undefined";
        } else newCapacity = capacity.toString();
        if (rating == undefined || rating == null || rating == 0) {
            newRating = "undefined";
        } else newRating = rating.toString();
        if (city == undefined   || city == null || city == "") {
            newCity = "undefined";
        } else newCity = city;
        if (rooms == undefined   || rooms == null || rooms == "") {
            newRooms = "undefined";
        } else newRooms = rooms;
        if (hotelChain == undefined || hotelChain == null || hotelChain == "") {
            newHotelChain = "undefined";
        } else{
            switch (hotelChain) {
                case "Marriott":
                    newHotelChain = "11";
                    break;
                case "Hilton":
                    newHotelChain = "12";
                    break;
                case "Fairmont":
                    newHotelChain = "13";
                    break;
                case "Galaxy":
                    newHotelChain = "14";
                    break;
                case "Refresh Resort":
                    newHotelChain = "15";
                    break;
                default:
                    newHotelChain = "impossible";
                    break;
            }
        } 
        if (price == undefined || price == null || rooms == "") {
            newPrice = "undefined";
        } else newPrice = price;

        let data = {
            "checkIn": newCheckIn,
            "checkOut": newCheckOut,
            "capacity": newCapacity,
            "rating": newRating,
            "city": newCity,
            "hotelChain": newHotelChain,
            "price": newPrice,
            "rooms": newRooms,
        }
        return data;
    }
    //Filter button handler, get request to api which sends back room information, which is filtered then saved under 'data'
    const handleClick = () => {
        let data = compileData(checkInValue, checkOutValue, capacity, rating, city, hotelChain, price, rooms);
        if (data.checkOut != "undefined") {
            let url = new URL('http://localhost:4000/Hotels')
            Object.keys(data).forEach(key => url.searchParams.append(key, data[key as keyof typeof data]))
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data: Room[]) => {
                    setQueried(true);
                    data.map((room) => {
                        room.hotelName = getHotelName(room.hotelid);
                        room.fullAddress = room.address;
                        room.address = getCity(room.address);
                        return room;
                    })
                    console.log(data);
                    setData(data);
                });
            }
        else {
            alert("Enter a checkout date");
        }
        console.log(data);
    }
    return (
        <>
            <Container maxWidth="xl" className="mt-16">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="bg-slate-50 shadow-lg rounded-[3rem] pt-4 pb-4 max-w-4xl mx-auto"
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <div className="TimePickers mx-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DatePicker", "DatePicker"]}
                                >
                                    <DatePicker
                                        className="min-w["
                                        label="Check-in"
                                        defaultValue={dayjs()}
                                        disablePast={true}
                                        maxDate={dayjs()
                                            .set("year", 2025)
                                            .set("month", 1)
                                            .set("date", 1)}
                                        value={checkInValue}
                                        onChange={(newValue) =>
                                            setCheckInValue(newValue)
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="TimePickers mx-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={["DatePicker", "DatePicker"]}
                                >
                                    <DatePicker
                                        label="Check-out"
                                        disablePast={true}
                                        maxDate={dayjs()
                                            .set("year", 2025)
                                            .set("month", 1)
                                            .set("date", 1)}
                                        value={checkOutValue}
                                        onChange={(newValue) =>
                                            setCheckOutValue(newValue)
                                        }
                                        minDate={minCheckOutDate}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="mt-2">
                            <Button
                                variant="contained"
                                size="large"
                                className="h-[3rem]"
                                onClick={() => {
                                    handleClick();
                                }}
                            >
                                Filter
                            </Button>
                        </div>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <div className="mx-3 self-center mt-2">
                            <Box sx={{ minWidth: 110 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Capacity
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={capacity as unknown as string}
                                        label="capacity"
                                        onChange={handleCapacityChange}
                                    >
                                        <MenuItem onClick={()=>{setCapacity(0)}}><div className="text-[color:#EFF4FB]">Reset</div></MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="mx-3 self-center mt-2">
                            <Box sx={{ minWidth: 110 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        City
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="capacity"
                                        onChange={handleCityChange}
                                    >
                                        <MenuItem onClick={()=>{setCity("")}}><div className="text-[color:#EFF4FB]">Reset</div></MenuItem>
                                        {cities.map((city) => (
                                            <MenuItem value={city}>
                                                {city}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="mx-3 self-center mt-2">
                            <Box sx={{ minWidth: 130 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Hotel Chain
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={hotelChain}
                                        label="capacity"
                                        onChange={handleHotelChainChange}
                                    >
                                        <MenuItem onClick={()=>{setHotelChain("")}}><div className="text-[color:#EFF4FB]">Reset</div></MenuItem>
                                        {hotelChains.map((hotelChain) => (
                                            <MenuItem value={hotelChain}>
                                                {hotelChain}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="mx-3 self-center mt-2">
                            <Box sx={{ minWidth: 110 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Rating
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={rating as unknown as string}
                                        label="rating"
                                        onChange={handleRatingChange}
                                    >
                                        <MenuItem onClick={()=>{setRating(0)}}><div className="text-[color:#EFF4FB]">Reset</div></MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="mt-2 mx-3">
                            <TextField
                                id="outlined-basic"
                                label="Max $"
                                variant="outlined"
                                className="w-20"
                                onChange={handlePriceChange}
                                type="number"
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                        </div>
                        <div className="mt-2 mx-3">
                            <TextField
                                id="outlined-basic"
                                label="Rooms"
                                variant="outlined"
                                className="w-20"
                                onChange={handleRoomsChange}
                                type="number"
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl" className="mt-10">
                <Grid
                    container
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="stretch"
                >
                    { data &&
                        data.map(room => (
                            <HotelCard 
                                extendable = {room.extendable}
                                damages = {room.damages}
                                mountain = {room.mountainview}
                                sea = {room.seaview}
                                address = {room.address}
                                hotelChain = {room.hotelName}
                                hotelid = {room.hotelid}
                                fullAddress={room.fullAddress}
                                rating = {room.category}
                                price = {room.price}
                                amenities = {room.amenities}
                                checkInValue = {checkInValue?.format("YYYY-MM-DD")}
                                checkOutValue = {checkOutValue?.format("YYYY-MM-DD")}
                                capacity = {room.capacity}
                                roomid = {room.roomid}
                                customerid={customer?.customerid}
                            />
                        ))
                    }
                    { 
                    queried && data &&data.length == 0
                    &&
                    <div>No hotel rooms were found for this combination of parameters</div>
                    }
                    </Grid>                
            </Container>
        </>
    );
};
