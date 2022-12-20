import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/auth.js";


const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



//Login page
app.use("/", routes);

mongoose.Promise = global.Promise;

 
const mongoUrl = "mongodb://127.0.0.1:27017/authentication"
mongoose.connect(
    mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) =>
        err ? console.log("----------olmadı-----------" + err) : console.log(
            "---------Bu sefer oldu-----------")
);


const PORT = 5000;
app.listen(PORT, (req, res) => {
    console.log("Server is running port 5000")
})  