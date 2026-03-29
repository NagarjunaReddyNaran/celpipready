import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MockTestClient } from "./MockTestClient";

interface PageProps {
  params: Promise<{ sessionId: string }>;
  searchParams: Promise<{ set?: string }>;
}

export default async function MockTestPage({ params, searchParams }: PageProps) {
  // ── Auth guard ──────────────────────────────────────────────────────────────
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { sessionId } = await params;
  const { set } = await searchParams;

  // ── Load session and verify ownership ──────────────────────────────────────
  const testSession = await prisma.testSession.findUnique({
    where: { id: sessionId },
  });

  if (!testSession || testSession.userId !== session.user.id) {
    redirect("/dashboard");
  }

  // ── Extract mockSet ─────────────────────────────────────────────────────────
  // Prefer URL param (set), fall back to stored answers JSON
  const storedSet =
    testSession.answers &&
    typeof testSession.answers === "object" &&
    !Array.isArray(testSession.answers)
      ? (testSession.answers as Record<string, unknown>).mockSet
      : undefined;

  const mockSet: "mock-a" | "mock-b" =
    set === "mock-b" || storedSet === "mock-b" ? "mock-b" : "mock-a";

  // ── Load user plan ──────────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });

  return (
    <MockTestClient
      sessionId={sessionId}
      mockSet={mockSet}
      plan={user?.plan ?? "free"}
    />
  );
}
