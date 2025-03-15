import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";
import {
  PaymentMethod,
  SubscriptionStatus,
  SubscriptionType,
} from "@/app/enums";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const userCollection = db.collection("users");
    const subscriptionsCollection = db.collection("subscriptions");

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { userId } = body;

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" }, // Invalid user ID
        { status: 400 }
      );
    }

    const userIdObject = new ObjectId(userId);

    // Check if the customer exists
    const customer = await userCollection.findOne({ _id: userIdObject });

    if (!customer) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // Validate subscription type
    if (!["DAILY", "WEEKLY", "MONTHLY"].includes(SubscriptionType.DAILY)) {
      return NextResponse.json(
        { error: "نوع الاشتراك غير صالح" }, // Invalid subscription type
        { status: 400 }
      );
    }

    // Create a new subscription object
    const newSubscription = {
      userId: userIdObject, // Reference to the user
      subscription_type: SubscriptionType.DAILY,
      start_date: new Date(),
      end_date: null,
      payment_method: PaymentMethod.CASH,
      notes: "",
      price: 0,
      status: SubscriptionStatus.ACTIVE,
      createdAt: new Date(),
      isPaid: false,
    };

    // Insert the subscription into the `subscriptions` collection
    const result = await subscriptionsCollection.insertOne(newSubscription);

    if (!result.acknowledged) {
      return NextResponse.json(
        { error: "فشل إنشاء الاشتراك" }, // Failed to create subscription
        { status: 500 }
      );
    }

    console.log("Subscription created successfully!", newSubscription);

    return NextResponse.json(
      { message: "تم إنشاء الاشتراك بنجاح", data: newSubscription }, // Subscription created successfully
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating subscription:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
