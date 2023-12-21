const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//my router
const parse = require("./routers/parse.js");
const keywordCheck = require("./routers/keyWordDensity.js");

const app = express();


//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


//my routes
app.use("/api", parse);
app.use("/api", keywordCheck);

//my port 
const port = 5000;


//testing home route
app.get("/", (req, res) => {
    console.log("Home page");
    res.send("Hommies");
});



//server start 
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})