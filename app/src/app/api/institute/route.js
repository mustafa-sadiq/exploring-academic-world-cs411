import { NextResponse } from "next/server";
import { query } from "../../../lib/mysql_libs";

export async function GET(request) {
  const records = await query(`SELECT id as value, name as label FROM university`);

  return NextResponse.json(records, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();

  try {

    const id = await query('SELECT MAX(id) + 1 as id FROM university');

    const values = [
      id[0].id,
      body.name ?? null,
      body.photo_url ?? null,
    ];

    await query(`INSERT INTO university (id, name, photo_url) VALUES (?, ?, ?)`, values);
    const records = await query(`SELECT * FROM university WHERE id = ?`, [id[0].id]);

    return NextResponse.json(records[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}