const express = require('express');
const path = require('path');
const mainController = require('./src/controllers/mainController');
const app = express();


app.use(express.static((__dirname + '/public'))); //Para ver HTML desde aca
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


let mainRoute = require ("./src/routes/main");
app.use("/", mainRoute)


app.listen(process.env.PORT || 3000, () => {
    console.log("ok")})

