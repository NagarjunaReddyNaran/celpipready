import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Pricing" };

const plans = [
  { key: "free",     name: "Free",      price: "$0",    period: "forever",   cta: "Get Started Free", href: "/login",   highlight: false,
    features: ["5 practice tests", "Listening, Reading & Writing", "Basic score results", "Last 3 sessions history"],
    locked:   ["AI writing feedback", "Speaking tests", "Full mock test"] },
  { key: "standard", name: "Standard",  price: "$9.99",  period: "/month",   cta: "Start Standard",   href: "#",        highlight: false,
    features: ["Unlimited Listening, Reading & Writing", "AI feedback on Writing", "Full score history", "Weak area tracking", "Daily reminders"],
    locked:   ["Speaking tests", "Full mock test"] },
  { key: "premium",  name: "Premium",   price: "$19.99", period: "/month",   cta: "Start Premium",    href: "#",        highlight: true,  badge: "Most Popular",
    features: ["Everything in Standard", "Unlimited Speaking + AI scoring", "Full Mock Test", "Personalized 2-week study plan", "Priority support"],
    locked:   [] },
  { key: "exampack", name: "Exam Pack", price: "$24.99", period: "one-time", cta: "Buy Exam Pack",    href: "#",        highlight: false, badge: "Best for exam prep",
    features: ["30 days full Premium access", "Best 1 month before your test", "No recurring charges"],
    locked:   [] }
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Simple, transparent pricing</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Start free. Upgrade when you need AI feedback. Cancel anytime.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map(p => (
          <div key={p.key} className={`rounded-2xl border p-5 flex flex-col ${p.highlight ? "bg-blue-600 border-blue-500 ring-2 ring-blue-500 ring-offset-2" : "bg-white border-slate-200"}`}>
            {p.badge && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-3 self-start ${p.highlight ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`}>{p.badge}</span>
            )}
            <h2 className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.name}</h2>
            <div className="mb-5">
              <span className={`text-3xl font-bold font-mono ${p.highlight ? "text-white" : "text-slate-900"}`}>{p.price}</span>
              <span className={`text-sm ml-1 ${p.highlight ? "text-blue-200" : "text-slate-500"}`}>{p.period}</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {p.features.map(f => (
                <li key={f} className={`flex gap-2 text-sm ${p.highlight ? "text-blue-100" : "text-slate-700"}`}>
                  <span className={p.highlight ? "text-white" : "text-green-500"}>✓</span>{f}
                </li>
              ))}
              {p.locked.map(f => (
                <li key={f} className={`flex gap-2 text-sm opacity-40 ${p.highlight ? "text-white" : "text-slate-500"}`}>
                  <span>✗</span>{f}
                </li>
              ))}
            </ul>
            <Link href={p.href} className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition ${p.highlight ? "bg-white text-blue-700 hover:bg-blue-50" : p.key === "free" ? "border border-slate-300 text-slate-700 hover:bg-slate-50" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-slate-400 mt-8">All prices in CAD. Secure payments by Stripe. Cancel anytime.</p>
    </div>
  );
}
