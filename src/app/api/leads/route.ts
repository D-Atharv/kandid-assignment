import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/data"; // replace with DB later

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0");
  const limit = parseInt(searchParams.get("limit") || "20");

  const start = page * limit;
  const end = start + limit;
  const leads = mockLeads.slice(start, end);

  return NextResponse.json({
    leads,
    nextPage: end < mockLeads.length ? page + 1 : null,
  });
}
