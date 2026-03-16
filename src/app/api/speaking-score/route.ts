import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { scoreSpeaking } from "@/lib/gemini";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 10, 60_000)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.plan !== "premium") return NextResponse.json({ error: "Premium required" }, { status: 403 });
  const { sessionId, tasks } = await req.json();
  try {
    const feedbacks = await Promise.all(tasks.map((t: { prompt: string; audioUrl: string }) => scoreSpeaking(t.prompt, t.audioUrl)));
    const aiFeedback = { tasks: feedbacks };
    if (sessionId) await prisma.testSession.update({ where: { id: sessionId }, data: { aiFeedback, status: "completed", completedAt: new Date() } });
    return NextResponse.json({ feedback: aiFeedback });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI processing failed." }, { status: 500 });
  }
}
