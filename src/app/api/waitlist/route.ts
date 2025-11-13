import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { waitlistTable } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Save to database
    try {
      await db.insert(waitlistTable).values({
        email,
        name,
      });
    } catch (dbError: any) {
      // Check if email already exists
      if (dbError?.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }
      throw dbError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
