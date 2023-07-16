import { Request, Response } from 'express';
import { imageUpload } from '../models/imageUpload';
import { decodeJwtTokenFromHeaders } from './decodeToken';

export const displayImages = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers.authorization as string;
    const decodedToken = decodeJwtTokenFromHeaders(token);

    // Decode the token to retrieve the preferred username
    const userId = decodedToken?.preferred_username;

    if (!userId) {
      return res.status(401).json({ error: 'Invalid token or missing preferred username' });
    }

    // Retrieve all keys for the preferred username using the Sequelize model
    const keys = await imageUpload.findAll({
      where: {
        userId: userId,
      },
      attributes: ['key'],
    });

    const extractedKeys = keys.map((image) => image.key);

    res.json(extractedKeys); // Send the extractedKeys array directly in the response
  } catch (error) {
    console.error('Error retrieving keys:', error);
    res.status(500).json({ error: 'Failed to retrieve keys' });
  }
};
