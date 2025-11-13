"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertCircle,
} from "lucide-react";
import type { Presentation } from "@/types/presentation";
import { PDFSlideViewer } from "./PDFSlideViewer";

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

  return (
    <div className="w-full h-full flex flex-col">
      {/* Navigation Controls - Top */}
      <div className="flex items-center justify-between mb-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 flex-shrink-0">
        <button
          onClick={goToPrevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="text-center">
          <div className="text-white font-semibold text-lg">
            Slide {currentSlide + 1} of {totalSlides}
          </div>
          <div className="text-gray-400 text-xs mt-1 hidden sm:block">
            Use arrow keys to navigate
          </div>
        </div>

        <button
          onClick={goToNextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Display */}
      <div className="flex-1 min-h-0">
        <div className="h-full w-full bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center">
          {presentation.fileType === "pdf" ? (
             <PDFSlideViewer
               fileUrl={presentation.fileUrl}
               currentSlide={currentSlide}
             />
          ) : (
            <div className="text-center px-8 py-12 max-w-md mx-auto">
              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl rotate-6" />
                <div className="relative w-full h-full bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <FileText className="w-10 h-10 text-blue-400" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">
                  PowerPoint File Ready
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your presentation has been uploaded successfully. Click <span className="text-purple-400 font-semibold">"Start Practice"</span> to begin recording your presentation.
                </p>
                
                {/* File Info */}
                <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-left flex-1">
                      <p className="text-xs text-gray-400 mb-1">File name:</p>
                      <p className="text-sm text-white font-medium break-all">
                        {presentation.fileName}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {totalSlides} slide{totalSlides > 1 ? 's' : ''} detected
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tip */}
                <div className="mt-6 text-xs text-gray-500 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  💡 <span className="text-gray-400">Tip: Open your PowerPoint file in presentation mode on another screen while practicing.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
