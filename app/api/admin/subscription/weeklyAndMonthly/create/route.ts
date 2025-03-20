import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";
import { SubscriptionStatus, SubscriptionType } from "@/app/enums";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const userCollection = db.collection("users");
    const subscriptionsCollection = db.collection("subscriptions");
    // Get the session and userId
    const session = await getSession();
    const userId = session?.id;

    console.log("Customer user ID", userId);

    // Validate userId
    if (!userId || !ObjectId.isValid(userId)) {
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

    // Parse the request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const {
      subscription_type,
      start_date,
      end_date,
      payment_method,
      notes,
      price,
    } = body;

    // Validate subscription type
    if (
      ![
        SubscriptionType.DAILY,
        SubscriptionType.WEEKLY,
        SubscriptionType.MONTHLY,
      ].includes(subscription_type)
    ) {
      return NextResponse.json(
        { error: "نوع الاشتراك غير صالح" }, // Invalid subscription type
        { status: 400 }
      );
    }

    // Create a new subscription object
    const newSubscription = {
      userId: userIdObject, // Reference to the user
      subscription_type,
      status: SubscriptionStatus.PENDING,
      start_date,
      end_date,
      payment_method,
      createdAt: new Date(),
      price,
      notes,
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

    // If subscription is WEEKLY or MONTHLY, update the user's active subscription with the ObjectId
    if (
      subscription_type === SubscriptionType.WEEKLY ||
      subscription_type === SubscriptionType.MONTHLY
    ) {
      await userCollection.updateOne(
        { _id: userIdObject },
        { $set: { active_subscription: result.insertedId } } // ✅ Store ObjectId reference
      );
    }

    return NextResponse.json(
      {
        message: "تم إنشاء الاشتراك بنجاح",
        data: { ...newSubscription, _id: result.insertedId },
      }, // Subscription created successfully
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
