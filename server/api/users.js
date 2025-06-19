import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Check if database connection is working
    await prisma.$connect();
    
    // Fetch admin users
    const users = await prisma.admin.findMany();
    
    // Log the result for debugging
    console.log('Fetched users:', users);
    
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    // Provide more detailed error information
    res.status(500).json({ 
      error: "Failed to fetch users",
      details: error.message || "Unknown error"
    });
  } finally {
    await prisma.$disconnect();
  }
}
