const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase.config");
// const { credential } = require("firebase-admin");
const serviceAccount = require("../gdrive-4c6fb-firebase-adminsdk-wcfw6-86de818114.json");

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: "gdrive-4c6fb.appspot.com",
    unique: true
});

const upload = multer ({
    storage: storage
});

module.exports = upload;