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
            <a 
              href="#hero" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            >
              ⭐ StarServices
            </a>
            <div className="flex gap-6 items-center">
              <a 
                href="#platform" 
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors hidden sm:block"
              >
                Platform
              </a>
              <a 
                href="#mission" 
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors hidden sm:block"
              >
                Our Mission
              </a>
              <a 
                href="#use-cases" 
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors hidden sm:block"
              >
                Use Cases
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors hidden sm:block"
              >
                Contact
              </a>
              <a 
                href="#hero" 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-20" id="hero">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-16">
            {/* Main Heading */}
            <div className="space-y-8">
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
                We're building an AI-powered platform to help entrepreneurs discover validated startup ideas from real conversations on Reddit, Twitter, and social media. Get instant validation, professional landing pages, and complete marketing campaigns—all in one place.
              </p>
              
              {/* CTA in Hero */}
              <div className="mt-12">
                <div className="glass-card-primary p-12 max-w-3xl mx-auto">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    Join Our Waitlist
                  </h3>
                  <p className="text-blue-50 text-lg mb-8 leading-relaxed">
                    Be the first to know when we launch. Early members will get exclusive lifetime benefits and special pricing.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={status === "loading"}
                        className="flex-1 px-6 py-5 rounded-full text-gray-900 placeholder-gray-500 bg-white/95 backdrop-blur-sm border-2 border-white/50 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all text-lg"
                      />
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-10 py-5 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl whitespace-nowrap"
                      >
                        {status === "loading" ? "Joining..." : "Join Waitlist →"}
                      </button>
                    </div>

                    {message && (
                      <div
                        className={`text-center font-medium text-lg p-4 rounded-2xl ${
                          status === "success" 
                            ? "bg-white/20 text-white" 
                            : "bg-red-500/20 text-red-100"
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </form>

                  <div className="flex items-center justify-center gap-8 mt-6 text-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✓</span>
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✓</span>
                      <span>Free early access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Platform Overview */}
            <div className="mt-24" id="platform">
              <div className="glass-card p-12 max-w-6xl mx-auto text-left">
                <div className="text-center mb-12">
                  <h3 className="text-5xl font-bold text-gray-900 mb-4">The Complete Startup Launch Platform</h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Everything you need to go from idea discovery to market launch, all powered by AI and real market data.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  {/* Discovery Engine */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        🔍
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Discovery Engine</h4>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Our advanced AI continuously monitors and analyzes conversations across Reddit, Twitter, LinkedIn, ProductHunt, Hacker News, and specialized forums. We identify pain points, complaints, feature requests, and unmet needs that signal genuine market opportunities.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Real-time social listening across 50+ platforms</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Sentiment analysis and trend detection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Problem clustering and opportunity scoring</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Automatic categorization by industry and niche</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Validation System */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        ✅
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">Comprehensive Validation System</h4>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Every idea comes with detailed validation reports including market size, competition analysis, demand indicators, and viability scores. Make data-driven decisions before investing your time and money.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Total Addressable Market (TAM) estimation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Competitive landscape mapping</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Customer persona development</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Risk assessment and mitigation strategies</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Launch Tools */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        🎨
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">Instant Landing Page Builder</h4>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Generate professional, conversion-optimized landing pages tailored to your startup idea in seconds. Our AI creates compelling copy, stunning designs, and persuasive calls-to-action based on your target market.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>AI-generated copy optimized for conversions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Mobile-responsive designs with modern aesthetics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Built-in email capture and analytics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>One-click deployment to your domain</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Marketing Suite */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                        📈
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">Complete Marketing Campaign Suite</h4>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          Launch your startup with a full marketing arsenal. Get pre-written social media content, email sequences, ad copy, SEO strategies, and content calendars—all customized for your specific startup and audience.
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>30-day social media content calendar</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Email marketing sequences and templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>Google Ads and Facebook Ads copy variants</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">•</span>
                            <span>SEO keyword research and content strategy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why StarServices */}
            <div className="mt-24">
              <h3 className="text-5xl font-bold text-gray-900 mb-4">Why We're Building StarServices</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Every successful startup solves a real problem. We're creating tools to help you find those problems and validate solutions faster than ever before.
              </p>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="glass-card p-8 text-left hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-4">⚡</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Speed to Market</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Traditional market research takes months. Our AI-powered platform will help you discover and validate startup ideas in days, giving you a significant competitive advantage.
                  </p>
                </div>

                <div className="glass-card p-8 text-left hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-4">💰</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Data-Driven Decisions</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Stop guessing what to build. Launch with confidence using insights from real conversations where people express their pain points and needs openly.
                  </p>
                </div>

                <div className="glass-card p-8 text-left hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-4">🎯</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">Complete Launch Kit</h4>
                  <p className="text-gray-600 leading-relaxed">
                    From idea discovery to landing page to marketing campaign—get everything you need to launch your startup in one integrated platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="mt-24" id="mission">
              <div className="glass-card p-12 max-w-5xl mx-auto text-left">
                <h3 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Mission</h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  The startup landscape is filled with failed ventures—not because of poor execution, but because entrepreneurs build solutions to problems that don't exist or markets that don't care.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  StarServices is being built to change that. We believe that the best startup ideas come from listening to real people discussing real problems in their daily lives. Social media platforms like Reddit, Twitter, and specialized forums are goldmines of unmet needs and pain points—but manually sifting through millions of conversations is impossible.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our platform will use advanced AI to surface these opportunities, validate them with data, and provide you with everything needed to launch quickly and confidently. We're democratizing access to market insights that were previously available only to well-funded companies with large research teams.
          </p>
        </div>
            </div>

            {/* Use Cases */}
            <div className="mt-24" id="use-cases">
              <h3 className="text-5xl font-bold text-gray-900 mb-4">Perfect For</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Whether you're a seasoned entrepreneur or just starting out, StarServices will help you find your next big opportunity.
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="glass-card p-8 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">👨‍💻 Solo Founders & Indie Hackers</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You're technical and can build anything—but finding the right problem to solve is the challenge. Use our platform to discover validated opportunities that people are actively looking for solutions to.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Find niche problems with passionate communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Validate before writing code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Launch marketing campaigns without hiring agencies</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">🚀 Serial Entrepreneurs</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You've built startups before and know the importance of market validation. Access a continuous stream of opportunities and launch faster than your competition.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Spot emerging trends before they go mainstream</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Test multiple ideas simultaneously</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Build portfolio of validated ventures</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">💼 Corporate Innovation Teams</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Your company needs to innovate but traditional market research is slow and expensive. Get real-time insights into customer pain points and emerging opportunities.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Identify new product opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Understand customer sentiment at scale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Test concepts before major investments</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card p-8 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">🎓 Aspiring Entrepreneurs</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You want to start a business but don't know where to begin. Learn from real market data and launch your first venture with confidence and support.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>No technical skills required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Complete step-by-step guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>Ready-to-use marketing materials</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer with Contact Form */}
      <footer className="relative z-10 px-6 py-20 mt-32" id="contact">
        <div className="max-w-7xl mx-auto">
          {/* Contact Section */}
          <div className="glass-card p-12 mb-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Have questions about StarServices? Want to partner with us? We'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:hello@starservices.com" className="text-blue-600 hover:text-blue-700">
                        hello@starservices.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      💬
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Social Media</h4>
                      <div className="flex gap-4 mt-2">
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Twitter</a>
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">LinkedIn</a>
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Discord</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      🌍
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                      <p className="text-gray-600">Building remotely, serving globally</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h4>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your message! We'll get back to you soon.");
                }}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="glass-card p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
                  ⭐ StarServices
                </h2>
                <p className="text-gray-600">
                  Transforming ideas into successful startups
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <a href="#platform" className="hover:text-blue-600 transition-colors font-medium">Platform</a>
                <a href="#mission" className="hover:text-blue-600 transition-colors font-medium">Our Mission</a>
                <a href="#use-cases" className="hover:text-blue-600 transition-colors font-medium">Use Cases</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors font-medium">Contact</a>
                <a href="#hero" className="hover:text-blue-600 transition-colors font-medium">Join Waitlist</a>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600">
                © {new Date().getFullYear()} StarServices. All rights reserved. Built with passion for entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
