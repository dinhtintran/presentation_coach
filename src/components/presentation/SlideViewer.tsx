"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";
import type { Presentation } from "@/types/presentation";

interface SlideViewerProps {
  presentation: Presentation;
  onStartPractice: () => void;
}

export function SlideViewer({ presentation, onStartPractice }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = presentation.totalSlides;

  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextSlide();
      if (e.key === "ArrowLeft") goToPrevSlide();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide]);

  // Get PDF URL for current slide
  const getPdfUrl = () => {
    if (presentation.fileType === "pdf") {
      return `${presentation.fileUrl}#page=${currentSlide + 1}`;
    }
    return presentation.fileUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {presentation.title}
          </h2>
          <p className="text-gray-300">
            Review your slides before practicing
          </p>
        </div>

        {/* Slide Display */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-6">
          <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
            {presentation.fileType === "pdf" ? (
              <iframe
                src={getPdfUrl()}
                className="w-full h-full"
                title={`Slide ${currentSlide + 1}`}
              />
            ) : (
              <div className="text-gray-400 text-center">
                <p>Preview not available for this format</p>
                <p className="text-sm mt-2">
                  {presentation.fileName}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-center">
              <div className="text-white font-semibold">
                Slide {currentSlide + 1} of {totalSlides}
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Use arrow keys to navigate
              </div>
            </div>

            <button
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Start Practice */}
          <button
            onClick={onStartPractice}
            className="group bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-left hover:shadow-xl hover:shadow-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Start Practice</h3>
                <p className="text-purple-100 text-sm">
                  Ready to record your presentation
                </p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Record your voice while presenting. Get instant AI feedback on pace, clarity, and confidence.
            </p>
          </button>

          {/* Generate Script (Coming Soon) */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300 font-medium">
              Coming Soon
            </div>
            <div className="flex items-center gap-4 mb-4 opacity-50">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Generate Script</h3>
                <p className="text-gray-300 text-sm">
                  AI-powered speaking notes
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Get AI-generated speaking scripts tailored to your slides. Practice with professional guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
