import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import adminroute from "./routes/Auth.js";
import AddPropertyRouter from './routes/Property.js'
import EnquiryRouter from './routes/Enquiry.js'
import RatingAndReviewRouter from './routes/RatingAndReview.js'
import ContactRouter from './routes/Contact.js'
import consultationRouter from './routes/consultation.js'

const app = express();
dotenv.config();
const port =process.env.PORT || 4000;


app.use(express.json());

const corsConfig = {
    origin:[ process.env.CLIENT_URL || 'http://localhost:3000', 'https://kirty-realty-frontend-realestate.vercel.app'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsConfig));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from server!");
  });

app.get('/favicon.ico', (req, res) => res.status(204));


// Middleware to handle requests
app.use("/api/admin", adminroute);
app.use("/api/property", AddPropertyRouter);
app.use("/api/enquiry", EnquiryRouter);
app.use("/api/review", RatingAndReviewRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/consultation", consultationRouter );



// Catch-all route for unexpected requests
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });


export default app;
