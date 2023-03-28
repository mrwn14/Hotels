import { NavBar } from "../components/NavBar";
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
import { cities, hotelChains } from "../data/data";
import { Room } from "../DTO/dtos";
import { HotelCard } from "../components/HotelCard";

export const Home = () => {
    const [checkInValue, setCheckInValue] = useState<Dayjs | null>(dayjs());
    const [checkOutValue, setCheckOutValue] = useState<Dayjs | null>();
    const [capacity, setCapacity] = useState<Number>();
    const [rating, setRating] = useState<Number>();
    const [city, setCity] = useState<string>();
    const [hotelChain, setHotelChain] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [data, setData] = useState<Room[]>([]);
    const [done, setDone] = useState<boolean>(false);

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

    const getCity = (address: string) =>  {
        const addressArr = address.split(", ");
        const city = addressArr[addressArr.length - 2];
        return city;
      }


    const compileData = (checkInValue: dayjs.Dayjs | null | undefined, checkOutValue: dayjs.Dayjs | null | undefined, capacity: Number | null | undefined, rating: Number | null | undefined, city: string | null | undefined, hotelChain: string | null | undefined, price: string | null | undefined) => {
        let newCheckIn, newCheckOut, newCapacity, newRating, newCity, newHotelChain, newPrice;
        // newCheckIn = ((checkInValue===undefined||checkInValue===null)? "undefined" : checkInValue.format("YYYY-MM-DD"));
        if (checkInValue === undefined || checkInValue == null) {
            newCheckIn = "undefined"; 
        } else newCheckIn = checkInValue.format("YYYY-MM-DD");
        if (checkOutValue === undefined || checkOutValue == null) {
            newCheckOut = "undefined";
        } else newCheckOut = checkOutValue.format("YYYY-MM-DD");
        if (capacity == undefined || capacity == null) {
            newCapacity = "undefined";
        } else newCapacity = capacity.toString();
        if (rating == undefined || rating == null) {
            newRating = "undefined";
        } else newRating = rating.toString();
        if (city == undefined   || city == null) {
            newCity = "undefined";
        } else newCity = city;
        if (hotelChain == undefined || hotelChain == null) {
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
        if (price == undefined || price == null) {
            newPrice = "undefined";
        } else newPrice = price;

        let data = {
            "checkIn": newCheckIn,
            "checkOut": newCheckOut,
            "capacity": newCapacity,
            "rating": newRating,
            "city": newCity,
            "hotelChain": newHotelChain,
            "price": newPrice
        }
        return data;
    }

    const handleClick = () => {
        let data = compileData(checkInValue, checkOutValue, capacity, rating, city, hotelChain, price);
        let url = new URL('http://localhost:4000/Hotels')
        Object.keys(data).forEach(key => url.searchParams.append(key, data[key as keyof typeof data]))
        fetch(url).then(response => {return response.json();}).then(
            data => {
                let rooms:Room[] = []
                for (const key in data) {
                    let url = new URL('http://localhost:4000/Hotels/' + data[key]["hotelid"]);
                    fetch(url).then( response => {return response.json();}).then(
                        category => {
                            console.log(category[0])
                            data[key]["category"] = category[0]["category"]
                            data[key]["address"] = getCity(category[0]["address"])
                        }
                    )
                    let id = data[key]["hotelid"]
                    switch (id[1]) {
                        case "1":
                            data[key]["chain"] = "Marriott";
                            break;
                        case "2":
                            data[key]["chain"] = "Hilton";
                            break;
                        case "3":
                            data[key]["chain"] = "Fairmont";
                            break;
                        case "4":
                            data[key]["chain"] = "Galaxy";
                            break;
                        case "5":
                            data[key]["chain"] = "Refresh Resort";
                            break;
                        default:
                            data[key]["chain"] = "Marriott";
                            break;
                    }
                    let room:Room = data[key];
                    rooms.push(room)
                    console.log(room)
                }
                setData(rooms)
            }
        )
        setDone(true);
    }
    return (
        <>
            <Container maxWidth="lg" className="mt-16">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="bg-slate-50 shadow-lg rounded-[3rem] pt-4 pb-4 max-w-3xl mx-auto"
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
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="mt-2">
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
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="lg" className="mt-10">
                {
                    done? <Grid
                    container
                    direction={"row"}
                    justifyContent="space-evenly"
                    alignItems="stretch"
                >
                    {
                        data.map(room => (
                            <HotelCard 
                            extendable = {room.extendable}
                            damages = {room.damages}
                            mountain = {room.mountainview}
                            sea = {room.seaview}
                            city = {room.address}
                            hotelChain = {room.chain}
                            rating = {room.category}
                            price = {room.price}
                            />
                        ))
                    }
                    </Grid>
                    :
                    null
                }
                
            </Container>
        </>
    );
};
