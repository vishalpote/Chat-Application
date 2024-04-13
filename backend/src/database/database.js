import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const database = process.env.MONGO_URI;
export const connection=async()=>{
    try {
        await mongoose.connect(database);
        console.log("MongoDB connection established..!!");
    } catch (error) {
        console.log("Error While Connecting MongoDB...!!"+error.message);
    }
}