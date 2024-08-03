import { NextResponse } from "next/server";
import { query } from "../../../lib/mysql_libs";

export async function GET(request) {
  const records = await query(`SELECT id as value, name as label FROM faculty`);

  return NextResponse.json(records, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();

  try {

    const id = await query('SELECT MAX(id) + 1 as id FROM faculty');

    const values = [
      id[0].id,
      body.name ?? null,
      body.position ?? null,
      body.research_interest ?? null,
      body.email ?? null,
      body.phone ?? null,
      body.photo_url ?? null,
      body.univeristy_id ?? null,
    ];

    await query(`INSERT INTO faculty (id, name, position, research_interest, email, phone, photo_url, university_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, values);
    const records = await query(`SELECT * FROM faculty WHERE id = ?`, [id[0].id]);

    return NextResponse.json(records[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
