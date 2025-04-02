import express from "express";
import adminroute from "./routes/admin.route.js";
import addpropertyRoutes from "./routes/post.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const port = 4000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));
app.use(cookieParser());


// Middleware to handle requests
app.use("/api/admin", adminroute);
app.use("/api/property", addpropertyRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
