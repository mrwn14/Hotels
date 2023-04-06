import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Booking } from "../DTO/dtos";
import { useNavigate } from "react-router-dom";
import { getHotelName } from "./Home";
import { Container } from "@mui/system";
import dayjs from "dayjs";

export const Bookings = ({ customer }) => {
    const [hotels, setHotels] = useState<Booking[]>([]);
    let url = new URL(
        "http://localhost:4000/HotelBookings/" + customer.customerid
    );

    const getBookings = () => {
        fetch(url)
            .then((response) => {
                if (response.status == 404) {
                    setHotels([]);
                    throw new Error(response.statusText);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setHotels(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getBookings();
    }, []);

    const nav = useNavigate();
    const handleDelete = (hotel: Booking) => {
        let data = {
            bookingid: hotel.bookingid.toString(),
            customerid: hotel.customerid.toString(),
            hotelid: hotel.hotelid.toString(),
            roomid: hotel.roomid.toString(),
            bookingdate: hotel.bookingdate.toString(),
            checkindate: hotel.checkindate.toString(),
            checkoutdate: hotel.checkoutdate.toString(),
        };
        let url = new URL("http://localhost:4000/HotelBookings/");
        Object.keys(data).forEach((key) =>
            url.searchParams.append(key, data[key as keyof typeof data])
        );
        fetch(url, { method: "DELETE" })
            .then((response) => {
                if (response.status == 200) {
                    alert("Booking deleted successfully");
                    nav("/");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="mt-16">
            <div className="text-center font-semibold mb-5 text-3xl">
                Your bookings
            </div>
            <Container maxWidth="md">
                {hotels.map((hotel: Booking) => {
                    return (
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                key={hotel.bookingid}
                            >
                                <Typography variant="h6">
                                    {getHotelName(hotel.hotelid)}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className="flex">
                                <Typography className="flex-1">
                                    Booking at {getHotelName(hotel.hotelid)}
                                    {" hotel from "}
                                    {dayjs(hotel.checkindate).format(
                                        "LL"
                                    )} -{" "}
                                    {dayjs(hotel.checkoutdate).format("LL")}
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className="h-[3rem] flex-3 m-3"
                                    onClick={() => {
                                        handleDelete(hotel);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Container>
        </div>
    );
};
