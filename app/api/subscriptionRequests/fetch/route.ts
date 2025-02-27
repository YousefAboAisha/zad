import { SubscriptionStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Fetch all pending subscription requests
    const pendingSubscriptions = await collection
      .find({ "active_subscription.status": SubscriptionStatus.PENDING })
      .toArray();

    console.log("pendingSubscriptions", pendingSubscriptions);

    if (pendingSubscriptions.length === 0) {
      return NextResponse.json(
        { error: "لا يوجد طلبات اشتراك معلقة" }, // No pending requests
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", pendingSubscriptions }, // Successfully fetched data
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during fetching pending subscriptions", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
