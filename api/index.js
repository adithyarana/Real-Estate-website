// api/index.js
import serverless from 'serverless-http';
import app from '../server/app';

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

const handler = serverless(app);

export default handler;
