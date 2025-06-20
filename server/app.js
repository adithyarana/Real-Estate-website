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
const port = 4000;


app.use(express.json());

const corsConfig = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsConfig));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from Vercel!");
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
    res.status(404).json({ error: 'Route not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || port, () => {
        console.log(`Server is running on port ${process.env.PORT || port}`);
    });
}

export default app;
