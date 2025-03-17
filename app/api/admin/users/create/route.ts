import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { Role } from "@/app/enums";
import User from "@/app/models/user";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { name, email, phoneNumber, profession } = body;

    // Check if the Guest already exists
    const existingGuest = await collection.findOne({ phoneNumber });

    if (existingGuest) {
      // If the Guest already exists, return an error response - Email is already exist
      return NextResponse.json(
        {
          error:
            "البريد الالكتروني مستخدم بالفعل، قم بتسجيل الدخول بدلاً من الانضمام",
        },
        { status: 400 }
      );
    }

    // Create a new Guest using Mongoose
    const GuestRole = Role.GUEST;
    const guest = new User({
      name,
      email,
      phoneNumber,
      profession,
      role: GuestRole,
    });

    await collection.insertOne(guest);

    // Return the response
    return NextResponse.json(
      { message: "Guest created", data: guest },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while creating customer:", error);
    return NextResponse.json({ error: "خطاً في الخادم " }, { status: 500 });
  }
}
