import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Find users who have an active subscription
    const data = await collection.find({}).toArray();

    console.log("Fetched active subscriptions:", data);

    // If no active subscriptions are found
    if (data.length === 0) {
      return NextResponse.json(
        { message: "لا توجد اشتراكات نشطة" }, // No active subscriptions found
        { status: 404 }
      );
    }

    // ✅ Return all active subscriptions
    return NextResponse.json(
      { message: "تم جلب جميع الاشتراكات النشطة بنجاح", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching active subscriptions:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
