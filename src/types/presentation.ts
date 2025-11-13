// Presentation Coach - Type Definitions

export interface Presentation {
  id: number;
  userId: number;
  title: string;
  fileName: string;
  fileUrl: string;
  fileType: "pdf" | "pptx";
  totalSlides: number;
  slidesData?: SlideData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SlideData {
  slideIndex: number;
  imageUrl: string;
  content?: string;
  thumbnailUrl?: string;
}

export interface PracticeSession {
  id: number;
  presentationId: number;
  userId: number;
  audioUrl?: string;
  duration?: number;
  slideTimestamps?: SlideTimestamp[];
  transcript?: string;
  isAnalyzed: boolean;
  createdAt: Date;
}

export interface SlideTimestamp {
  slideIndex: number;
  timestamp: number; // milliseconds from start
  duration?: number; // time spent on this slide
}

export interface AnalysisReport {
  id: number;
  sessionId: number;
  
  // Speech Metrics
  wordsPerMinute: number;
  totalWords: number;
  fillerWords: Record<string, number>;
  
  // Performance Scores (0-100)
  clarityScore: number;
  paceScore: number;
  confidenceScore: number;
  emotionalTone: "confident" | "nervous" | "neutral" | "enthusiastic";
  
  // Slide Analysis
  slideAnalysis: SlideAnalysis[];
  slideContentAlignment: number;
  
  // Feedback
  strengths: string;
  improvements: string;
  detailedFeedback: DetailedFeedback;
  
  createdAt: Date;
}

export interface SlideAnalysis {
  slideIndex: number;
  timeSpent: number; // seconds
  confidence: "high" | "medium" | "low";
  pace: "too-fast" | "optimal" | "too-slow";
  contentMatch: number; // 0-100
  feedback: string;
}

export interface DetailedFeedback {
  pacing: {
    overall: string;
    perSlide: { slideIndex: number; feedback: string }[];
  };
  clarity: {
    overall: string;
    issues: string[];
  };
  engagement: {
    tone: string;
    energy: string;
    suggestions: string[];
  };
}

export interface AIScript {
  id: number;
  presentationId: number;
  scriptData: SlideScript[];
  totalEstimatedTime: number;
  generatedBy: "ai" | "user";
  createdAt: Date;
  updatedAt: Date;
}

export interface SlideScript {
  slideIndex: number;
  text: string;
  keyPoints: string[];
  estimatedTime: number; // seconds
  suggestions?: string[];
}

export interface UserProgress {
  id: number;
  userId: number;
  presentationId: number;
  totalSessions: number;
  averageConfidence: number;
  averageClarity: number;
  averagePace: number;
  improvementTrend: ProgressDataPoint[];
  lastPracticedAt: Date;
  updatedAt: Date;
}

export interface ProgressDataPoint {
  date: string;
  confidenceScore: number;
  clarityScore: number;
  paceScore: number;
  sessionId: number;
}

// Upload & Session States
export interface UploadState {
  file: File | null;
  isUploading: boolean;
  progress: number;
  error?: string;
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  currentSlide: number;
  duration: number;
  audioBlob?: Blob;
  slideTimestamps: SlideTimestamp[];
}

export interface TrainingMode {
  isActive: boolean;
  currentSlide: number;
  highlightedScriptPart: number;
  realTimeMatch: number; // 0-100 alignment score
}
