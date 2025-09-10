import { NextResponse } from "next/server";
import { mockLeads } from "@/lib/data"; // replace with DB later

/**
 * Handles GET requests to retrieve a paginated list of leads.
 *
 * Extracts `page` and `limit` query parameters from the request URL to determine
 * the range of leads to return. Defaults to page 0 and limit 20 if parameters are not provided.
 * Slices the `mockLeads` array according to the calculated range and returns the leads in JSON format.
 * Includes a `nextPage` property in the response, which is either the next page number or `null` if there are no more leads.
 *
 * @param req - The incoming request object.
 * @returns A JSON response containing the paginated leads and the next page number if available.
 */
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
