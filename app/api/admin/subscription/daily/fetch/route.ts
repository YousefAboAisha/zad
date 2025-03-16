import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { SubscriptionType } from "@/app/enums";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const subscriptionsCollection = db.collection("subscriptions");

    // Extract `subscription_type`
    const subscriptionType = SubscriptionType.DAILY;

    if (!subscriptionType || subscriptionType !== "DAILY") {
      return NextResponse.json(
        { error: "نوع الاشتراك غير صالح" }, // Invalid subscription type
        { status: 400 }
      );
    }

    // Define date range for daily subscriptions
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Start of the day

    const tomorrow = new Date(today);
    tomorrow.setUTCDate(today.getUTCDate() + 1); // Start of the next day

    // Use aggregation to join subscriptions with users
    const subscriptions = await subscriptionsCollection
      .aggregate([
        {
          $match: {
            subscription_type: subscriptionType,
            start_date: { $gte: today, $lt: tomorrow },
          },
        },
        {
          $lookup: {
            from: "users", // Join with the users collection
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true, // Ensure subscriptions without users don't break
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            subscription_type: 1,
            status: 1,
            start_date: 1,
            end_date: 1,
            price: 1,
            name: { $ifNull: ["$user.name", "غير معروف"] },
            phoneNumber: { $ifNull: ["$user.phoneNumber", "غير متوفر"] },
          },
        },
      ])
      .toArray();

    return NextResponse.json(
      { message: "تم جلب الاشتراكات", data: subscriptions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching subscriptions:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
