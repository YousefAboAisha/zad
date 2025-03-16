import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/lib/session";
import { Role } from "@/app/enums";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const usersCollection = db.collection("users");

    // Parse request body
    const { name, email, password } = await req.json();

    console.log("[Admin Sign-up] Request Body:", { name, email });

    // Check if email is already registered
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل بالفعل" }, // Email already registered
        { status: 409 }
      );
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = {
      name,
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newAdmin);
    const adminId = result.insertedId.toString();

    // Create session for the newly registered admin
    await createSession(adminId, name, email, Role.ADMIN);

    return NextResponse.json(
      { message: "تم إنشاء الحساب بنجاح", userId: adminId }, // Account created successfully
      { status: 201 }
    );
  } catch (error) {
    console.error("[Admin Sign-up] Error:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
