import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const usersCollection = db.collection("users");
    const subscriptionsCollection = db.collection("subscriptions");

    const session = await getSession();
    console.log("Session", session);
    const userId = session?.id;

    console.log("Customer user ID", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // Validate userId
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" }, // Invalid user ID
        { status: 400 }
      );
    }

    const userIdObject = new ObjectId(userId);

    // Fetch user document
    const user = await usersCollection.findOne({ _id: userIdObject });

    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    let subscription = null;

    // Check if user has an active subscription
    if (user.active_subscription) {
      const subscriptionId = user.active_subscription;

      if (ObjectId.isValid(subscriptionId)) {
        subscription = await subscriptionsCollection.findOne({
          _id: new ObjectId(subscriptionId),
        });
      }
    }

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح", // Data fetched successfully
        data: subscription, // Include subscription details
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during fetching user details", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
