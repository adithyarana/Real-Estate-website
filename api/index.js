// api/index.js
import serverless from 'serverless-http';
import app from '../server/app';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

// Initialize Prisma in the app
app.set('prisma', prisma);

const handler = serverless(app);

export default handler;
