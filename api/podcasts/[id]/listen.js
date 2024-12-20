import { connectMongoDB } from "@/lib/mongodb";
import Podcast from '../../../models/Podcast';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectMongoDB();
    
    const { id } = req.query;
    
    try {
      const podcast = await Podcast.findByIdAndUpdate(
        id,
        { $inc: { listens: 1 } },
        { new: true }
      );
      
      res.status(200).json({ listens: podcast.listens });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update listen count' });
    }
  }
}
