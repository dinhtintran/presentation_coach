// Real OpenAI Whisper Integration

import OpenAI from "openai";

// Only initialize OpenAI if API key is available
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function transcribeAudio(audioFile: File): Promise<string> {
  // If no OpenAI key, return mock transcription
  if (!openai) {
    console.log("⚠️ No OpenAI API key - using mock transcription");
    return "This is a mock transcription. Hello everyone, today I will present about our quarterly results. The revenue has increased by 25% compared to last quarter. Our customer satisfaction score is now at 92%. We have successfully launched three new features. Thank you for your attention.";
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
      response_format: "text",
    });

    return transcription;
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio");
  }
}

export async function transcribeAudioWithTimestamps(
  audioFile: File
): Promise<{
  text: string;
  segments: Array<{
    text: string;
    start: number;
    end: number;
  }>;
}> {
  // If no OpenAI key, return mock data
  if (!openai) {
    console.log("⚠️ No OpenAI API key - using mock transcription with timestamps");
    const mockText = "This is a mock transcription. Hello everyone, today I will present about our quarterly results. The revenue has increased by 25% compared to last quarter. Our customer satisfaction score is now at 92%. We have successfully launched three new features. Thank you for your attention.";
    
    return {
      text: mockText,
      segments: [
        { text: "This is a mock transcription.", start: 0, end: 2 },
        { text: "Hello everyone, today I will present about our quarterly results.", start: 2, end: 7 },
        { text: "The revenue has increased by 25% compared to last quarter.", start: 7, end: 12 },
        { text: "Our customer satisfaction score is now at 92%.", start: 12, end: 16 },
        { text: "We have successfully launched three new features.", start: 16, end: 20 },
        { text: "Thank you for your attention.", start: 20, end: 23 },
      ],
    };
  }

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
      response_format: "verbose_json",
      timestamp_granularities: ["segment"],
    });

    return {
      text: transcription.text,
      segments: transcription.segments || [],
    };
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio with timestamps");
  }
}
