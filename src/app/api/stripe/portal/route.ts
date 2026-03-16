import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL("/login", process.env.NEXTAUTH_URL!));
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user?.stripeCustomerId) {
      // No stripe customer yet — redirect to pricing
      return NextResponse.redirect(new URL("/pricing", process.env.NEXTAUTH_URL!));
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXTAUTH_URL}/settings`,
    });

    return NextResponse.redirect(portal.url);
  } catch (err) {
    console.error("Stripe portal error:", err);
    return NextResponse.redirect(new URL("/settings", process.env.NEXTAUTH_URL!));
  }
}
