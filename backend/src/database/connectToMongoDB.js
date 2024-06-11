import mongoose from "mongoose";
import processEnvVar from "../utils/processEnvVariable.js";


const DB_URL = processEnvVar.DB_URL;

// connect to database using mongoose ODM
const connectToMongoDB = async() => {
    try {
        const dbInstance = await mongoose.connect(DB_URL);
        console.log("Mongodb connected.");
    } catch (error) {
        console.log(error);
    }
};


export default connectToMongoDB;