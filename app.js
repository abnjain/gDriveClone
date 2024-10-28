const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");


const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes");

const PORT = process.env.PORT || 3000;
require("dotenv").config({ path: './.env' });
connectToDB();

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Set view engine
app.set("view engine", "ejs");

// Setting up form data parsing middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.use("/user", userRouter);
app.use("/", indexRouter);

//global exception handling
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception");
    console.log(err);    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
