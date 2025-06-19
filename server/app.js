const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const adminroute = require("./routes/Auth.js");
const AddPropertyRouter = require('./routes/Property.js');
const EnquiryRouter = require('./routes/Enquiry.js');
const RatingAndReviewRouter = require('./routes/RatingAndReview.js');
const ContactRouter = require('./routes/Contact.js');
const consultationRouter = require('./routes/consultation.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsConfig = {
    origin: process.env.CORS_ORIGIN || 'https://kirty-realty.vercel.app',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsConfig));

app.use(cookieParser());

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
    const port = 4000;
    app.listen(process.env.PORT || port, () => {
        console.log(`Server is running on port ${process.env.PORT || port}`);
    });
}

module.exports = app;
