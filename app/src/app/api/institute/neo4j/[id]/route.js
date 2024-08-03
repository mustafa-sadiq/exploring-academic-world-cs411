import { NextResponse } from "next/server";
import { getSession } from "../../../../../lib/neo4j_libs";
import { URL } from "url";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  const session = getSession();
  const result = await session.run(
    `MATCH (f:FACULTY)-[:AFFILIATION_WITH]->(i:INSTITUTE {id: $id})
                                                    MATCH (f)-[:PUBLISH]->(p:PUBLICATION)-[:LABEL_BY]->(k:KEYWORD)
                                                    RETURN k.name AS Keyword, COUNT(k) AS Occurrences
                                                    ORDER BY Occurrences DESC
                                                    LIMIT 10;`,
    { id }
  );

  const records = result.records.map((record) => {
    return {
      Keyword: record.get("Keyword"),
      Occurrences: record.get("Occurrences").low,
    };
  });

  session.close();

  return NextResponse.json(records, { status: 200 });
}
