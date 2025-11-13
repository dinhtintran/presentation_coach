"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Sparkles, TrendingUp, Mic, History, BarChart3, Clock } from "lucide-react";
import { FileUpload } from "@/components/presentation/FileUpload";
import { SlideViewer } from "@/components/presentation/SlideViewer";
import { PracticeSession } from "@/components/presentation/PracticeSession";
import { AnalysisDashboard } from "@/components/presentation/AnalysisDashboard";
import type { Presentation } from "@/types/presentation";

export default function PresentationCoachPage() {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [step, setStep] = useState<"upload" | "view" | "practice" | "analyze">(
    "upload"
  );

  const handleUploadComplete = (newPresentation: Presentation) => {
    setPresentation(newPresentation);
    setStep("view");
  };

  const handleStartPractice = () => {
    setStep("practice");
  };

  const handleSessionComplete = (newSessionId: number) => {
    setSessionId(newSessionId);
    setStep("analyze");
  };

  const handleReset = () => {
    setPresentation(null);
    setSessionId(null);
    setStep("upload");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-900/50 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎤</span>
              </div>
              <span className="text-white font-bold text-xl">Presentation Coach</span>
            </Link>
            <div className="flex items-center gap-6">
              <button
                onClick={handleReset}
                className="text-gray-300 hover:text-white transition flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                New Upload
              </button>
              <Link href="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section - Only show on upload step */}
        {step === "upload" && (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                  Start Your Practice
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Upload your presentation and get AI-powered feedback to improve your speaking skills
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <FeatureCard
                  icon={<Mic className="w-6 h-6" />}
                  title="Record & Analyze"
                  description="Practice with voice recording and get instant AI feedback"
                />
                <FeatureCard
                  icon={<Sparkles className="w-6 h-6" />}
                  title="AI Insights"
                  description="Get detailed analysis on pace, clarity, and confidence"
                />
                <FeatureCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Track Progress"
                  description="Monitor your improvement with detailed metrics"
                />
              </div>

              {/* Upload Section */}
              <div className="mt-8">
                <FileUpload onUploadComplete={handleUploadComplete} />
              </div>

              {/* Practice History */}
              <div className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <History className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Recent Sessions</h2>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition">
                    View All
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Mock History Items */}
                  <HistoryCard
                    title="Q4 Sales Presentation"
                    date="2 hours ago"
                    duration="12:34"
                    score={85}
                    slides={15}
                  />
                  <HistoryCard
                    title="Product Launch Demo"
                    date="Yesterday"
                    duration="8:15"
                    score={92}
                    slides={10}
                  />
                  <HistoryCard
                    title="Team Quarterly Review"
                    date="3 days ago"
                    duration="15:42"
                    score={78}
                    slides={20}
                  />
                  <HistoryCard
                    title="Client Pitch Deck"
                    date="1 week ago"
                    duration="10:20"
                    score={88}
                    slides={12}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Viewer - Show after upload */}
        {step === "view" && presentation && (
          <SlideViewer
            presentation={presentation}
            onStartPractice={handleStartPractice}
          />
        )}

        {/* Practice Session */}
        {step === "practice" && presentation && (
          <PracticeSession
            presentation={presentation}
            onSessionComplete={handleSessionComplete}
          />
        )}

        {/* Analysis Dashboard */}
        {step === "analyze" && sessionId && (
          <AnalysisDashboard sessionId={sessionId} onReset={handleReset} />
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎤</span>
              </div>
              <span className="text-gray-400 text-sm">© 2025 Presentation Coach</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 text-sm transition">
                Privacy
              </Link>
              <Link href="/tos" className="text-gray-400 hover:text-gray-300 text-sm transition">
                Terms
              </Link>
              <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm transition">
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-purple-300">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

function HistoryCard({
  title,
  date,
  duration,
  score,
  slides,
}: {
  title: string;
  date: string;
  duration: string;
  score: number;
  slides: number;
}) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition">
            {title}
          </h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
        <div className="flex items-center gap-1">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="text-lg font-bold text-white">{score}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Upload className="w-4 h-4" />
          <span>{slides} slides</span>
        </div>
      </div>
    </div>
  );
}
