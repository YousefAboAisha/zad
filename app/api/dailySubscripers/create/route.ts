import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  PaymentMethod,
  SubscriptionStatus,
  SubscriptionType,
} from "@/app/enums";
import DailySubscription from "@/app/models/dailySubscription";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const usersCollection = db.collection("users");

    // Parse the request body
    const body = await req.json();
    const {
      userId, // ✅ Receive the user ID from the request body
      notes,
    } = body;

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { error: "معرّف المستخدم مطلوب" }, // "User ID is required"
        { status: 400 }
      );
    }

    // Convert userId to ObjectId
    const userIdObject = new ObjectId(userId);

    // Check if the user exists
    const user = await usersCollection.findOne({ _id: userIdObject });
    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // "User not found"
        { status: 404 }
      );
    }

    // Create a new subscription object
    const newSubscription = new DailySubscription({
      _id: new ObjectId(), // Generate a new ObjectId for the subscription
      subscription_type: SubscriptionType.DAILY,
      start_date: new Date(),
      end_date: "",
      payment_method: PaymentMethod.CASH,
      notes,
      status: SubscriptionStatus.ACTIVE,
      price: 0,
      createdAt: new Date(),
    });

    // Update the user's document by pushing the new subscription into the dailySubscriptions array
    const result = await usersCollection.updateOne(
      { _id: userIdObject },
      {
        $push: {
          dailySubscriptions: newSubscription,
        },
      }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "فشل إضافة الاشتراك" }, // "Failed to add subscription"
        { status: 400 }
      );
    }

    // Return the response
    return NextResponse.json(
      { message: "تم إنشاء الاشتراك بنجاح", data: newSubscription }, // "Subscription created successfully"
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating subscription:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // "Server error"
      { status: 500 }
    );
  }
}
