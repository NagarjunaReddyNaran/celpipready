import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, password } = body as Record<string, string>;

  // ── Field presence ──────────────────────────────────────────────────────────
  if (!name?.trim())     return NextResponse.json({ error: "Full name is required"  }, { status: 400 });
  if (!email?.trim())    return NextResponse.json({ error: "Email is required"      }, { status: 400 });
  if (!password)         return NextResponse.json({ error: "Password is required"   }, { status: 400 });

  // ── Format validation ───────────────────────────────────────────────────────
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });

  if (!PASSWORD_RE.test(password))
    return NextResponse.json({
      error: "Password must be 8+ characters with an uppercase letter, lowercase letter, and number",
    }, { status: 400 });

  // ── Duplicate check ─────────────────────────────────────────────────────────
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing)
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });

  // ── Create user ─────────────────────────────────────────────────────────────
  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name:  name.trim(),
      email: email.toLowerCase(),
      password: hashed,
    },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
