// app/api/campaigns/route.ts
import { NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/data";

/**
 * Handles GET requests for paginated campaigns.
 *
 * Extracts `page` and `limit` query parameters from the request URL to determine
 * the slice of campaigns to return. Returns a JSON response containing the current
 * page of campaigns and the next page number if more campaigns are available.
 *
 * @param request - The incoming HTTP request object.
 * @returns A JSON response with the paginated campaigns and the next page number.
 */
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
