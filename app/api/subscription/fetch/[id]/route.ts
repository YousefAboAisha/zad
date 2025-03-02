import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ⬅️ Await params properly
) {
  const { id } = await context.params; // ✅ Await params before using them

  try {
    // Validate id
    if (!id) {
      return NextResponse.json(
        { error: "معرف الاشتراك غير موجود" }, // Subscription ID is missing
        { status: 400 }
      );
    }

    // Ensure the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرف الاشتراك غير صالح" }, // Invalid subscription ID
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Find a user whose `active_subscription._id` matches the provided subscription ID
    const user = await collection.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    console.log("Fetched user", user);

    // If no matching subscription is found
    if (!user || !user.active_subscription) {
      return NextResponse.json(
        { error: "الاشتراك غير موجود" }, // Subscription not found
        { status: 404 }
      );
    }

    // Retrieve the active subscription
    const data = user.active_subscription;

    // ✅ Return the subscription data
    return NextResponse.json(
      { message: "تم جلب بيانات الاشتراك بنجاح", data }, // Subscription data retrieved successfully
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
