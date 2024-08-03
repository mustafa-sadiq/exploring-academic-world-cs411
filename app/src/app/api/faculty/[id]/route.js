import { NextResponse } from "next/server";
import { query } from "../../../../lib/mysql_libs";
import { URL } from "url";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  const records = await query(`SELECT * FROM faculty WHERE id = ?`, [id]);

  return NextResponse.json(records[0], { status: 200 });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  try {
    await query(`DELETE FROM faculty WHERE id = ?`, [id]);
    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}


export async function PUT(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  const body = await request.json();

  try {
    const setClause = Object.keys(body)
      .map(key => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(body), id];

    // Update the record
    await query(`UPDATE faculty SET ${setClause} WHERE id = ?`, values);
    const updatedRecords = await query(`SELECT * FROM faculty WHERE id = ?`, [id]);
    

    return NextResponse.json(updatedRecords[0], { status: 200 });
    
    
  } catch (error) { 
    return NextResponse.json({ message: error.message }, { status: 400 });    
  }

  
}

