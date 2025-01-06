import clientPromise from "@/app/lib/mongodb";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space"); // Replace with your database name
    const collection = db.collection("users");

    // Parse the request body
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // If the user already exists, return an error response
      return NextResponse.json(
        { error: "البريد الالكتروني مستخدم بالفعل" },
        { status: 400 }
      );
    }

    // Create a new user using Mongoose
    const user = new User({ email, password });
    await collection.insertOne(user);

    // Return the response
    return NextResponse.json(
      { message: "User created", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json(
      { error: "Failed to insert data" },
      { status: 500 }
    );
  }
}
