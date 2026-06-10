import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email dan OTP diperlukan" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: otp,
      },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Kode OTP salah" }, { status: 400 });
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json({ error: "Kode OTP telah kadaluarsa" }, { status: 400 });
    }

    // OTP is valid. We don't delete it yet, we'll delete it upon actual password reset.
    return NextResponse.json({ success: true, message: "OTP valid" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
