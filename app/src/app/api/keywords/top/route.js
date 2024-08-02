import { NextResponse } from "next/server";
import { query } from '../../../../lib/mysql_libs';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');

    const results = await query(`
        SELECT k.name, COUNT(pk.publication_id) as publication_count
        FROM keyword k
        JOIN publication_keyword pk ON k.id = pk.keyword_id
        JOIN publication p ON pk.publication_id = p.ID
        WHERE p.year = ?
        GROUP BY k.name
        ORDER BY publication_count DESC
        LIMIT 10
    `, [year]);

    return NextResponse.json(results, { status: 200 });
  }