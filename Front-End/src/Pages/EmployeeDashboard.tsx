import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import logo from "../media/logo.svg"
import { Booking } from "../DTO/dtos";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { getHotelName } from "./Home"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const EmployeeDashboard = ({ employee }) => {

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

  const [hotels, setHotels] = useState<Booking[]>([]);
  let url = new URL('http://localhost:4000/EmployeeBookings')
  url.searchParams.append('hotelid', employee.hotelid)
  useEffect(() => {
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
    let url = new URL('http://localhost:4000/HotelBookings/' + hotel.hotelid)
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
    let url = new URL('http://localhost:4000/HotelBookings/' + hotel.hotelid)
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
        <div className="mx-32 mt-32">
          <div className=" mb-10 text-center">Bookings</div>
        </div>
      </Container>
      <Container>
        <Grid>
          {
            hotels.map((hotel) => {
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
                      className="h-[3rem] flex-3"
                      onClick={() => {
                        handleDelete(hotel);
                      }}
                    >
                      Delete
                    </Button>
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
          }
        </Grid>
      </Container>


    </>

  );
}