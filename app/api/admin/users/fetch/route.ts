import { SubscriptionStatus } from "@/app/enums";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");

    const userCollection = db.collection("users");
    const subscriptionCollection = db.collection("subscriptions");

    // Fetch users with roles "USER" or "GUEST"
    const users = await userCollection
      .find(
        { role: { $in: ["USER", "GUEST"] } }, // Filter users with these roles
        { projection: { name: 1 } } // Only fetch name (_id is included by default)
      )
      .toArray();

    // Get user IDs
    const userIds = users.map((user) => user._id);

    console.log("User IDs:", userIds);

    // Find users with ACTIVE subscriptions
    const activeSubscriptions = await subscriptionCollection.distinct(
      "userId",
      { userId: { $in: userIds }, status: SubscriptionStatus.ACTIVE }
    );

    console.log("Active Subscriptions:", activeSubscriptions);

    // Convert activeSubscriptions ObjectIds to strings
    const activeSubscriptionIds = activeSubscriptions.map((id) =>
      id.toString()
    );

    // Filter out users with active subscriptions
    const filteredUsers = users
      .filter((user) => !activeSubscriptionIds.includes(user._id.toString()))
      .map((user) => ({
        value: user.name,
        id: user._id.toString(), // Convert ObjectId to string
      }));

    return NextResponse.json(
      { message: "تم جلب المستخدمين بنجاح", data: filteredUsers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while fetching users:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
