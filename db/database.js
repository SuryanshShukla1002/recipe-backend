import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const mongodbUriConnection = process.env.MONGODB;

const connectDatabse = () => {
    mongoose.connect(mongodbUriConnection).then(() => {
        console.log("Connected to MongoDb database");
    }).catch((error) => {
        console.log("Failed to connect to database");
    });
};

export default connectDatabse;
