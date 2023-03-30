/**
 * ©️ Tawfiq Abubaker / Marouane Bouzzit - 2023 ©️
 */

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
    res.send('Hotels API running ✔️')
})


// // ROUTES
app.get('/Hotels', async (req, res) => {
    try {
        query = "SELECT roomid, room.hotelid, roomnumber, price, amenities, capacity, seaview, mountainview, extendable, damages, Address, Category FROM room, hotel WHERE room.HotelID = hotel.HotelID AND "
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

app.post('/Login', async (req, res) => {
    //form data
    let email = req.body.email;
    let password = req.body.password;
    //building query and performing it
    let query = "SELECT * FROM customer WHERE customer.email = '"+email+"' AND password = '"+password+"'"
    const queryResult = await pool.query(query +";");
    //checking if the user is the table, if not then sending status 404, if user in table send status 200
    if(queryResult.rows.length == 0){
        res.status(404).send('not found')
    }
    else if (queryResult.rows.length == 1){
        res.status(200).json(queryResult.rows);
    }
})

app.post('/Register', async (req, res) => {

    //form data
    let email = req.body.email;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let ssn = req.body.ssn;
    let address = req.body.address;
    let dateofregistration = req.body.dateofregistration;

    // Verifying if the customer already exists
    const duplicateFinder = await pool.query("SELECT * from customer WHERE customer.ssn='"+ssn+"' OR customer.email='"+email+"';");
    if(duplicateFinder.rows.length>0){
        res.status(404).send('Account already exists');
    }
    else{
        let query = "INSERT INTO Customer VALUES (DEFAULT,'"
                                                        +email+"','"
                                                        +password+"','"
                                                        +fullname+"','"
                                                        +address+"','"
                                                        +ssn+"','"
                                                        +dateofregistration+"')"
                                                        +" RETURNING *";
        let queryResult;
        console.log(query);
        try {
            queryResult = await pool.query(query + ";");
        } catch (error) {
            console.log("Insertion failed.");
        }
        //if queryResult.rows is undefined (couldn't insert), it will send res.status(200) not found
        //else it's true
        try {
            if (queryResult.rows) {

                res.status(200).send(queryResult.rows);
            }
        } catch (error) {
            res.status(404).json("Invalid data, couldn't insert");
        }
    } 
})

//Kept for future reference 

// app.get('/Hotels/:id', async (req, res) => {
//     try {
//         query = "SELECT * FROM hotel WHERE hotelID = '"+req.params.id +"'";
//         const send = await pool.query(query +";");
//         res.json(send.rows);
//     }
//     catch (err) {
//         console.log(err);
//     }
// })


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
