import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import logo from "../media/logo.svg"
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Booking } from "../DTO/dtos";
import { useNavigate } from "react-router-dom";
import { getHotelName } from "./Home"

export const Bookings = ({ customer }) => {
    const [hotels, setHotels] = useState<Booking[]>([]);
    const [show, setShow] = useState(false);

    const getBookings = () => {
        fetch(url)
            .then(response => {
                console.log(response)
                if (response.status == 404) {
                    setShow(false);
                    setHotels([]);
                    throw new Error(response.statusText);
                }
                else{
                    return response.json();
                }
            })
            .then((data) => {
                setHotels(data)
                setShow(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    

    let url = new URL('http://localhost:4000/HotelBookings/' + customer.customerid);
    useEffect(() => {
        fetch(url)
            .then(response => {
                if (response.status == 404) {
                    setShow(false);
                    setHotels([]);
                    throw new Error(response.statusText);
                }
                else{
                    return response.json();
                }
            })
            .then((data) => {
                setHotels(data)
                setShow(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    const nav = useNavigate();
    const handleDelete = (hotel: Booking) => {
        let data = {
            bookingid: hotel.bookingid.toString(),
            customerid: hotel.customerid.toString(),
            hotelid: hotel.hotelid.toString(),
            roomid: hotel.roomid.toString(),
            bookingdate: hotel.bookingdate.toString(),
            checkindate: hotel.checkindate.toString(),
            checkoutdate: hotel.checkoutdate.toString()
        }
        let url = new URL('http://localhost:4000/HotelBookings/' + hotel.hotelid)
        Object.keys(data).forEach(key => url.searchParams.append(key, data[key as keyof typeof data]))
        fetch(url, { method: 'DELETE' })
            .then(response => {
                if (response.status == 200) {
                    alert("Booking deleted successfully")
                    nav("/Bookings")
                }
                getBookings()
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            {
                show && hotels.map((hotel: Booking) => {
                    return (
                        <Accordion >
                            <AccordionSummary
                                expandIcon={logo}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                key={hotel.bookingid}
                            >
                                <Typography>
                                    {getHotelName(hotel.hotelid)}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="flex">
                                <Typography
                                    className="flex-1"
                                >
                                    This is your booking with id {hotel.bookingid} and room number {hotel.roomid}
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className="h-[3rem] flex-3 m-3"
                                    onClick={() => {
                                        handleDelete(hotel)
                                    }}
                                >
                                    Cancel
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    )
                }
                )
            }
        </>

    )
}
