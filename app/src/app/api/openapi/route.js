import { NextResponse } from "next/server";
import { query } from "../../../lib/mysql_libs";
import OpenAI from "openai";

const openai = new OpenAI();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const facultyId = searchParams.get("facultyId");

  const records = await query(
    `SELECT f.name as name, u.name as university
                                    FROM faculty f 
                                    left join university u 
                                    on f.university_id = u.id 
                                    WHERE f.id = ?`,
    [facultyId]
  );

  const q = records[0].name + " " + records[0].university;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `tell me about ${records[0].name} who works at ${records[0].university}. limit summary to 250 words and focus on their research work. include a link that works and points to this information at end of the summary (do not include in word limit).`,
      },
    ],
    model: "gpt-4o",
  });

  return NextResponse.json(completion.choices[0].message.content, {
    status: 200,
  });
}
