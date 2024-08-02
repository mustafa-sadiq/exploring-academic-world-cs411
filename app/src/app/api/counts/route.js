import { NextResponse } from "next/server";
import { query } from '../../../lib/mysql_libs';

export async function GET(request) {
    const tables = ['faculty', 'faculty_keyword', 'faculty_publication', 'keyword', 'publication', 'publication_keyword', 'university'];
    const counts = await Promise.all(tables.map(table => query(`SELECT COUNT(*) FROM ${table}`)));
    const results = counts.reduce((acc, count, index) => {
        const tableName = tables[index];
        acc[tableName] = count[0]['COUNT(*)'];
        return acc;
    }, {});
    return NextResponse.json(results, { status: 200 });
  }