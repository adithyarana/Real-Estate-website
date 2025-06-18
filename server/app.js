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

const corsconfig = {
    origin: true,  // This allows all origins
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    maxAge: 3600,
    preflightContinue: false
};

// Handle preflight requests
app.options('*', cors(corsconfig));
// Handle all other requests
app.use(cors(corsconfig));

app.use(cookieParser());


// Middleware to handle requests
app.use("/api/admin", adminroute);
app.use("/api/property", AddPropertyRouter);
app.use("/api/enquiry", EnquiryRouter);
app.use("/api/review", RatingAndReviewRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/consultation", consultationRouter );

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);  // for local host listen is nesscery
// });
export default app;
