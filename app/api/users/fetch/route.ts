import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Find users and return only `_id` and `name`
    const users = await collection
      .find({}, { projection: { _id: 1, name: 1 } })
      .toArray();

    console.log("Fetched users:", users);

    // If no users are found
    if (users.length === 0) {
      return NextResponse.json(
        { message: "لا يوجد مستخدمون" }, // No users found
        { status: 404 }
      );
    }

    // ✅ Transform the data to { id: _id, value: name }
    const formattedUsers = users.map((user) => ({
      id: user._id.toString(), // Convert ObjectId to string
      value: user.name,
    }));

    // ✅ Return users in the required format
    return NextResponse.json(
      { message: "تم جلب المستخدمين بنجاح", data: formattedUsers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
