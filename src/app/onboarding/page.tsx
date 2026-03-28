import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, onboarded: true },
  });

  // Already onboarded — skip wizard
  if (user?.onboarded) redirect("/dashboard");

  const firstName = user?.name?.split(" ")[0] ?? "";

  return <OnboardingForm initialName={firstName} />;
}
