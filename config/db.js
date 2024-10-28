const mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB Connected....");
    })
    .catch(err => console.error("Connection error:", err));
}

module.exports = connectToDB;
// connectToDB();