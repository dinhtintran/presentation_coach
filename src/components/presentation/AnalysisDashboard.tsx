"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Clock, MessageSquare, Award, ChevronRight } from "lucide-react";
import type { AnalysisReport } from "@/types/presentation";

interface AnalysisDashboardProps {
  sessionId: number;
  onReset?: () => void;
}

export function AnalysisDashboard({ sessionId, onReset }: AnalysisDashboardProps) {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, [sessionId]);

  const fetchAnalysis = async () => {
    try {
      const response = await fetch(`/api/presentation/report/${sessionId}`);
      const data = await response.json();
      setReport(data.report);
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Analyzing your presentation...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return <div>No analysis available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Performance Report
          </h1>
          <p className="text-slate-600">
            Here's how you did in your practice session
          </p>
        </div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <ScoreCard
            title="Confidence"
            score={report.confidenceScore}
            icon={<Award className="w-6 h-6" />}
            color="blue"
          />
          <ScoreCard
            title="Clarity"
            score={report.clarityScore}
            icon={<MessageSquare className="w-6 h-6" />}
            color="green"
          />
          <ScoreCard
            title="Pace"
            score={report.paceScore}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
          />
          <ScoreCard
            title="Words/Min"
            score={report.wordsPerMinute}
            icon={<Clock className="w-6 h-6" />}
            color="orange"
            isMetric
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Strengths */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Strengths</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{report.strengths}</p>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Areas for Improvement
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed">{report.improvements}</p>
          </div>
        </div>

        {/* Filler Words Analysis */}
        {Object.keys(report.fillerWords).length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-12">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Filler Words Detected
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(report.fillerWords).map(([word, count]) => (
                <div
                  key={word}
                  className="px-4 py-2 bg-slate-100 rounded-lg flex items-center gap-2"
                >
                  <span className="font-medium text-slate-700">"{word}"</span>
                  <span className="text-sm text-slate-500">× {count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Feedback */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Detailed Feedback
          </h2>
          <div className="space-y-6">
            {/* Pacing Feedback */}
            <FeedbackSection
              title="Pacing"
              content={report.detailedFeedback.pacing.overall}
            />

            {/* Clarity Feedback */}
            <FeedbackSection
              title="Clarity"
              content={report.detailedFeedback.clarity.overall}
            />

            {/* Engagement Feedback */}
            <FeedbackSection
              title="Engagement"
              content={`Tone: ${report.detailedFeedback.engagement.tone} • Energy: ${report.detailedFeedback.engagement.energy}`}
              suggestions={report.detailedFeedback.engagement.suggestions}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <button 
            onClick={onReset}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors shadow-lg"
          >
            Practice Again
          </button>
          <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-xl font-semibold transition-colors">
            View AI Script
          </button>
        </div>
      </div>
    </div>
  );
}

// Score Card Component
function ScoreCard({
  title,
  score,
  icon,
  color,
  isMetric = false,
}: {
  title: string;
  score: number;
  icon: React.ReactNode;
  color: string;
  isMetric?: boolean;
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  }[color];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-slate-600 font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-900">
          {isMetric ? Math.round(score) : `${Math.round(score)}%`}
        </p>
        {!isMetric && (
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${colorClasses} rounded-full transition-all`}
              style={{ width: `${score}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Feedback Section Component
function FeedbackSection({
  title,
  content,
  suggestions,
}: {
  title: string;
  content: string;
  suggestions?: string[];
}) {
  return (
    <div className="border-l-4 border-slate-200 pl-6">
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-700 mb-3">{content}</p>
      {suggestions && suggestions.length > 0 && (
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <ChevronRight className="w-4 h-4 mt-0.5 text-slate-400" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
