import { connectMongoDB } from "@/lib/mongodb";
import Podcast from '../../models/Podcast';

export default async function handler(req, res) {
  await connectMongoDB();

  if (req.method === 'GET') {
    try {
      const podcasts = await Podcast.find({})
        .populate('category')
        .populate('categories')
        .sort({ createdAt: -1 });
      
      res.status(200).json(podcasts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch podcasts' });
    }
  }
}
