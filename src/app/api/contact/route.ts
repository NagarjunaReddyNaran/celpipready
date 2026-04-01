import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  await resend.emails.send({
    from: "CelpipEdge Contact <hello@celpipedge.com>",
    to: "hello@celpipedge.com",
    replyTo: email,
    subject: subject ? `[Contact] ${subject}` : `[Contact] Message from ${name}`,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject || "—"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${message}</p>
    `
  });

  return NextResponse.json({ ok: true });
}
