import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Analytics from "@/models/Analytics";
import moment from "moment-jalaali";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    const { period } = params;
    const endDate = new Date();
    let startDate = new Date();
    let stats = [];

    switch (period) {
      case 'daily':
        startDate.setDate(startDate.getDate() - 7);
        stats = await Analytics.find({
          date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });
        
        stats = stats.map(stat => ({
          date: moment(stat.date).format('jYYYY/jMM/jDD'),
          views: stat.views
        }));
        break;

      case 'weekly':
        startDate.setDate(startDate.getDate() - 28);
        stats = await Analytics.aggregate([
          {
            $match: {
              date: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: { $week: "$date" },
              totalViews: { $sum: "$views" },
              firstDay: { $min: "$date" }
            }
          },
          { $sort: { "_id": 1 } }
        ]);
        
        stats = stats.map(stat => ({
          date: moment(stat.firstDay).format('jYYYY - هفته jW'),
          views: stat.totalViews
        }));
        break;

      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 12);
        stats = await Analytics.aggregate([
          {
            $match: {
              date: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$date" },
                month: { $month: "$date" }
              },
              totalViews: { $sum: "$views" },
              firstDay: { $min: "$date" }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);
        
        stats = stats.map(stat => ({
          date: moment(stat.firstDay).format('jMMMM jYYYY'),
          views: stat.totalViews
        }));
        break;

      case 'yearly':
        startDate.setFullYear(startDate.getFullYear() - 5);
        stats = await Analytics.aggregate([
          {
            $match: {
              date: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: { $year: "$date" },
              totalViews: { $sum: "$views" },
              firstDay: { $min: "$date" }
            }
          },
          { $sort: { "_id": 1 } }
        ]);
        
        stats = stats.map(stat => ({
          date: moment(stat.firstDay).format('jYYYY'),
          views: stat.totalViews
        }));
        break;
    }

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}