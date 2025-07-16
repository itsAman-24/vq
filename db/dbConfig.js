import mongoose from "mongoose";

const connectToDb = () => {
    try {
        const connection = mongoose.connect("mongodb://127.0.0.1:27017/vqcodes");
        if(connection) {
            console.log("Successfully coneected");
        }
    } catch (error) {
    }
}

export default connectToDb;