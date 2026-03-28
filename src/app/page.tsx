import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CelpipReady — Score Higher on CELPIP with AI Practice",
  description: "AI-powered CELPIP test preparation. Free to start. No credit card needed."
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" />
          AI-powered exam prep
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          Score Higher on CELPIP.<br />Practice Smarter with AI.
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          AI-powered feedback on Writing &amp; Speaking. Free to start.
        </p>
        <Link href="/login" className="inline-flex bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
          Start Practicing Free — No Credit Card Needed
        </Link>
        <p className="text-sm text-slate-400 mt-3">5 free tests included.</p>
      </section>

      {/* Feature cards */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Practice every CELPIP section</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "🎧", title: "Listening", time: "~47 min", ai: false, premium: false, desc: "All 8 parts with authentic audio scenarios and instant scoring." },
            { icon: "📖", title: "Reading", time: "~55 min", ai: false, premium: false, desc: "38 questions across 4 parts with split-screen passage view." },
            { icon: "✍️", title: "Writing", time: "~53 min", ai: true, premium: false, desc: "Email and survey tasks with AI scoring across 4 CELPIP dimensions." },
            { icon: "🎙️", title: "Speaking", time: "~20 min", ai: true, premium: true, desc: "Record all 8 tasks. AI evaluates fluency, vocabulary, and coherence." }
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-800">{f.title}</h3>
                {f.ai && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">AI</span>}
                {f.premium && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Premium</span>}
              </div>
              <p className="text-sm text-slate-500 mb-3">{f.desc}</p>
              <span className="text-xs text-slate-400 font-mono">{f.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { n: "01", title: "Take a practice test", desc: "Choose any section or take a full timed mock exam." },
              { n: "02", title: "Get instant AI feedback", desc: "Gemini AI scores your writing and speaking like a real examiner." },
              { n: "03", title: "Track your improvement", desc: "See your progress and focus on your weakest areas." }
            ].map(s => (
              <div key={s.n}>
                <div className="text-4xl font-mono font-bold text-blue-100 mb-3">{s.n}</div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Students who improved their scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: "Priya S.", from: "India → Ottawa", score: "CLB 10", quote: "Went from 7 to 10 on writing after practicing with the AI feedback. Worth every dollar." },
            { name: "Carlos M.", from: "Mexico → Vancouver", score: "CLB 9", quote: "The speaking analysis helped me realize I was rushing. My score improved significantly." },
            { name: "Mei L.", from: "China → Toronto", score: "CLB 11", quote: "Best CELPIP prep I found. The AI tips are specific and actionable — not generic advice." }
          ].map(t => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">{t.name[0]}</div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.from}</p>
                </div>
                <span className="ml-auto text-sm font-mono font-bold text-green-600">{t.score}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to improve your CELPIP score?</h2>
          <p className="text-blue-100 mb-6">Join thousands of test-takers who practice with CelpipReady.</p>
          <Link href="/login" className="inline-flex bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition">
            Start Free — No Credit Card Needed
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CelpipReady. Not affiliated with Paragon Testing Enterprises.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-slate-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-700">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-slate-700">AI Disclaimer</Link>
            <Link href="/contact" className="hover:text-slate-700">Contact Us</Link>
          </div>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Is CelpipReady free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, 5 free practice tests with no credit card required." } },
          { "@type": "Question", "name": "How does AI feedback work?", "acceptedAnswer": { "@type": "Answer", "text": "Google Gemini AI scores your writing and speaking across the same 4 dimensions used by real CELPIP examiners." } }
        ]
      }) }} />
    </>
  );
}
