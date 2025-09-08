// app/api/campaigns/route.ts
import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageParam = Number(url.searchParams.get("page") ?? "0");
  const limit = Number(url.searchParams.get("limit") ?? "20");

  const start = pageParam * limit;
  const end = start + limit;
  const pageItems = mockCampaigns.slice(start, end);

  const nextPage = end < mockCampaigns.length ? pageParam + 1 : null;

  return NextResponse.json({ campaigns: pageItems, nextPage });
}
