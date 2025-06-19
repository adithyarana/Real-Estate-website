// console.log("Function is starting...");

import app from "../app.js";
import serverless from "serverless-http";

// console.log("Serverless handler loading...");

 const handler = serverless(app);

export default handler;

