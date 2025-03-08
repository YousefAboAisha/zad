import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Aggregate and count only "PENDING" subscriptions
    const aggregation = await collection
      .aggregate([
        {
          $match: {
            "active_subscription.status": "PENDING", // Filter only pending subscriptions
          },
        },
        {
          $group: {
            _id: "$active_subscription.subscription_type", // Group by subscription type
            count: { $sum: 1 }, // Count occurrences
          },
        },
      ])
      .toArray();

    // Default structure with 0 values
    const data = {
      MONTHLY: 0,
      WEEKLY: 0,
    };

    // Populate actual counts from the aggregation
    aggregation.forEach((item) => {
      if (item._id) {
        data[item._id] = item.count;
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
    console.error("Error fetching pending subscription counts:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
