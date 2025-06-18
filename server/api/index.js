console.log("Function is starting...");

import app from "../app.js";
import serverless from "serverless-http";

console.log("Serverless handler loading...");

export const handler = serverless(app);

console.log("Handler exported.");
