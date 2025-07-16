import express, { urlencoded } from "express";
import jobRoute from "./Routes/jobRoute.js"
import connectToDb from "./db/dbConfig.js";
import bodyParser from "body-parser";

connectToDb();

const PORT = process.env.PORT || 3000; 

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, Express Server!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/sqlCopyEditGET/api", jobRoute);