import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
      <p className="text-slate-500 mb-6"><em>Last updated: January 1, 2025</em></p>
      <div className="prose prose-slate max-w-none">
        <h2 className="text-xl font-bold mb-2">What we collect</h2>
        <p className="text-slate-600 mb-4">We collect your name, email address, and practice test responses. Speaking audio is stored on Cloudinary and deleted after 30 days.</p>
        <h2 className="text-xl font-bold mb-2">AI Processing</h2>
        <p className="text-slate-600 mb-4">Writing and speaking responses are processed by Google Gemini AI to generate feedback. By using these features you consent to this processing. Responses are not stored by Google beyond the API call.</p>
        <h2 className="text-xl font-bold mb-2">PIPEDA Compliance</h2>
        <p className="text-slate-600 mb-4">We comply with Canada's PIPEDA. Contact privacy@celpipedge.com with any concerns.</p>
        <h2 className="text-xl font-bold mb-2">Data Retention</h2>
        <p className="text-slate-600">Test sessions are retained while your account is active. Delete your account anytime from Settings to permanently remove all data.</p>
      </div>
    </div>
  );
}
