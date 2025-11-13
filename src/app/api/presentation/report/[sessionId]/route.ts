import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { analysisReportsTable, practiceSessionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Await params in Next.js 15+
    const params = await props.params;
    const sessionId = parseInt(params.sessionId);

    if (isNaN(sessionId)) {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 });
    }

    // Check if analysis is complete
    const [session] = await db
      .select()
      .from(practiceSessionsTable)
      .where(eq(practiceSessionsTable.id, sessionId))
      .limit(1);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (!session.isAnalyzed) {
      return NextResponse.json({
        analyzing: true,
        message: "Analysis in progress...",
      });
    }

    // Get analysis report
    const [report] = await db
      .select()
      .from(analysisReportsTable)
      .where(eq(analysisReportsTable.sessionId, sessionId))
      .limit(1);

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Report fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}
