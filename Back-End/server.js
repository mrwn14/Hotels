//basic learning file to just get myself familiar with express.js


//This is the file where we put our code for the api.
//To run this file, run the following command (found in the package.json) ` npm run devStart `
const express = require('express');
const app = express();


//req = request
//res = response
//app.(http request) to send any http request to the url in the first parameter of the function  
app.get('/',(req, res) => {
    console.log('hello');
    //you can send a status code, 500 = internal server error
    //you can chain a status code with a message, can be a string or just json
    res.sendStatus(500).send("helo");
    //lets you download the server.js or whichever path you're sending there
    res,download("server.js")

    //to send json you do
    res.json('')

    //to send an html
    res.render('')
    res.send('Hi')
})




app.listen(3000);