import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For password hashing and verification
import { createSession } from "@/app/lib/session";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    const { email, password, rememberMe } = body;

    console.log("Sign-in Request Body:", { email, password, rememberMe });

    // Check if the user exists
    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "البريد الالكتروني غير مُسجل، قم بالانضمام إلينا أولاً" },
        { status: 404 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "الرجاء التأكد من كلمة المرور" },
        { status: 401 }
      );
    }

    // Extract necessary user data, including role
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, name, role, ...userData } = user;

    // Create session with role from the database, not request body
    await createSession(user._id.toString(), name, email, role);

    return NextResponse.json(
      { message: "تم تسجيل الدخول بنجاح", user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
