import { NextResponse } from "next/server";

export async function GET() {
  try {
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!GOOGLE_SHEETS_URL) {
      return NextResponse.json({ count: 0 });
    }

    // Fetch count from Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch count from Google Sheets");
      return NextResponse.json({ count: 0 });
    }

    const data = await response.json();
    return NextResponse.json({ count: data.count || 0 });
  } catch (error) {
    console.error("Waitlist count error:", error);
    return NextResponse.json({ count: 0 });
  }
}
