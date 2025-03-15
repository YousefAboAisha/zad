import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const subscriptionsCollection = db.collection("subscriptions");

    // Aggregate to get subscriptions with PENDING status and join user details
    const data = await subscriptionsCollection
      .aggregate([
        {
          $lookup: {
            from: "users", // Join with users collection
            localField: "userId", // Field in subscriptions
            foreignField: "_id", // Field in users
            as: "user", // Store matched user data in "subscriber"
          },
        },
        {
          $unwind: "$user", // Convert array to object (since each subscription has one user)
        },
        {
          $project: {
            _id: 1,
            status: 1,
            subscription_type: 1,
            start_date: 1,
            end_date: 1,
            payment_method: 1,
            notes: 1,
            user: {
              _id: 1,
              name: 1,
              email: 1,
              phone: 1,
              profession: 1,
              phoneNumber: 1,
            }, // Only return needed user fields
          },
        },
      ])
      .toArray();

    console.log("Pending Subscriptions with Subscribers:", data);

    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", data }, // Successfully fetched data
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error fetching pending subscriptions with subscriber data:",
      error
    );
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
