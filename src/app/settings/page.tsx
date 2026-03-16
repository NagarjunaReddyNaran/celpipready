import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display name</label>
            <input defaultValue={user?.name ?? ""} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target test date</label>
            <input type="date" defaultValue={user?.targetTestDate?.toISOString().split("T")[0] ?? ""} className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
            <p className="text-xs text-slate-400 mt-1">Powers the countdown on your dashboard</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Billing</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-800">Current plan</p>
            <p className="text-sm text-slate-500 capitalize">{user?.plan ?? "free"}</p>
          </div>
          {user?.plan !== "free" ? (
            <a href="/api/stripe/portal" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Manage billing →</a>
          ) : (
            <a href="/pricing" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">Upgrade Plan</a>
          )}
        </div>
      </div>
      <div className="border border-red-200 rounded-2xl p-6">
        <h2 className="font-semibold text-red-700 mb-2">Danger Zone</h2>
        <p className="text-sm text-slate-600 mb-4">Permanently delete your account and all test data. This cannot be undone.</p>
        <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">Delete My Account</button>
      </div>
    </div>
  );
}
