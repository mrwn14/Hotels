//basic learning file to just get myself familiar with express.js


//This is the file where we put our code for the api.
//To run this file, run the following command (found in the package.json) ` npm run devStart `
const express = require('express');
const cors = require('cors');
const pool = require("./db");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(cors())
pool.connect();

// req = request
// res = response
// app.(http request) to send any http request to the url in the first parameter of the function  
app.get('/',(req, res) => {
    res.send('Hi')
})


// // ROUTES
app.get('/Hotels', async (req, res) => {
    try {
        query = "SELECT * FROM room WHERE "
        params = req.query;
        query += "roomID NOT IN (SELECT room.roomID FROM room LEFT JOIN booking ON room.RoomID = booking.RoomID WHERE (\'"+ params["checkIn"] +"\' BETWEEN booking.CheckinDate AND booking.CheckoutDate)" 
        + (params["checkOut"]!="undefined"? " AND '"+ params["checkOut"] + "' BETWEEN booking.CheckinDate AND booking.CheckoutDate)" : ")")
        + (params["capacity"]!="undefined"? " AND room.capacity = "+params["capacity"] : "")
        + (params["rating"]!="undefined"? " AND room.roomid in (SELECT roomid from room NATURAL JOIN hotel where hotel.category = "+params["rating"]+")":"")
        + (params["price"]!="undefined"? " AND room.price <= " + params["price"] : "")
        + (params["city"]!="undefined"? " AND room.roomid in (SELECT roomid from room NATURAL JOIN hotel where hotel.address LIKE '%"+params["city"]+"%')":"")
        + (params["hotelChain"]!="undefined"? " AND room.hotelID LIKE '" + params["hotelChain"] +"%'": "")
        
        const send = await pool.query(query +";");
        res.json(send.rows);
    }
    catch (err) {
        console.log(err);
    }

})

//to be filled later
app.post('/Hotels/Booking', async (req, res) => {
    let x = "SELECT * FROM room, booking";
    let query = "SELECT";

    console.log(req.body);
})

app.get('/Hotels/:id', async (req, res) => {
    try {
        query = "SELECT * FROM hotel WHERE hotelID = '"+req.params.id +"'";
        const send = await pool.query(query +";");
        res.json(send.rows);
    }
    catch (err) {
        console.log(err);
    }
})


// //get 
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});