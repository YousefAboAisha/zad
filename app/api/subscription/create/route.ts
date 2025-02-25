import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Subscription from "@/app/models/dailySubscription";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";
import { SubscriptionStatus } from "@/app/enums";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const customersCollection = db.collection("users");

    // Get the session and userId
    const session = await getSession();
    console.log("Session", session);
    const userId = session?.userId;

    console.log("Customer user ID", userId);

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // Check if the userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" }, // Invalid user ID
        { status: 400 }
      );
    }

    // Convert userId to ObjectId
    const userIdObject = new ObjectId(userId);

    // Check if the customer exists
    const customer = await customersCollection.findOne({ _id: userIdObject });

    if (!customer) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" }, // User not found
        { status: 404 }
      );
    }

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const { subscription_type, start_date, end_date, payment_method, notes } =
      body;

    // Create a new subscription object
    const subscription = new Subscription({
      subscription_type,
      start_date,
      end_date,
      payment_method,
      notes,
      status: SubscriptionStatus.PENDING,
      createdAt: new Date(),
    });

    console.log("New subscription has been added successfully!", subscription);

    // Determine the correct array to store the subscription
    let updateField = "";
    if (subscription_type === "DAILY") updateField = "dailySubscriptions";
    else if (subscription_type === "WEEKLY")
      updateField = "weeklySubscriptions";
    else if (subscription_type === "MONTHLY")
      updateField = "monthlySubscriptions";
    else {
      return NextResponse.json(
        { error: "نوع الاشتراك غير صالح" }, // Invalid subscription type
        { status: 400 }
      );
    }

    // Insert the subscription into the customer's subscriptions array AND set it as the active subscription
    const result = await customersCollection.updateOne(
      { _id: userIdObject }, // Find the customer by their ID
      {
        $set: { active_subscription: subscription }, // Store in active_subscription
        $push: { [updateField]: subscription }, // Keep a copy in the respective array
      }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "فشل إضافة الاشتراك" }, // Failed to add subscription
        { status: 400 }
      );
    }

    // Return the response
    return NextResponse.json(
      { message: "تم إنشاء الاشتراك بنجاح", subscription }, // Subscription created successfully
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
