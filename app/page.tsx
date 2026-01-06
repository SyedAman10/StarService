"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Capture email value before any state changes
    const emailValue = email.trim();
    
    setStatus("loading");
    setMessage("");

    // Validate email on client side
    if (!emailValue || !emailValue.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you! Check your email for early access details.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              ⭐ StarServices
          </h1>
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-16">
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="inline-block mb-4">
                <span className="glass-card px-6 py-2 text-blue-600 font-semibold text-sm">
                  🚀 The Future of Startup Discovery
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                From Social Conversations
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  To Validated Startups
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                StarServices analyzes millions of conversations across Reddit, Twitter, and social platforms to discover real problems people face every day. We transform these insights into validated startup opportunities, complete with market data, landing pages, and marketing campaigns—saving you months of research and thousands of dollars.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="glass-card px-6 py-3">
                  <p className="text-gray-700"><span className="font-bold text-blue-600">10M+</span> Conversations Analyzed</p>
                </div>
                <div className="glass-card px-6 py-3">
                  <p className="text-gray-700"><span className="font-bold text-blue-600">500+</span> Ideas Validated</p>
                </div>
                <div className="glass-card px-6 py-3">
                  <p className="text-gray-700"><span className="font-bold text-blue-600">95%</span> Market Fit Rate</p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
              {/* Idea Discovery */}
              <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Idea Discovery</h3>
                <p className="text-gray-600 leading-relaxed">
                  We scan Reddit, Twitter, and popular social platforms to find real problems people are facing. 
                  Discover validated startup opportunities backed by genuine market demand.
                </p>
              </div>

              {/* Validation */}
              <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Idea Validation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant insights on market demand, competition, and viability. 
                  Our AI analyzes thousands of conversations to validate your startup idea before you invest time and money.
                </p>
              </div>

              {/* Launch */}
              <div className="glass-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Launch</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create stunning landing pages and comprehensive marketing campaigns in minutes. 
                  Go from idea to launch faster than ever with our automated tools.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-20">
              <h3 className="text-4xl font-bold text-gray-900 mb-12">How It Works</h3>
              <div className="glass-card p-12 max-w-4xl mx-auto">
                <div className="space-y-8">
                  <div className="flex items-start gap-6 text-left">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Browse Validated Ideas</h4>
                      <p className="text-gray-600">
                        Access our curated feed of startup opportunities discovered from millions of social media conversations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 text-left">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Validate & Refine</h4>
                      <p className="text-gray-600">
                        Get detailed market analysis, competitor insights, and demand metrics to refine your chosen idea.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 text-left">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Launch Your Startup</h4>
                      <p className="text-gray-600">
                        Generate professional landing pages and complete marketing campaigns with our AI-powered tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20">
              <div className="glass-card-primary p-12 max-w-2xl mx-auto">
                <h3 className="text-4xl font-bold text-white mb-4">
                  Join the Waitlist
                </h3>
                <p className="text-blue-50 text-lg mb-8">
                  Be among the first to discover your next successful startup idea. 
                  Early access members get exclusive features and lifetime benefits.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={status === "loading"}
                      className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-400 bg-white/90 backdrop-blur-sm border-2 border-white/50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                    >
                      {status === "loading" ? "Submitting..." : "Get Early Access"}
                    </button>
                  </div>

                  {message && (
                    <p
                      className={`text-center font-medium ${
                        status === "success" ? "text-white" : "text-red-100"
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </form>

                <p className="text-blue-100 text-sm mt-6">
                  🎉 Join 1,000+ entrepreneurs waiting for launch
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-left">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Save Months of Research</h4>
                <p className="text-gray-600">
                  Skip the endless brainstorming. Get access to pre-validated ideas with real market demand.
                </p>
              </div>

              <div className="glass-card p-6 text-left">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Reduce Risk</h4>
                <p className="text-gray-600">
                  Launch with confidence knowing your idea is backed by data from thousands of real conversations.
                </p>
              </div>

              <div className="glass-card p-6 text-left">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Professional Design</h4>
                <p className="text-gray-600">
                  Get beautiful, conversion-optimized landing pages without hiring designers or developers.
                </p>
              </div>

              <div className="glass-card p-6 text-left">
                <div className="text-3xl mb-3">📈</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Marketing Ready</h4>
                <p className="text-gray-600">
                  Launch complete marketing campaigns with content, ads, and strategies tailored to your startup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 text-center">
            <p className="text-gray-600">
              © 2026 StarServices. Turning ideas into successful startups.
            </p>
            <div className="mt-4 space-x-6">
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy</a>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms</a>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
