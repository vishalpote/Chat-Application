import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
// const database = process.env.MONGO_URI;
export const connection=async()=>{
    try {
        await mongoose.connect(
          `mongodb+srv://vishal:vishalpote@cluster0.ljkbz4k.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("MongoDB connection established..!!");
    } catch (error) {
        console.log("Error While Connecting MongoDB...!!");
    }
}