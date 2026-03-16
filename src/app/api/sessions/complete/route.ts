import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { sessionId, answers, sectionScores } = await req.json();
  await prisma.testSession.update({
    where: { id: sessionId },
    data: {
      status: "completed",
      completedAt: new Date(),
      answers,
      sectionScores: sectionScores ?? undefined,
    },
  });
  return NextResponse.json({ ok: true });
}