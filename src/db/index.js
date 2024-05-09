import mongoose, { trusted } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`Connected to host :${connectionInstance.connection.host}`);
    // console.log(`${connectionInstance}`)
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectDB;
