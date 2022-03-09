const mongoose = require("mongoose");
const winston = require("winston");

module.exports = async() => {
    try {
        await mongoose.connect(process.env.DB_URL)
        winston.info("MongoDB Connected...")
    } catch (err) { console.log("Failed to connect to MongoDB", err) }
}