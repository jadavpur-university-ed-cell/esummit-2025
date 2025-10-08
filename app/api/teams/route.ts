import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a type for the response data for better type safety
type TeamWithMembers = {
  id: string;
  memberIds: string[];
  members: {
    id: string;
    name: string;
    email: string;
    college?: string | null;
  }[];
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamWithMembers[] | ErrorResponse>
) {
  // Only allow GET requests for this endpoint
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Fetch all teams from the database
    const teams = await prisma.team.findMany({
      // Use 'include' to fetch the related 'members' (User objects)
      include: {
        members: {
          // Use 'select' to pick only the necessary and non-sensitive fields
          select: {
            id: true,
            name: true,
            email: true,
            college: true,
            image: true,
          },
        },
      },
    });

    // Send the successful response
    return res.status(200).json(teams);
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Failed to fetch teams:", error);
    
    // Send an internal server error response
    return res.status(500).json({ message: "Something went wrong." });
  }
}