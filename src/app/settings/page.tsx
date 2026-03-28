import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>

      <SettingsForm
        initialName={user?.name ?? ""}
        initialTargetDate={user?.targetTestDate?.toISOString().split("T")[0] ?? ""}
        initialReminder={user?.reminderEnabled ?? false}
        plan={user?.plan ?? "free"}
      />

      <div className="border border-red-200 rounded-2xl p-6">
        <h2 className="font-semibold text-red-700 mb-2">Danger Zone</h2>
        <p className="text-sm text-slate-600 mb-4">Permanently delete your account and all test data. This cannot be undone.</p>
        <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">Delete My Account</button>
      </div>
    </div>
  );
}
