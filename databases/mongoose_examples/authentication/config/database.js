import m from "mongoose";
import { config } from "dotenv";

config();
const { MONGO_URI } = process.env;

export default async function dbconnect() {
    try {
        // Connecting to the database
        await m.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log("Successfully connected to database");
            })
    }
    catch (error) {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    };
}