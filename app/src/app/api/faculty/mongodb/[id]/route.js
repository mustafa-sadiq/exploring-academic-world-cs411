import { NextResponse } from "next/server";
import { connect, disconnect } from "../../../../../lib/mongodb_libs";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  const db = await connect();
  const collection = db.collection("faculty").aggregate([
    {
      $match: { id: parseInt(id) },
    },
    {
      $lookup: {
        from: "publications",
        localField: "publications",
        foreignField: "id",
        as: "publications",
      },
    },
    {
      $unwind: "$publications",
    },
    {
      $unwind: "$publications.keywords",
    },
    {
      $group: {
        _id: "$publications.keywords.name",
        totalScore: { $sum: "$publications.keywords.score" },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  const results = await collection.toArray();

  await disconnect();

  return NextResponse.json(results, { status: 200 });
}
