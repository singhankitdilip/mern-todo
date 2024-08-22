import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config({
   path:".env" 
})

const connectDb = async()=>{
    try {
     const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`)
     console.log(`\n MongoDB connected !! DB host :${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error!",error);
        process.exit(1)
    }
}

export default connectDb;


