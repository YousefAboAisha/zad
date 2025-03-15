import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const subscriptionsCollection = db.collection("subscriptions");

    // Aggregate subscriptions based on status
    const aggregation = await subscriptionsCollection
      .aggregate([
        {
          $group: {
            _id: "$status", // Group by status
            count: { $sum: 1 }, // Count each status
          },
        },
      ])
      .toArray();

    // Default structure with 0 values
    const data = {
      total: await subscriptionsCollection.countDocuments(),
      ACTIVE: 0,
      PENDING: 0,
      EXPIRED: 0,
    };

    // Populate actual counts from the aggregation
    aggregation.forEach((item) => {
      const typedItem = item as {
        _id: "ACTIVE" | "PENDING" | "EXPIRED";
        count: number;
      };
      if (typedItem._id) {
        data[typedItem._id] = typedItem.count;
      }
    });

    return NextResponse.json(
      {
        message: "تم جلب جميع الاشتراكات بنجاح", // Successfully fetched all subscriptions
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
