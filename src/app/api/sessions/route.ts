import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { type } = await req.json();
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (user?.plan === "free") {
    const count = await prisma.testSession.count({ where: { userId: session.user.id } });
    if (count >= 5) return NextResponse.json({ error: "Free limit reached", limitReached: true }, { status: 403 });
  }
  if ((type === "speaking" || type === "full") && user?.plan !== "premium") {
    return NextResponse.json({ error: "Premium required", premiumRequired: true }, { status: 403 });
  }
  const s = await prisma.testSession.create({ data: { userId: session.user.id, type, status: "in_progress" } });
  return NextResponse.json({ sessionId: s.id });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sessions = await prisma.testSession.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { completedAt: "desc" }, take: 10
  });
  return NextResponse.json({ sessions });
}
