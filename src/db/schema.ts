import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  jsonb,
  real,
  boolean,
} from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Presentations Table
export const presentationsTable = pgTable("presentations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(), // 'pdf' or 'pptx'
  totalSlides: integer("total_slides").notNull(),
  slidesData: jsonb("slides_data"), // Array of slide images/content
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Practice Sessions Table
export const practiceSessionsTable = pgTable("practice_sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  presentationId: integer("presentation_id")
    .notNull()
    .references(() => presentationsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  audioUrl: text("audio_url"),
  duration: integer(), // in seconds
  slideTimestamps: jsonb("slide_timestamps"), // { slideIndex: timestamp }
  transcript: text(),
  isAnalyzed: boolean("is_analyzed").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analysis Reports Table
export const analysisReportsTable = pgTable("analysis_reports", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => practiceSessionsTable.id, { onDelete: "cascade" }),
  
  // Speech Metrics
  wordsPerMinute: real("words_per_minute"),
  totalWords: integer("total_words"),
  fillerWords: jsonb("filler_words"), // { word: count }
  
  // Performance Scores (0-100)
  clarityScore: real("clarity_score"),
  paceScore: real("pace_score"),
  confidenceScore: real("confidence_score"),
  emotionalTone: varchar("emotional_tone", { length: 50 }),
  
  // Slide Analysis
  slideAnalysis: jsonb("slide_analysis"), // Per-slide feedback
  slideContentAlignment: real("slide_content_alignment"), // 0-100
  
  // Detailed Feedback
  strengths: text(),
  improvements: text(),
  detailedFeedback: jsonb("detailed_feedback"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// AI Generated Scripts Table
export const aiScriptsTable = pgTable("ai_scripts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  presentationId: integer("presentation_id")
    .notNull()
    .references(() => presentationsTable.id, { onDelete: "cascade" }),
  
  // Script content per slide
  scriptData: jsonb("script_data").notNull(), // { slideIndex: { text, keyPoints, timing } }
  
  totalEstimatedTime: integer("total_estimated_time"), // seconds
  generatedBy: varchar("generated_by", { length: 50 }).default("ai"), // 'ai' or 'user'
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// User Progress Tracking
export const userProgressTable = pgTable("user_progress", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  presentationId: integer("presentation_id")
    .notNull()
    .references(() => presentationsTable.id, { onDelete: "cascade" }),
  
  totalSessions: integer("total_sessions").default(0),
  averageConfidence: real("average_confidence"),
  averageClarity: real("average_clarity"),
  averagePace: real("average_pace"),
  
  improvementTrend: jsonb("improvement_trend"), // Historical data
  
  lastPracticedAt: timestamp("last_practiced_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
