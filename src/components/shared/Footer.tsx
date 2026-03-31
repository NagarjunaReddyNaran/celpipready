import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-slate-500">
        <p className="text-xs sm:text-sm">© {new Date().getFullYear()} CelpipReady. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Link href="/privacy"    className="hover:text-slate-700">Privacy Policy</Link>
          <Link href="/terms"      className="hover:text-slate-700">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-slate-700">AI Disclaimer</Link>
          <Link href="/contact"    className="hover:text-slate-700">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
