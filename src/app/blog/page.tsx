import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog — CELPIP Study Guides" };
const posts = [
  { slug: "how-to-score-10-on-celpip-writing", title: "How to Score 10+ on CELPIP Writing: Complete Guide", excerpt: "A detailed breakdown of what CELPIP examiners look for, with examples of high-scoring responses.", date: "2025-01-10", read: "12 min" },
  { slug: "celpip-vs-ielts-canadian-pr", title: "CELPIP vs IELTS: Which Is Better for Canadian PR in 2025?", excerpt: "A comprehensive comparison for Express Entry, PNP, and citizenship applications.", date: "2025-01-05", read: "8 min" },
  { slug: "celpip-speaking-tips", title: "CELPIP Speaking Tips: How to Sound Natural Under Pressure", excerpt: "Practical techniques to improve fluency and avoid common mistakes.", date: "2024-12-28", read: "10 min" }
];
export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Study Guides & Tips</h1>
      <p className="text-slate-500 mb-10">Expert advice to help you prepare for your CELPIP exam.</p>
      {posts.map(p => (
        <article key={p.slug} className="border-b border-slate-200 pb-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 hover:text-blue-600 mb-2 cursor-pointer">{p.title}</h2>
          <p className="text-slate-600 mb-3">{p.excerpt}</p>
          <p className="text-sm text-slate-400">{new Date(p.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })} · {p.read} read</p>
        </article>
      ))}
    </div>
  );
}
