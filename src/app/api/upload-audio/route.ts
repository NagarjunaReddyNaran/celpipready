import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadAudio } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await req.formData();
  const file = formData.get("audio") as File;
  if (!file) return NextResponse.json({ error: "No audio" }, { status: 400 });
  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadAudio(buffer, `speaking/${session.user.id}`);
  return NextResponse.json({ url });
}
