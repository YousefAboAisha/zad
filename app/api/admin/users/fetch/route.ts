import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const userCollection = db.collection("users");

    // Fetch users and project only { name, _id }
    const users = await userCollection
      .find({}, { projection: { name: 1 } }) // _id is included by default
      .toArray();

    // Map users to rename _id to id
    const formattedUsers = users.map((user) => ({
      value: user.name,
      id: user._id.toString(), // Convert ObjectId to string
    }));

    return NextResponse.json(
      { message: "تم جلب المستخدمين بنجاح", data: formattedUsers }, // Successfully fetched users
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching users:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
