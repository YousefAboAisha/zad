import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For password hashing and verification

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad");
    const collection = db.collection("customers");

    // Parse the request body
    const body = await req.json();
    const { email, password, rememberMe } = body;

    console.log("Sign-in Request Body:", { email, password, rememberMe });

    // Check if the customer exists
    const customer = await collection.findOne({ email });

    if (!customer) {
      // If the customer does not exist, return an error
      return NextResponse.json(
        { error: "البريد الالكتروني غير مسجل، قم بالانضمام إلينا أولاً" }, // Email not registered
        { status: 404 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, customer.password);

    if (!isPasswordValid) {
      // If the password is invalid, return an error
      return NextResponse.json(
        { error: "كلمة المرور غير صحيحة" }, // Incorrect password
        { status: 401 }
      );
    }

    // If the email and password are valid, return the customer's object
    // Exclude sensitive data like the password before sending the response
    const { password: _, ...customerData } = customer;

    return NextResponse.json(
      { message: "تم تسجيل الدخول بنجاح", customer: customerData }, // Sign-in successful
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
