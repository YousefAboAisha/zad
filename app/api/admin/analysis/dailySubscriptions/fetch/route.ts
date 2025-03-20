import { SubscriptionStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

const TOTAL_CHAIRS = 19;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("subscriptions");

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    // Count total subscribers of the day (with an "ACTIVE" subscription)
    const todaySubscribers = await collection.countDocuments({
      status: SubscriptionStatus.ACTIVE,
      createdAt: { $gte: today },
    });

    console.error("Today's Subscripers Count", todaySubscribers);

    // Count unique occupied chairs (distinct users with an "ACTIVE" subscription today)
    const occupiedChairs = await collection.countDocuments({
      status: SubscriptionStatus.ACTIVE,
    });

    const availableChairs = TOTAL_CHAIRS - occupiedChairs;

    return NextResponse.json(
      {
        message: "تم جلب البيانات بنجاح",
        data: {
          todaySubscribers,
          occupiedChairs,
          availableChairs,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching classified subscription analysis:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
