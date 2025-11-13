// AI Analysis Utilities for Presentation Coach

interface TranscriptAnalysis {
  wordsPerMinute: number;
  totalWords: number;
  fillerWords: Record<string, number>;
  clarity: number;
  pace: number;
  confidence: number;
}

// Analyze transcript for performance metrics
export function analyzeTranscript(
  transcript: string,
  duration: number
): TranscriptAnalysis {
  const words = transcript.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  const minutes = duration / 60;
  const wordsPerMinute = Math.round(totalWords / minutes);

  // Detect filler words
  const fillerWordList = [
    "um",
    "uh",
    "like",
    "you know",
    "basically",
    "actually",
    "literally",
    "so",
    "right",
    "okay",
  ];

  const fillerWords: Record<string, number> = {};
  fillerWordList.forEach((filler) => {
    const count = words.filter((word) => word === filler).length;
    if (count > 0) {
      fillerWords[filler] = count;
    }
  });

  // Calculate scores
  const fillerPercentage = (Object.values(fillerWords).reduce((a, b) => a + b, 0) / totalWords) * 100;
  
  // Clarity: inverse of filler word usage
  const clarity = Math.max(0, 100 - fillerPercentage * 3);

  // Pace: optimal is 130-160 WPM
  let pace = 100;
  if (wordsPerMinute < 100) pace = 60; // Too slow
  else if (wordsPerMinute < 130) pace = 80;
  else if (wordsPerMinute > 180) pace = 70; // Too fast
  else if (wordsPerMinute > 160) pace = 85;

  // Confidence: based on filler words and pace
  const confidence = (clarity * 0.6 + pace * 0.4);

  return {
    wordsPerMinute,
    totalWords,
    fillerWords,
    clarity: Math.round(clarity),
    pace: Math.round(pace),
    confidence: Math.round(confidence),
  };
}

// Generate AI feedback using GPT
export async function generateAIFeedback(
  transcript: string,
  slideContent: string[],
  analysis: TranscriptAnalysis
): Promise<{
  strengths: string;
  improvements: string;
  emotionalTone: string;
  slideAnalysis: any[];
}> {
  // In production, call OpenAI API
  // For MVP, return structured feedback based on analysis

  const strengths = [];
  const improvements = [];

  if (analysis.clarity > 80) {
    strengths.push("Clear and articulate speech");
  }
  if (analysis.pace > 75) {
    strengths.push("Good pacing throughout the presentation");
  }
  if (Object.keys(analysis.fillerWords).length < 3) {
    strengths.push("Minimal use of filler words");
  }

  if (analysis.clarity < 70) {
    improvements.push("Work on reducing filler words like " + 
      Object.keys(analysis.fillerWords).slice(0, 3).map(w => `"${w}"`).join(", "));
  }
  if (analysis.wordsPerMinute < 120) {
    improvements.push("Try to increase your speaking pace slightly for better engagement");
  }
  if (analysis.wordsPerMinute > 170) {
    improvements.push("Slow down a bit to ensure your audience can follow along");
  }

  // Determine emotional tone
  let emotionalTone = "neutral";
  if (analysis.confidence > 80) emotionalTone = "confident";
  else if (analysis.confidence > 60) emotionalTone = "professional";
  else emotionalTone = "nervous";

  return {
    strengths: strengths.join(". ") + ".",
    improvements: improvements.join(". ") + ".",
    emotionalTone,
    slideAnalysis: [], // TODO: Implement per-slide analysis
  };
}

// Calculate slide-content alignment
export function calculateContentAlignment(
  transcript: string,
  slideContent: string[]
): number {
  // Simple keyword matching
  // In production, use embeddings or semantic similarity

  const transcriptWords = new Set(
    transcript.toLowerCase().split(/\s+/)
      .filter(word => word.length > 3)
  );

  const slideWords = new Set(
    slideContent.join(" ").toLowerCase().split(/\s+/)
      .filter(word => word.length > 3)
  );

  const intersection = new Set(
    [...transcriptWords].filter(word => slideWords.has(word))
  );

  const alignment = (intersection.size / slideWords.size) * 100;
  return Math.min(100, Math.round(alignment * 1.5)); // Boost for better UX
}

// Extract key points from slide content
export function extractKeyPoints(slideText: string): string[] {
  // Simple sentence extraction
  // In production, use NLP or GPT
  
  const sentences = slideText
    .split(/[.!?]\s+/)
    .filter(s => s.length > 10)
    .slice(0, 5); // Top 5 points

  return sentences;
}

// Estimate speaking time for text
export function estimateSpeakingTime(text: string): number {
  const words = text.split(/\s+/).length;
  const averageWPM = 140;
  return Math.round((words / averageWPM) * 60); // in seconds
}
