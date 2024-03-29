import mongoose from "mongoose";
import * as config from "../config/config";
const dbUri = config.default.databaseURL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB");
  } catch (err: any) {
    console.error(err.message);
  }
};
export default connectDB;
