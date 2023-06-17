//Import mongoose and the dotenv module
const mongoose = require('mongoose');
require('dotenv').config();

//Load the MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

function connectToMongoDB() {
    mongoose.connect( MONGODB_URI);

    mongoose.connection.on("connected", () => {
        console.log("Connected to mongoDB successfully")
    })

    mongoose.connection.on("error", () => {
        console.log("Error connecting to MongoDb")
    })
}

//Export the 'connectToMONGODB' function
module.exports = { connectToMongoDB };