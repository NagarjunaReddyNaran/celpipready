import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
      <p className="text-slate-500 mb-6"><em>Last updated: January 1, 2025</em></p>
      <div className="space-y-6 text-slate-600">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Intellectual Property</h2>
          <p>CelpipReady creates original content inspired by the format of free official CELPIP samples. We do not reproduce proprietary content from Paragon Testing Enterprises. CELPIP® is a registered trademark of Paragon Testing Enterprises.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">AI Feedback Disclaimer</h2>
          <p>AI-generated scores are for practice only and are not official CELPIP scores. They are not guaranteed to correlate with your actual exam result.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Subscriptions & Refunds</h2>
          <p>Refunds are available within 7 days for new subscribers who have not used AI feedback features.</p>
        </div>
      </div>
    </div>
  );
}
