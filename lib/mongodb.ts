import mongoose from "mongoose";


export const connectMongoDB = async () => {
    try {
        // ensure mongodb uri exists
        if (!process.env.MONGODB_URI) {
            throw new Error('mongodb uri not found')
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to mongoDB:", error)
    }
}