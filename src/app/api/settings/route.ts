import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, targetTestDate, reminderEnabled } = await req.json();
  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, targetTestDate: targetTestDate ? new Date(targetTestDate) : null, reminderEnabled }
  });
  return NextResponse.json({ ok: true });
}
