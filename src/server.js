require('dotenv/config');

//import the package
const bodyParser = require('body-parser');
const path = require('path');
const express = require ('express');
const mongoose = require('mongoose')
const viewEngine = require('./config/viewEngine');

// execute or initiate
const app = express()
const http = require('http').createServer(app);

// Connect to mongoDB
mongoose.connect(
    process.env.MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    (err) => {
        if (err) return console.error(err);
        console.log("Connect to MongoDB")
    }
)

//app.use (express.json()); fungsinya sama dengan bodyparser
app.use(bodyParser.json()); //support  json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); //support encoded bodies

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS, PATCH, DELETE, PUT");
    next();
});

const initWebRoutes = require("./routes/webRoute")
initWebRoutes(app)
viewEngine(app);

//how to start listening to the server
let port = process.env.PORT || 3000;
http.listen(port,()=>{
    console.log(`Server is running in port ${port}`);
})