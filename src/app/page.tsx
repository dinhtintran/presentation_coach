import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentation Coach - AI-Powered Public Speaking Training",
  description: "Master your presentations with real-time AI feedback. Upload slides, practice speaking, get instant analysis on pace, clarity, and confidence.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/50 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎤</span>
              </div>
              <span className="text-white font-bold text-xl">Presentation Coach</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="/auth/login" className="text-gray-300 hover:text-white transition">Sign In</a>
              <a href="/presentation-coach" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition">
                Try Free
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
            <span className="text-purple-300 text-sm font-medium">✨ AI-Powered Feedback</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master Your<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Presentation Skills
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Upload your slides, practice speaking, and get instant AI analysis on pace, clarity, filler words, and confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/presentation-coach" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition">
              Start Practicing Free
            </a>
            <a href="#how-it-works" className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg text-lg font-semibold border border-white/20 hover:bg-white/20 transition">
              Watch Demo
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">&lt;1min</div>
              <div className="text-gray-400 text-sm">Analysis Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Free</div>
              <div className="text-gray-400 text-sm">To Start</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to become a confident speaker</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Real-time Analysis</h3>
              <p className="text-gray-400">
                Get instant feedback on speaking pace (WPM), clarity score, filler words detection, and confidence level.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Slide-by-Slide Tracking</h3>
              <p className="text-gray-400">
                See performance metrics for each slide. Know exactly where you excel and where to improve.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Powered Insights</h3>
              <p className="text-gray-400">
                Personalized feedback on your strengths and actionable tips to improve your presentation skills.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📁</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multi-Format Support</h3>
              <p className="text-gray-400">
                Upload PDF or PowerPoint presentations. Practice with the same slides you'll present.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur p-8 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎙️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Voice Recording</h3>
              <p className="text-gray-400">
                Practice with real-time audio recording. Review your performance anytime, anywhere.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition">
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
              <p className="text-gray-400">
                Track your improvement over time. See how your skills develop with every practice session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">4 simple steps to master your presentation</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Upload Slides</h3>
              <p className="text-gray-400">Drag & drop your PDF or PowerPoint presentation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Review Content</h3>
              <p className="text-gray-400">Browse through your slides and prepare</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Practice</h3>
              <p className="text-gray-400">Record your presentation with voice and timing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Feedback</h3>
              <p className="text-gray-400">Receive AI-powered analysis and improve</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-lg">Start free, upgrade when you need more</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-white/20 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> 5 presentations/month
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Basic analysis
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> PDF/PPT support
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-gray-600">✗</span> AI script generation
                </li>
              </ul>
              <a href="/presentation-coach" className="block w-full bg-white/10 text-white py-3 rounded-lg text-center font-semibold hover:bg-white/20 transition">
                Get Started
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur p-8 rounded-2xl border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Unlimited presentations
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Advanced AI analysis
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> AI script generation
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Progress tracking
                </li>
              </ul>
              <a href="/presentation-coach" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg text-center font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                Start Pro Trial
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/5 backdrop-blur p-8 rounded-2xl border border-white/10 hover:border-white/20 transition">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Team management
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Custom branding
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span> Priority support
                </li>
              </ul>
              <a href="mailto:contact@presentationcoach.ai" className="block w-full bg-white/10 text-white py-3 rounded-lg text-center font-semibold hover:bg-white/20 transition">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Master Your Presentations?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of professionals improving their public speaking skills
          </p>
          <a href="/presentation-coach" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition">
            Start Practicing Now - It's Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🎤</span>
                </div>
                <span className="text-white font-bold">Presentation Coach</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered presentation training for professionals
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white text-sm transition">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</a></li>
                <li><a href="/presentation-coach" className="text-gray-400 hover:text-white text-sm transition">Try Free</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition">Privacy</a></li>
                <li><a href="/tos" className="text-gray-400 hover:text-white text-sm transition">Terms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="https://twitter.com" className="text-gray-400 hover:text-white text-sm transition">Twitter</a></li>
                <li><a href="https://github.com" className="text-gray-400 hover:text-white text-sm transition">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © 2025 Presentation Coach. Built with ❤️ for better speakers.
          </div>
        </div>
      </footer>
    </div>
  );
}
