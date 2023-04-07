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


const employeeChecker = (email) => {
    let employee = false;
    email = email.split("@")[1].split(".")[0]
    if (email == "admin"){
        employee = true;
    }
    return employee
}
// req = request
// res = response
// app.(http request) to send any http request to the url in the first parameter of the function  
app.get('/',(req, res) => {
    res.send('Hotels API running ✔️')
})

// // ROUTES
// Get requests
app.get('/View1', async (req, res) =>{
    query = "Select * from Available_Rooms;"
    const send = await pool.query(query);
    res.json(send.rows);
})
app.get('/View2', async (req, res) =>{
    query = "Select * from Hotels_Capacity;"
    const send = await pool.query(query);
    res.json(send.rows);
})
app.get('/EmployeeBookings',async (req, res) => {
    params = req.query;
    let hotelId = params['hotelid'];
    query = "SELECT * FROM booking WHERE hotelid = '" + hotelId +"'";
    console.log(query);
    const send = await pool.query(query + ";");
    console.log(res.rows);
    res.json(send.rows);
})
app.get('/AvailableRooms',async (req, res) => {
    params = req.query;
    let hotelId = params['hotelid'];
    query = "SELECT room.roomnumber, room.roomid FROM room WHERE room.hotelid = '" + hotelId +"'"+
                                " AND room.roomid NOT IN (Select booking.roomid from booking where booking.hotelid = '" + hotelId +"')"+ 
                                " AND room.roomid NOT IN (Select renting.roomid from renting where renting.hotelid = '" + hotelId +"')"
    console.log(query);
    const send = await pool.query(query + ";");
    console.log(res.rows);
    res.json(send.rows);
})
app.get('/EmployeeRentings',async (req, res) => {
    params = req.query;
    let hotelId = params['hotelid'];
    query = "SELECT * FROM renting WHERE hotelid = '" + hotelId +"'";
    console.log(query);
    const send = await pool.query(query + ";");
    console.log(res.rows);
    res.json(send.rows);
})

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

app.get('/Customer/:id', async (req, res) => {
    query = "SELECT * FROM customer WHERE customer.customerid = '" + req.params.id +"'";
    console.log(query);
    send = await pool.query(query + ";");
    res.json(send.rows);
})

app.get('/Employee/:id', async (req, res) => {
    query = "SELECT * FROM employee WHERE employee.employeeid = '" + req.params.id +"'";
    console.log(query);
    send = await pool.query(query + ";");
    res.json(send.rows);
})

app.get('/HotelBookings/:customerid', async (req, res) => {
    query = "SELECT * FROM booking WHERE customerid = '" + req.params.customerid +"'";
    console.log(query);
    send = await pool.query(query + ";");
    console.log(res.rows);
    if (send.rows.length == 0) {
        res.status(404);
    }
    else if (send.rows.length > 0 ) {
        console.log(send.rows);
        res.status(200).json(send.rows);
    }
})

// Post requests
app.post('/Login', async (req, res) => {
    //form data
    let email = req.body.email;
    let password = req.body.password;
    //building query and performing it
    let employee = employeeChecker(email);
    let employeeQuery = "SELECT * FROM employee WHERE employee.email = '"+email+"' AND employee.password = '"+password+"'"
    let CustomerQuery = "SELECT * FROM customer WHERE customer.email = '"+email+"' AND customer.password = '"+password+"'"
    let query = ""
    employee? query = employeeQuery : query = CustomerQuery
    const queryResult = await pool.query(query +";");
    //checking if the user is the table, if not then sending status 404, if user in table send status 200
    if(queryResult.rows.length == 0){
        res.status(404).send('not found')
    }
    else if (queryResult.rows.length == 1 && !employee){
        res.status(200).json(queryResult.rows);
    }
    else if (queryResult.rows.length == 1 && employee){
        res.status(201).json(queryResult.rows);
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

app.post('/CreateRenting', async (req, res) => {
    //form data
    let hotelid = req.body.hotelid;
    let roomid = req.body.roomid;
    let ssn = req.body.ssn;
    let employeeid = req.body.employeeid;
    let checkInValue = req.body.checkInValue;
    let checkOutValue = req.body.checkOutValue;
    console.log("HUHFDUSHK");
    let customerFinderQuery = "SELECT customer.customerid FROM customer where customer.ssn='"+ssn+"';"
    const queryResult1 = await pool.query(customerFinderQuery);
    let customerid = queryResult1.rows[0].customerid;


    let query = "INSERT INTO Renting VALUES (DEFAULT,'"+hotelid+"','"+roomid+"','"+customerid+"','"+checkInValue+"','"+checkOutValue+"');"
    console.log(query);
    const queryResult = await pool.query(query);
    try {
        if (queryResult.rows) {
            res.status(200).send(queryResult.rows);
        }
    } catch (error) {
        res.status(404).json("Error occured.");
    }
})


app.post('/Book', async (req, res) => {
    //form data
    let customerid = req.body.customerid;
    let hotelid = req.body.hotelid;
    let roomid = req.body.roomid;
    let bookingdate = req.body.bookingdate;
    let checkInValue = req.body.checkInValue;
    let checkOutValue = req.body.checkOutValue;


    let query = "INSERT INTO booking VALUES (DEFAULT,'"+hotelid+"','"+roomid+"','"+customerid+"','"+bookingdate+"','"+checkInValue+"','"+checkOutValue+"');"
    console.log(query);
    const queryResult = await pool.query(query);
    //checking if the user is the table, if not then sending status 404, if user in table send status 200
    try {
        if (queryResult.rows) {
            res.status(200).send(queryResult.rows);
        }
    } catch (error) {
        res.status(404).json("Error occured.");
    }
})

app.post('/HotelBookings/:id', async (req, res) => {
    params = req.body
    let query1 = "INSERT INTO renting VALUES (DEFAULT, '"+params["hotelid"]+"','"+params["roomid"]+"','"+params["customerid"]+"','"+params["checkindate"]+"','"+params["checkoutdate"]+"') RETURNING *;"
    const send1 = await pool.query(query1);
    if (send1.rows) {
        let query2 = "DELETE FROM booking WHERE bookingID = '"+ params["bookingid"] + "'"
        const send2 = await pool.query(query2)
        res.sendStatus(200);
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

// Delete requests
app.delete('/HotelBookings/', async (req, res) => {
    params = req.query;
    let query1 = "INSERT INTO archive VALUES (DEFAULT, true,'"+ params["bookingid"] +"' , '"+params["hotelid"]+"', '"+ params["roomid"]+"', '"+ params["customerid"]+"', '"+ params["bookingdate"]+"', '"+ params["checkindate"]+"', '"+ params["checkoutdate"]+"') RETURNING *"
    console.log(query1);
    const send1 = await pool.query(query1);
    if (send1.rows) {
        let query2 = "DELETE FROM booking WHERE bookingID = '"+ params["bookingid"] + "'"
        const send2 = await pool.query(query2)
        res.sendStatus(200);
    }
})

app.delete('/HotelRentings/', async (req, res) => {
    params = req.query;
    let query1 = "INSERT INTO archive VALUES (DEFAULT, false,'"+ params["rentingid"] +"' , '"+params["hotelid"]+"', '"+ params["roomid"]+"', '"+ params["customerid"]+"',NULL, '"+ params["checkindate"]+"', '"+ params["checkoutdate"]+"') RETURNING *"
    console.log(query1);
    const send1 = await pool.query(query1);
    if (send1.rows) {
        let query2 = "DELETE FROM renting WHERE rentingid = '"+ params["rentingid"] + "'"
        const send2 = await pool.query(query2)
        res.sendStatus(200);
    }
})

// Patch requests
app.patch('/UpdateCustomer', async (req, res) => {
    //form data
    let email = req.body.email;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let ssn = req.body.ssn;
    let address = req.body.address;
    let customerid = req.body.customerid;
    let query = "Update customer set email = '"+email+
                                            "', password ='"+ password+
                                            "', fullname ='"+ fullname+
                                            "', address ='"+ address+
                                            "', ssn ='"+ ssn+
                                            "' where customerid = "+customerid+";"
    let queryResult;
    console.log(query);
    try {
        queryResult = await pool.query(query + ";");
    } catch (error) {
        console.log("Insertion failed.");
    }

    try {
        if (queryResult.rows) {

            res.status(200).send(queryResult.rows);
        }
    } catch (error) {
        res.status(404).json("Invalid data, couldn't update");
    }
})

app.patch('/UpdateEmployee', async (req, res) => {
    //form data
    let employeeid = req.body.employeeid;
    let email = req.body.email;
    let password = req.body.password;
    let positionid = req.body.positionid;
    let hotelid = req.body.hotelid;
    let fullname = req.body.fullname;
    let address = req.body.address;
    let ssn = req.body.ssn;
    let query = "Update employee set email = '"+email+
                                            "', password ='"+ password+
                                            "', positionid = '"+positionid+
                                            "', hotelid = '"+ hotelid+
                                            "', fullname ='"+ fullname+
                                            "', address ='"+ address+
                                            "', ssn ='"+ ssn+
                                            "' where employeeid = '"+employeeid+"';"
    let queryResult;
    console.log(query);
    try {
        queryResult = await pool.query(query + ";");
    } catch (error) {
        console.log("Insertion failed.");
    }

    try {
        if (queryResult.rows) {

            res.status(200).send(queryResult.rows);
        }
    } catch (error) {
        res.status(404).json("Invalid data, couldn't update");
    }
})


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
