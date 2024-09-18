import mongoose, { mongo } from "mongoose";

export const connectMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to mongodb')
    }catch(error){
        console.log('error connecting to mongodb',error)
    }
}