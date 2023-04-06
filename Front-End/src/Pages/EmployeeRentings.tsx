import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import logo from "../media/logo.svg"
import { Renting } from "../DTO/dtos";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { getHotelName } from "./Home"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


export const EmployeeRentings = ({ employee }) => {
    const [hotels, setHotels] = useState<Renting[]>([]);
    const nav = useNavigate();

    const getBookings = () => {
        let url = new URL('http://localhost:4000/EmployeeRentings')
        url.searchParams.append('hotelid', employee.hotelid)
        fetch(url)
        .then(response => response.json())
        .then((data: Renting[]) => {
            data.map((hotel) => {
            hotel.hotelid = hotel.hotelid.toString()
            hotel.customerid = hotel.customerid.toString()
            console.log(hotel)
            return hotel
            })
            setHotels(data)
        })
    }



    const handleCheckOut = (hotel: Renting) => {
        let data = {
            rentingid: hotel.rentingid.toString(),
            customerid: hotel.customerid.toString(),
            hotelid: hotel.hotelid.toString(),
            roomid: hotel.roomid.toString(),
            checkindate: hotel.checkindate.toString(),
            checkoutdate: hotel.checkoutdate.toString()
        }

        console.log(data)
        let url = new URL('http://localhost:4000/HotelRentings')
        Object.keys(data).forEach(key => url.searchParams.append(key, data[key as keyof typeof data]))
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.status === 200) {
            alert("Customer Checked out successfully")
            }
            getBookings()
        })
        .catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        getBookings();
    }, [])

    return (
        <>
        <Container >
            <Grid
                container
                direction={"row"}
                justifyContent="space-evenly"
                alignItems="stretch"
                className="mt-24"
            >
                <div className="text-center font-semibold mb-5 text-3xl">Rentings</div>
                <div>
                <Button
                    variant="contained"
                    size="medium"
                    className="h-[3rem] flex-3"
                    onClick={() => {
                        nav('/CreateRenting');
                    }}
                >
                    Create Renting
                </Button>
                </div>
            </Grid>
        </Container>
        <Container maxWidth="md">
            <Grid>
            { hotels.length!= 0? 
                hotels.map((hotel) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            key={hotel.rentingid}
                        >
                            <Typography variant="h6">
                                {getHotelName(hotel.hotelid)}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="flex">
                            <Typography className="flex-1">
                                Renting at {getHotelName(hotel.hotelid)}
                                {" hotel from "}
                                {dayjs(hotel.checkindate).format("LL")} -{" "}
                                {dayjs(hotel.checkoutdate).format("LL")}
                            </Typography>
                            <div className="mx-6">
                                <Button
                                    variant="contained"
                                    size="large"
                                    className="h-[3rem] flex-3"
                                    onClick={() => {
                                        handleCheckOut(hotel);
                                    }}
                                >
                                    Check out
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                );

                })
            :
            <div className="text-center mt-16">
                No Rentings for this specific hotel room.
            </div>
            }
            </Grid>
        </Container>


        </>

    );
}