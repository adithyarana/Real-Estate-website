// api/index.js
import serverless from 'serverless-http';
import app from '../server/app';




const handler = serverless(app);

export default handler;
