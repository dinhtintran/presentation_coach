"use client";

import { useState, useEffect } from "react";
import { Mic, CheckCircle, Sparkles, TrendingUp, Award } from "lucide-react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(0); // Start at 0, will fetch real count

  // Fetch waitlist count on mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/waitlist/count");
        const data = await response.json();
        setWaitlistCount(data.count);
      } catch (err) {
        console.error("Failed to fetch count:", err);
      }
    };
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setIsSuccess(true);
      setEmail("");
      setName("");
      
      // Increment local count
      setWaitlistCount(prev => prev + 1);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <nav className="border-b border-white/10 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="PresentationCoach" className="w-10 h-10" />
              <span className="text-2xl font-bold text-white">PresentationCoach</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Coming Soon - Join the Waitlist</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master Your Presentations
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                With AI-Powered Coaching
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Practice your presentations with real-time AI feedback. Get insights on pacing, clarity, and delivery to become a confident speaker.
            </p>

            {/* Waitlist Form */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Joining..." : "Join the Waitlist"}
                  </button>
                </div>
                {error && (
                  <p className="mt-4 text-red-400 text-sm">{error}</p>
                )}
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-green-500/10 border border-green-500/30 rounded-2xl p-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-gray-300">We'll notify you when PresentationCoach launches. Get ready to level up your presentation skills!</p>
              </div>
            )}

            <p className="text-gray-400 text-sm mt-6">
              🎉 Join <span className="text-purple-400 font-semibold">{waitlistCount.toLocaleString()}+</span> people waiting for early access
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-gray-400">Get real-time feedback on your delivery, pacing, and speaking patterns</p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Track Progress</h3>
              <p className="text-gray-400">Monitor your improvement over time with detailed analytics</p>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Become Confident</h3>
              <p className="text-gray-400">Practice until perfect and deliver presentations with confidence</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 PresentationCoach. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
