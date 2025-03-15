import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const userCollection = db.collection("users");

    // Get the session and userId
    const session = await getSession();
    const userId = session?.userId;

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

    // Fetch the user to get the active subscription
    const user = await userCollection.findOne(
      { _id: userIdObject },
      { projection: { active_subscription: 1 } } // Retrieve only active_subscription field
    );

    if (!user || !user.active_subscription) {
      return NextResponse.json(
        { error: "لا يوجد اشتراك نشط" }, // No active subscription found
        { status: 404 }
      );
    }

    console.log("Active Subscription:", user.active_subscription);

    return NextResponse.json(
      { message: "تم جلب الاشتراك النشط", data: user.active_subscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching active subscription:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
