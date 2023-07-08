import mongoose from "mongoose";

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_API_KEY!)
      console.log("succecc mongoDB")
  } catch (err) {
      console.log("Failure:Unconnected to MongoDB")
      throw new Error()
  }
}

export default connectDB;
