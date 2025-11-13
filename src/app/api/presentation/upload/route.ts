import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/db";
import { presentationsTable } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload PDF or PowerPoint" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 50MB" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "presentations");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}-${sanitizedName}`;
    const filePath = path.join(uploadsDir, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Process slides based on file type
    let slidesData = [];
    let totalSlides = 0;
    let slideContent: string[] = [];

    if (file.type === "application/pdf") {
      // For MVP: estimate slides from file size
      // In production, use proper PDF parser or cloud service
      const fileSizeKB = file.size / 1024;
      totalSlides = Math.max(1, Math.min(50, Math.floor(fileSizeKB / 50))); // Estimate ~50KB per slide
      
      // Generate placeholder content
      slideContent = Array.from({ length: totalSlides }, (_, i) => 
        `Slide ${i + 1} content will be extracted here`
      );

      // Create slide data
      slidesData = Array.from({ length: totalSlides }, (_, i) => ({
        slideIndex: i,
        imageUrl: `/uploads/presentations/${fileName}#page=${i + 1}`,
        thumbnailUrl: `/uploads/presentations/${fileName}#page=${i + 1}`,
        content: slideContent[i] || "",
      }));
    } else {
      // PowerPoint - estimate from file size
      const fileSizeKB = file.size / 1024;
      totalSlides = Math.max(1, Math.min(50, Math.floor(fileSizeKB / 100))); // Estimate ~100KB per slide
      
      slidesData = Array.from({ length: totalSlides }, (_, i) => ({
        slideIndex: i,
        imageUrl: `/uploads/presentations/${fileName}`,
        thumbnailUrl: `/uploads/presentations/${fileName}`,
        content: `Slide ${i + 1} content`,
      }));
    }

    // Save to database
    const [presentation] = await db
      .insert(presentationsTable)
      .values({
        userId: 1, // TODO: Get from auth session
        title: file.name.replace(/\.[^/.]+$/, ""),
        fileName: fileName,
        fileUrl: `/uploads/presentations/${fileName}`,
        fileType: file.type.includes("pdf") ? "pdf" : "pptx",
        totalSlides: totalSlides,
        slidesData: slidesData,
      })
      .returning();

    return NextResponse.json({
      success: true,
      presentation,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process presentation" },
      { status: 500 }
    );
  }
}
