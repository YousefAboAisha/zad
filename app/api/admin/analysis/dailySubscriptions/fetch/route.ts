import { SubscriptionStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("subscriptions");

    // Aggregate and count PENDING subscriptions classified by type
    const aggregation = await collection
      .aggregate([
        {
          $match: {
            status: SubscriptionStatus.PENDING, // Filter only pending subscriptions
          },
        },
        {
          $group: {
            _id: "$subscription_type", // Group by subscription type
            count: { $sum: 1 }, // Count occurrences
          },
        },
      ])
      .toArray();

    // Default structure with 0 values
    const data = {
      WEEKLY: 0,
      MONTHLY: 0,
    };

    // Populate actual counts from the aggregation
    aggregation.forEach((item) => {
      const typedItem = item as { _id: "WEEKLY" | "MONTHLY"; count: number };
      if (typedItem._id) {
        data[typedItem._id] = typedItem.count;
      }
    });

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح", // Data fetched successfully
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching classified pending subscriptions:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
