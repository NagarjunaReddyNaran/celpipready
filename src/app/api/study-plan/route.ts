import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateStudyPlan } from "@/lib/gemini";
import { rateLimit } from "@/lib/rateLimit";

export async function GET(req: NextRequest) {
  if (!rateLimit(req, 5, 3600_000)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.plan !== "premium") return NextResponse.json({ error: "Premium required" }, { status: 403 });
  const sessions = await prisma.testSession.findMany({ where: { userId: session.user.id, status: "completed" }, orderBy: { completedAt: "desc" }, take: 5 });
  const plan = await generateStudyPlan(JSON.stringify(sessions.map(s => s.sectionScores)));
  return NextResponse.json({ plan });
}
