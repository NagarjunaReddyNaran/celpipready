import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPracticeReminder(email: string, name: string) {
  return resend.emails.send({
    from: "CelpipEdge <reminders@celpipedge.com>",
    to: email,
    subject: "Time to practice! Your CELPIP exam is approaching.",
    html: `<h2>Hi ${name},</h2><p>Don't forget to practice today.</p><a href="https://celpipedge.com/dashboard" style="background:#2563EB;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin:16px 0">Practice Now</a>`
  });
}
