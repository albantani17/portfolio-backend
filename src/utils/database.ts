import mongoose from "mongoose";
import env from "./env";

const connect = async () => {
   try {
      await mongoose.connect(env.DATABASE_URL, {
         dbName: "db-portfolio",
      });
      return Promise.resolve("Database is connected");
   } catch (error) {
      return Promise.reject(error)
   }
}

export default connect