require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true });
        console.log("connected to MongoDB")
    } catch (error) {
        console.log(error.message);
        process.exit
    }
}

module.exports = connectDB