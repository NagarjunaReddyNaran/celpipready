import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userId = session.user.id;

  // ── Read ?set= param ────────────────────────────────────────────────────────
  const { searchParams } = new URL(req.url);
  const set = searchParams.get("set") ?? "mock-a";
  const mockSet = set === "mock-b" ? "mock-b" : "mock-a";

  // ── Create TestSession ──────────────────────────────────────────────────────
  const testSession = await prisma.testSession.create({
    data: {
      userId,
      type: "full",
      status: "in_progress",
      answers: { mockSet },
    },
  });

  // ── Redirect to runner ──────────────────────────────────────────────────────
  return NextResponse.redirect(
    new URL(`/tests/mock/${testSession.id}?set=${mockSet}`, req.url)
  );
}

// Silence unused import warning — redirect is used in server components, not here
void redirect;
