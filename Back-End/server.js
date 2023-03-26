//basic learning file to just get myself familiar with express.js


//This is the file where we put our code for the api.
//To run this file, run the following command (found in the package.json) ` npm run devStart `
const express = require('express');
const app = express();
const pool = require("./db");

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
        const hamid = await pool.query("SELECT * FROM HotelChain");
        res.json(hamid.rows);
    }
    catch (err) {
        console.log(err);
    }
    finally {
        pool.end();
    }

})
// //get 
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});