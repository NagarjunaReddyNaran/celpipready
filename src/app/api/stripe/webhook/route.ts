import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!); }
  catch { return NextResponse.json({ error: "Invalid signature" }, { status: 400 }); }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const userId = s.metadata?.userId;
    const planKey = s.metadata?.planKey;
    if (!userId || !planKey) return NextResponse.json({ ok: true });
    const planMap: Record<string, string> = { standard: "standard", premium: "premium", exampack: "premium" };
    const plan = planMap[planKey] ?? "standard";
    const expiresAt = planKey === "exampack" ? new Date(Date.now() + 30 * 86400000) : null;
    await prisma.user.update({ where: { id: userId }, data: { plan, planExpiresAt: expiresAt } });
  }
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const user = await prisma.user.findFirst({ where: { stripeCustomerId: sub.customer as string } });
    if (user) await prisma.user.update({ where: { id: user.id }, data: { plan: "free", planExpiresAt: null } });
  }
  return NextResponse.json({ ok: true });
}
