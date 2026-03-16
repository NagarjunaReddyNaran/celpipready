import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { scoreWriting } from "@/lib/gemini";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 20, 60_000)) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.plan === "free") return NextResponse.json({ error: "Upgrade required for AI feedback" }, { status: 403 });
  if (user.plan === "standard") {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sessions = await prisma.testSession.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: today },
    },
    select: { aiFeedback: true },
  });
  const count = sessions.filter((s) => s.aiFeedback !== null).length;
  if (count >= 5) {
    return NextResponse.json(
      { error: "Daily AI limit reached. Upgrade to Premium." },
      { status: 429 }
    );
  }
}
  const { sessionId, task1Prompt, task1Response, task2Prompt, task2Response } = await req.json();
  try {
    const [task1Feedback, task2Feedback] = await Promise.all([
      scoreWriting(task1Prompt, task1Response),
      scoreWriting(task2Prompt, task2Response)
    ]);
    const aiFeedback = { task1: task1Feedback, task2: task2Feedback };
    if (sessionId) await prisma.testSession.update({ where: { id: sessionId }, data: { aiFeedback, status: "completed", completedAt: new Date() } });
    return NextResponse.json({ feedback: aiFeedback });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI processing failed." }, { status: 500 });
  }
}
