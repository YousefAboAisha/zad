import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For password hashing and verification
import { createSession } from "@/app/lib/session";
import { Role } from "@/app/enums";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const usersCollection = db.collection("users");

    // Parse request body
    const { email, password } = await req.json();

    console.log("[Admin Sign-in] Request Body:", { email });

    // Check if the user exists
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "البريد الإلكتروني غير مسجل" }, // Email not registered
        { status: 404 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "كلمة المرور غير صحيحة" }, // Incorrect password
        { status: 401 }
      );
    }

    // Check if the user is an Admin
    if (user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "غير مصرح لك بالدخول" }, // Unauthorized
        { status: 403 }
      );
    }

    // Create an admin session
    await createSession(user._id.toString(), user.name, user.email, user.role);

    return NextResponse.json(
      { message: "تم تسجيل دخول المسؤول بنجاح" }, // Admin sign-in successful
      { status: 200 }
    );
  } catch (error) {
    console.error("[Admin Sign-in] Error:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
