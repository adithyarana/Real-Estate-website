import express from 'express';
import serverless from 'serverless-http';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/api/test', async (req, res) => {
  console.log("✅ /api/test route hit");

  try {
    const users = await prisma.user.findMany(); 
    console.log("✅ Users fetched");

    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default serverless(app);
