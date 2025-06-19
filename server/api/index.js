// api/index.js
import express from 'express';
import serverless from 'serverless-http';

const app = express();

// Sample route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Route is working' });
});

// Required by Vercel
export default serverless(app);
