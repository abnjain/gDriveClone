const Firebase = require("firebase-admin");

const serviceAccount = require("../gdrive-4c6fb-firebase-adminsdk-wcfw6-86de818114.json")

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: "gdrive-4c6fb.appspot.com"
})

module.exports = Firebase;