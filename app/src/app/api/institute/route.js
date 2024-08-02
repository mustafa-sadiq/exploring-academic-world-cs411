import { NextResponse } from "next/server";
import { getSession } from "../../../lib/neo4j_libs";

export async function GET(request) {
  const session = getSession();
  const result = await session.run(`MATCH (n:INSTITUTE) RETURN n.id, n.name`);

    const records = result.records.map((record) => {
    return {
      value: record.get('n.id'),
      label: record.get('n.name'),
    };
    });

  session.close();

  return NextResponse.json(records, { status: 200 });
}
