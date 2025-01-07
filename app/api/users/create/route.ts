import clientPromise from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For password hashing and verification


export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad"); // Replace with your database name
    const collection = db.collection("customers");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { name, email, password, phoneNumber, profession, leasingType } =
      body;

    console.log("Parsed Request Body:", {
      name,
      email,
      password,
      phoneNumber,
      profession,
      leasingType,
    });

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // If the user already exists, return an error response
      return NextResponse.json(
        {
          error:
            "البريد الالكتروني مستخدم بالفعل، قم بتسجيل الدخول بدلاً من الانضمام",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using Mongoose
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      profession,
      leasingType,
    });

    console.log("New User:", user);

    await collection.insertOne(user);

    // Return the response
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ error: "خطاً في الخادم " }, { status: 500 });
  }
}
