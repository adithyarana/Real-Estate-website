import express from "express";
import adminroute from "./routes/admin.route.js";
import AddPropertyRouter from './routes/Property.js'
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cloudinary from "./utils/cloudinary.js";

const app = express();
dotenv.config();
const port = 4000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));
app.use(cookieParser());



// Middleware to handle requests
app.use("/api/admin", adminroute);
app.use("/api/property", AddPropertyRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
