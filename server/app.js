import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import adminroute from "./routes/Auth.js";
import AddPropertyRouter from './routes/Property.js'
import EnquiryRouter from './routes/Enquiry.js'
import RatingAndReviewRouter from './routes/RatingAndReview.js'
import ContactRouter from './routes/Contact.js'
import consultationRouter from './routes/consultation.js'

const app = express();
dotenv.config();
const port = 4000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const corsconfig={
    origin:true,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials:true,
}
app.options('*', cors(corsconfig))
app.use(cors(corsconfig))

app.use(cookieParser());


// Middleware to handle requests
app.use("/api/admin", adminroute);
app.use("/api/property", AddPropertyRouter);
app.use("/api/enquiry", EnquiryRouter);
app.use("/api/review", RatingAndReviewRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/consultation", consultationRouter );


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);  // for local host listen is nesscery j
// });
export default app;
