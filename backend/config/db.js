import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URI = `mongodb+srv://admin:${MONGO_PASS}@cluster0.ham0gjm.mongodb.net/?retryWrites=true&w=majority`
export const connectDB = async () => {

  try {
   await mongoose.connect(MONGO_URI)
   console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log(error.message);
    process.exit()
  }
} 