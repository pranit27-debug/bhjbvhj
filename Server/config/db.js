require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGOURI;
const connectDB = async () => {
    try{
    await mongoose.connect(mongoURI,);
    console.log('MongoDB connected, The url is:', mongoURI);
}
catch(error){
    console.log('MongoDB connection failed', error.message);
    process.exit(1);
}
};

module.exports = connectDB;