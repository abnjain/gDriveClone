const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");

router.get("/register", (req,res) => {
    res.render("register");
});

router.post("/register", 
    body("email").trim().isEmail().isLength({ min:10 }), 
    body("password").trim().isLength({ min:5 }), 
    body("username").trim().isLength({ min:2 }), 
    async (req, res) => {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Data",
                errors: errors.array()
            })
        };

        const { email, password, username } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email,
            password: hashPassword,
            username
        })
        
        res.send(newUser, "User Registered");
})

router.get("/login", (req,res) => {
    res.render("login");
})

router.post("/login", 
    body("username").trim().isLength({ min:2 }),
    body("password").trim().isLength({ min:5 }),
    async (req,res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Data",
                errors: errors.array()
            })
        };

        const { username, password } = req.body;

        const user = await userModel.findOne({
            username: username
        });

        if (!user) {
            return res.status(400).json({
                message: "Username or Password Incorrect"
            })
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Username or Password Incorrect"
            })  
        };

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.jwt.JWT_SECRET)

        res.cookie("token", token);

        res.send("Logged In...")

})

module.exports = router;