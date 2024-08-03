import { NextResponse } from "next/server";
import { connect, disconnect } from "../../../../lib/mongodb_libs";

export async function GET(request) {
  const db = await connect();
  const collection = db.collection("faculty");
  const records = await collection.find().toArray();
  const formattedRecords = records.map((record) => ({
    label: record.name,
    value: record.id,
  }));
  await disconnect();

  return NextResponse.json(formattedRecords, { status: 200 });
}
