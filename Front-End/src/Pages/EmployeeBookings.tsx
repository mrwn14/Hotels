import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Booking } from "../DTO/dtos";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { getHotelName } from "./Home"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


export const EmployeeBookings = ({ employee }) => {
  const [hotels, setHotels] = useState<Booking[]>([]);

  const getBookings = () => {
    let url = new URL('http://localhost:4000/EmployeeBookings')
    url.searchParams.append('hotelid', employee.hotelid)
    fetch(url)
      .then(response => response.json())
      .then((data: Booking[]) => {
        data.map((hotel) => {
          hotel.hotelid = hotel.hotelid.toString()
          hotel.customerid = hotel.customerid.toString()
          console.log(hotel)
          return hotel
        })
        setHotels(data)
      })
  }


  useEffect(() => {
    getBookings();
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

    console.log(data)
    let url = new URL('http://localhost:4000/HotelBookings/')
    Object.keys(data).forEach(key => url.searchParams.append(key, data[key as keyof typeof data]))
    fetch(url, { method: 'DELETE' })
      .then(response => {
        if (response.status === 200) {
          alert("Booking deleted successfully")
          nav("/")
        }
        getBookings()
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handleRenting = (hotel) => {
    let data = {
      bookingid: hotel.bookingid.toString(),
      customerid: hotel.customerid.toString(),
      hotelid: hotel.hotelid.toString(),
      roomid: hotel.roomid.toString(),
      bookingdate: hotel.bookingdate.toString(),
      checkindate: hotel.checkindate.toString(),
      checkoutdate: hotel.checkoutdate.toString()
    }
    axios
      .post("http://localhost:4000/HotelBookings/" + hotel.hotelid, data)
      .then((response) => {
        if (response.status == 200) {
          alert('Customer checked in successfully');
          getBookings()
          nav('/')
        }

      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <>
      <Container>
          <div className=" text-center font-semibold mb-5 text-3xl mt-24">Bookings</div>
      </Container>
      <Container maxWidth="md">
        <Grid>
          { hotels.length!= 0? 
            hotels.map((hotel) => {
              return (
                <Accordion >
                  <AccordionSummary
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
                      Booking of customer {hotel.customerid} with id {hotel.bookingid} and room id {hotel.roomid}
                      {" hotel from "}
                      {dayjs(hotel.checkindate).format("LL")} -{" "}
                      {dayjs(hotel.checkoutdate).format("LL")}
                    </Typography>
                    <div className="mx-5">
                      <Button
                        variant="contained"
                        size="large"
                        className="h-[3rem] flex-3"
                        onClick={() => {
                          handleDelete(hotel);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    
                    <Button
                      variant="contained"
                      size="large"
                      className="h-[3rem] flex-3 m-3"
                      onClick={() => {
                        handleRenting(hotel);
                      }}
                    >
                      Rent
                    </Button>
                  </AccordionDetails>
                </Accordion>
              )

            })
          :
          <div className="text-center">
            No bookings yet.
          </div>
          }
        </Grid>
      </Container>


    </>

  );
}