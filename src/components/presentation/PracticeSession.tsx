"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import type { Presentation, RecordingState, SlideTimestamp } from "@/types/presentation";
import { PDFSlideViewer } from "./PDFSlideViewer";

interface PracticeSessionProps {
  presentation: Presentation;
  onSessionComplete: (sessionData: any) => void;
}

export function PracticeSession({ presentation, onSessionComplete }: PracticeSessionProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    currentSlide: 0,
    duration: 0,
    slideTimestamps: [],
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      startTimeRef.current = Date.now();

      // Record initial slide timestamp
      const initialTimestamp: SlideTimestamp = {
        slideIndex: 0,
        timestamp: 0,
      };

      setRecordingState({
        isRecording: true,
        isPaused: false,
        currentSlide: 0,
        duration: 0,
        slideTimestamps: [initialTimestamp],
      });

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingState((prev) => ({
          ...prev,
          duration: Math.floor((Date.now() - startTimeRef.current) / 1000),
        }));
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
      alert("Please allow microphone access to practice");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Create audio blob and submit
      setTimeout(async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        // Prepare form data
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.webm");
        formData.append("presentationId", presentation.id.toString());
        formData.append("duration", recordingState.duration.toString());
        formData.append("slideTimestamps", JSON.stringify(recordingState.slideTimestamps));

        try {
          // Submit to API
          const response = await fetch("/api/presentation/analyze", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          
          if (data.success) {
            onSessionComplete(data.sessionId);
          } else {
            alert("Failed to analyze session. Please try again.");
          }
        } catch (error) {
          console.error("Failed to submit session:", error);
          alert("Network error. Please check your connection.");
        }
      }, 100);
    }
  };

  // Navigate slides
  const goToSlide = (index: number) => {
    // Clamp slide index within range
    const nextIndex = Math.max(0, Math.min(presentation.totalSlides - 1, index));

    // Record timestamp only when recording
    const newTimestamp: SlideTimestamp | null = recordingState.isRecording
      ? {
          slideIndex: nextIndex,
          timestamp: Date.now() - startTimeRef.current,
        }
      : null;

    setRecordingState((prev) => ({
      ...prev,
      currentSlide: nextIndex,
      slideTimestamps: newTimestamp ? [...prev.slideTimestamps, newTimestamp] : prev.slideTimestamps,
    }));
  };

  // Keyboard navigation (Left/Right arrows)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToSlide(recordingState.currentSlide - 1);
      } else if (e.key === "ArrowRight") {
        goToSlide(recordingState.currentSlide + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [recordingState.currentSlide, presentation.totalSlides, recordingState.isRecording]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Practice Mode Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${recordingState.isRecording ? "bg-red-500 animate-pulse" : "bg-slate-600"}`} />
              <div>
                <h2 className="text-lg font-semibold">Practice Session</h2>
                <p className="text-sm text-slate-400">
                  {recordingState.isRecording ? "Recording in progress" : "Ready to record"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="px-4 py-2 bg-slate-800 rounded-lg font-mono text-lg">
                {formatTime(recordingState.duration)}
              </div>

              {/* Recording Controls */}
              {!recordingState.isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-red-500/20"
                >
                  <Mic className="w-5 h-5" />
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Square className="w-5 h-5" />
                  End Session
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Display */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="relative w-full max-w-5xl">
            {/* Current Slide */}
            <div className="relative aspect-video bg-white rounded-xl shadow-2xl overflow-hidden">
              {presentation.fileType === "pdf" ? (
                <PDFSlideViewer
                  fileUrl={presentation.fileUrl}
                  currentSlide={recordingState.currentSlide}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                  <p className="text-2xl font-semibold text-slate-600">
                    Slide {recordingState.currentSlide + 1}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <button
                onClick={() => goToSlide(Math.max(0, recordingState.currentSlide - 1))}
                disabled={recordingState.currentSlide === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm disabled:opacity-30 transition-all flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => goToSlide(Math.min(presentation.totalSlides - 1, recordingState.currentSlide + 1))}
                disabled={recordingState.currentSlide === presentation.totalSlides - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm disabled:opacity-30 transition-all flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full">
                <span className="text-sm font-medium">
                  {recordingState.currentSlide + 1} / {presentation.totalSlides}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        {!recordingState.isRecording && (
          <div className="mt-8 max-w-2xl mx-auto p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h3 className="font-semibold mb-3 text-slate-200">Practice Tips:</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Click "Start Recording" to begin your practice session</li>
              <li>• Navigate through slides using arrow keys or buttons</li>
              <li>• Speak naturally as if presenting to an audience</li>
              <li>• Click "End Session" when finished to get AI feedback</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
