//basic learning file to just get myself familiar with express.js


//This is the file where we put our code for the api.
//To run this file, run the following command (found in the package.json) ` npm run devStart `
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

app.use(cors())

// req = request
// res = response
// app.(http request) to send any http request to the url in the first parameter of the function  
app.get('/',(req, res) => {
    res.send('Hi')
})


// // ROUTES
app.get('/Hotels', async (req, res) => {
    pool.connect();
    try {
        let x = 'SELECT * FROM HotelChain';
        const send = await pool.query(x);
        res.json(send.rows);
    }
    catch (err) {
        console.log(err);
    }

})

app.post('/Hotels/Booking', async (req, res) => {
    //INSERT INTO Booking VALUES (00001, 11001, 20003, 00001, '2023-03-27', '2023-05-21', '2023-05-25')
    pool.connect();
    try{
        let command = "INSERT INTO Booking VALUES (00003, 11001, 20005, 00001, '2023-03-27', '2023-05-21', '2023-05-25')";
        const send = await pool.query(command);
        res.send("We gucci");
    }
    catch(err){
        console.log(err);
    }
})

// //get 
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});