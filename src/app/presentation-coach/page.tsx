"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Sparkles, TrendingUp, Mic, History, BarChart3, Clock, Menu, X, Plus, User, Settings, LogOut, ChevronLeft, ChevronRight, FileText, Send, Paperclip, Smile } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [scenario, setScenario] = useState("");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [practiceTimeLimit, setPracticeTimeLimit] = useState<number>(10); // minutes

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

  const handleGenerateScript = async () => {
    if (!scenario.trim()) return;
    setIsGeneratingScript(true);
    // TODO: Send scenario to AI API to generate presentation script
    console.log("Generating script for scenario:", scenario);
    setTimeout(() => {
      setIsGeneratingScript(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerateScript();
    }
  };

  // Mock history data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-slate-900/50 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🎤</span>
                </div>
                <span className="text-white font-bold text-xl">Presentation Coach</span>
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={handleReset}
                className="hidden sm:flex text-gray-300 hover:text-white transition items-center gap-2"
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
      <div className="pt-16 h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden fixed h-full w-80 border-r border-white/10 bg-slate-900/95 backdrop-blur-xl flex flex-col transition-all duration-300 z-40`}>
            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-3 right-3 p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* New Session Button */}
            <div className="p-3 border-b border-white/10 flex-shrink-0">
              <button 
                onClick={handleReset}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                New Session
              </button>
            </div>

            {/* Mobile History List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin min-h-0">
              <div className="flex items-center gap-2 px-2 py-1 mb-2">
                <History className="w-4 h-4 text-gray-400" />
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent</h3>
              </div>
              
              <HistoryCard title="Q4 Sales Presentation" date="2 hours ago" duration="12:34" score={85} slides={15} />
              <HistoryCard title="Product Launch Demo" date="Yesterday" duration="8:15" score={92} slides={10} />
              <HistoryCard title="Team Quarterly Review" date="3 days ago" duration="15:42" score={78} slides={20} />
              <HistoryCard title="Client Pitch Deck" date="1 week ago" duration="10:20" score={88} slides={12} />
            </div>

            {/* Mobile Account */}
            <div className="border-t border-white/10 p-3 flex-shrink-0 bg-slate-900/90">
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 border-2 border-white/10">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-white truncate">Your Name</p>
                  <p className="text-xs text-gray-400 truncate">Free Plan</p>
                </div>
                <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Desktop Sidebar - Practice History (Fixed, Collapsible) */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-16'} hidden lg:flex h-[calc(100vh-4rem)] border-r border-white/10 bg-slate-900/80 backdrop-blur-xl flex-col flex-shrink-0 transition-all duration-300 overflow-hidden`}>
              {/* New Session Button at Top */}
              <div className="p-3 border-b border-white/10 flex-shrink-0">
                {sidebarOpen ? (
                  <button 
                    onClick={handleReset}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                    New Session
                  </button>
                ) : (
                  <button 
                    onClick={handleReset}
                    className="w-full aspect-square bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-lg text-white transition-all duration-200 flex items-center justify-center group"
                    title="New Session"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                )}
              </div>

              {/* Scrollable History - Takes remaining space */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin min-h-0">
                {sidebarOpen ? (
                  <>
                    <div className="flex items-center gap-2 px-2 py-1 mb-2">
                      <History className="w-4 h-4 text-gray-400" />
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent</h3>
                    </div>
                    
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
                    <HistoryCard
                      title="Marketing Strategy"
                      date="2 weeks ago"
                      duration="14:25"
                      score={91}
                      slides={18}
                    />
                    <HistoryCard
                      title="Annual Report"
                      date="3 weeks ago"
                      duration="16:10"
                      score={87}
                      slides={25}
                    />
                    <HistoryCard
                      title="Investor Pitch"
                      date="1 month ago"
                      duration="9:45"
                      score={94}
                      slides={8}
                    />
                  </>
                ) : (
                  <div className="space-y-2">
                    {/* Collapsed icons */}
                    <button 
                      className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                      title="Q4 Sales Presentation"
                    >
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    <button 
                      className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                      title="Product Launch Demo"
                    >
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    <button 
                      className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                      title="Team Quarterly Review"
                    >
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    <button 
                      className="w-10 h-10 mx-auto flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                      title="Client Pitch Deck"
                    >
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                )}
              </div>

              {/* Account Profile at Bottom - Fixed */}
              <div className="border-t border-white/10 p-3 relative flex-shrink-0 bg-slate-900/90">
                {sidebarOpen ? (
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 border-2 border-white/10">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-white truncate">Your Name</p>
                      <p className="text-xs text-gray-400 truncate">Free Plan</p>
                    </div>
                    <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-white/10 hover:scale-110 transition-transform"
                    title="Account"
                  >
                    <User className="w-5 h-5 text-white" />
                  </button>
                )}

                {/* Account Menu Dropdown */}
                {showAccountMenu && (
                  <div className="absolute bottom-full left-3 right-3 mb-2 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-sm font-semibold text-white">your.email@example.com</p>
                      <p className="text-xs text-gray-400 mt-1">Free Plan • Upgrade to Pro</p>
                    </div>
                    <div className="p-1">
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-left group">
                        <User className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Profile Settings</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-left group">
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Preferences</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-left group">
                        <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Upgrade to Pro</span>
                      </button>
                    </div>
                    <div className="p-1 border-t border-white/10">
                      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all text-left group">
                        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                        <span className="text-sm text-gray-300 group-hover:text-red-400 transition-colors">Log out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Toggle Sidebar Button - Desktop only */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-50 w-6 h-16 bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 rounded-r-lg items-center justify-center transition-all duration-200 group"
              style={{ left: sidebarOpen ? '320px' : '64px', transition: 'left 300ms' }}
            >
              {sidebarOpen ? (
                <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              )}
            </button>

          {/* Main Content Area - Scrollable with Input at Bottom */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 py-16 max-w-4xl pb-32">
              {/* Upload Step */}
              {step === "upload" && (
                <div className="max-w-2xl mx-auto">
                  {/* Header with small feature icons */}
                  <div className="text-center space-y-6 mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                      Upload Your Presentation
                    </h1>
                    <p className="text-lg text-gray-300">
                      Get AI-powered feedback to improve your speaking skills
                    </p>

                    {/* Small feature icons */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group" title="Record & Analyze">
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-purple-500/10 border border-white/10 group-hover:border-purple-400/30 flex items-center justify-center transition-all">
                          <Mic className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden sm:block">Record</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors group" title="AI-Powered Insights">
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-pink-500/10 border border-white/10 group-hover:border-pink-400/30 flex items-center justify-center transition-all">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden sm:block">AI Insights</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group" title="Track Your Progress">
                        <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-blue-500/10 border border-white/10 group-hover:border-blue-400/30 flex items-center justify-center transition-all">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium hidden sm:block">Progress</span>
                      </div>
                    </div>
                  </div>

                  {/* Upload Section */}
                  <FileUpload onUploadComplete={handleUploadComplete} />
                </div>
              )}              {/* View Step - Show slides after upload */}
              {step === "view" && presentation && (
                <div className="flex gap-6 h-[calc(100vh-200px)]">
                  {/* Slide Viewer - Left (flexible width) */}
                  <div className="flex-1 min-w-0">
                    <SlideViewer
                      presentation={presentation}
                      onStartPractice={handleStartPractice}
                    />
                  </div>

                  {/* Control Panel - Right (fixed width) */}
                  <div className="w-80 flex-shrink-0 overflow-y-auto">
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 sticky top-6">
                      <div className="space-y-6">
                        {/* Title */}
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-1">{presentation.title || 'Your Presentation'}</h2>
                          <p className="text-gray-400 text-sm">{presentation.totalSlides} slides • Ready to practice</p>
                        </div>

                        {/* Action Buttons - Stacked */}
                        <div className="space-y-3">
                          {/* Start Practice Button */}
                          <button
                            onClick={handleStartPractice}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95"
                          >
                            <Mic className="w-5 h-5" />
                            <span>Start Practice</span>
                          </button>

                          {/* Time Limit Selector */}
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                            <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <label className="text-xs text-gray-400 block mb-1">Time Limit</label>
                              <select
                                value={practiceTimeLimit}
                                onChange={(e) => setPracticeTimeLimit(Number(e.target.value))}
                                className="bg-transparent text-white font-medium text-sm outline-none cursor-pointer w-full"
                              >
                                <option value={5} className="bg-slate-800">5 minutes</option>
                                <option value={10} className="bg-slate-800">10 minutes</option>
                                <option value={15} className="bg-slate-800">15 minutes</option>
                                <option value={20} className="bg-slate-800">20 minutes</option>
                                <option value={30} className="bg-slate-800">30 minutes</option>
                                <option value={0} className="bg-slate-800">No limit</option>
                              </select>
                            </div>
                          </div>

                          {/* Change Document Button */}
                          <button
                            onClick={handleReset}
                            className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 text-gray-300 hover:text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Upload className="w-5 h-5" />
                            <span>Change Document</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Practice Step */}
                {step === "practice" && presentation && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-1">Practice Session</h2>
                        {practiceTimeLimit > 0 && (
                          <p className="text-gray-400 text-sm flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Time limit: {practiceTimeLimit} minutes
                          </p>
                        )}
                      </div>
                      <button
                        onClick={handleReset}
                        className="text-gray-400 hover:text-white transition flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                    <PracticeSession
                      presentation={presentation}
                      onSessionComplete={handleSessionComplete}
                      timeLimit={practiceTimeLimit}
                    />
                  </div>
                )}

                {/* Analysis Step */}
                {step === "analyze" && sessionId && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
                      <button
                        onClick={handleReset}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        New Session
                      </button>
                    </div>
                    <AnalysisDashboard sessionId={sessionId} onReset={handleReset} />
                  </div>
                )}
              </div>
            </div>

            {/* Scenario Input Bar - Fixed at Bottom */}
            <div className="border-t border-white/10 bg-slate-900/80 backdrop-blur-xl p-4">
              <div className="container mx-auto max-w-4xl">
                {/* Title */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Describe Your Scenario
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Tell us about your presentation context to generate a tailored script
                  </p>
                </div>

                <div className="relative flex items-end gap-3">
                  {/* Input Field */}
                  <div className="flex-1 relative">
                    <textarea
                      value={scenario}
                      onChange={(e) => setScenario(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="E.g., 'This is a class presentation about Machine Learning for CS students' or 'Presenting my final year project to the evaluation committee' or 'Sales pitch to potential enterprise clients'..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50 focus:bg-white/10 transition-all resize-none"
                      rows={3}
                      style={{
                        minHeight: '90px',
                      }}
                    />
                    
                    {/* Character count */}
                    {scenario.length > 0 && (
                      <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                        {scenario.length}/1000
                      </div>
                    )}
                  </div>

                  {/* Generate Script Button */}
                  <button
                    onClick={handleGenerateScript}
                    disabled={!scenario.trim() || isGeneratingScript}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                      scenario.trim() && !isGeneratingScript
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/25'
                        : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isGeneratingScript ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Script
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Scenario Templates */}
                {!scenario && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setScenario("Class presentation about [topic] for university students")}
                      className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                      🎓 Class Presentation
                    </button>
                    <button
                      onClick={() => setScenario("Final year project defense presentation to evaluation committee")}
                      className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                      📚 Project Defense
                    </button>
                    <button
                      onClick={() => setScenario("Product demonstration and sales pitch to potential enterprise clients")}
                      className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                      💼 Client Pitch
                    </button>
                    <button
                      onClick={() => setScenario("Conference talk presenting research findings to academic audience")}
                      className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                      🔬 Research Talk
                    </button>
                    <button
                      onClick={() => setScenario("Team meeting to present quarterly results to stakeholders")}
                      className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                    >
                      📊 Business Update
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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
  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400 bg-green-500/10 border-green-500/20";
    if (score >= 80) return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    if (score >= 70) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    return "text-orange-400 bg-orange-500/10 border-orange-500/20";
  };

  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-3 hover:border-purple-500/40 hover:bg-white/10 transition-all cursor-pointer group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-white text-sm group-hover:text-purple-300 transition truncate flex-1">
          {title}
        </h3>
        <div className={`px-2 py-0.5 rounded-md border ${getScoreColor(score)} flex items-center gap-1 flex-shrink-0`}>
          <span className="text-xs font-bold">{score}</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-2">{date}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{duration}</span>
        </div>
        <span className="text-gray-600">•</span>
        <div className="flex items-center gap-1">
          <Upload className="w-3 h-3" />
          <span>{slides}</span>
        </div>
      </div>
    </div>
  );
}
