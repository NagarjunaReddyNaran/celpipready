import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ListeningTestClient } from "./ListeningTestClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Listening Practice" };

export default async function ListeningTestPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });

  return <ListeningTestClient plan={user?.plan ?? "free"} />;
}
