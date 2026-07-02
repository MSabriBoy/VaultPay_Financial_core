import mongoose from "mongoose";
import env from "./env.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log(
      `Database connected successfully (${mongoose.connection.name})`
    );
  } catch (error) {
    console.error("Database connection failed.");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDatabase;