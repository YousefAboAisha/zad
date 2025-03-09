import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    // Find users who have daily subscriptions
    const users = await collection
      .find({ dailySubscriptions: { $exists: true, $ne: [] } })
      .toArray();

    // Extract dailySubscriptions that match today's date and append the subscriber's name
    const dailySubscriptionsForToday = users.flatMap((user) =>
      user.dailySubscriptions
        .filter((sub) => {
          const subDate = new Date(sub.start_date);
          return (
            subDate.getFullYear() === today.getFullYear() &&
            subDate.getMonth() === today.getMonth() &&
            subDate.getDate() === today.getDate()
          );
        })
        .map((sub) => ({
          _id: sub._id,
          subscription_type: sub.subscription_type,
          start_date: sub.start_date,
          end_date: sub.end_date,
          payment_method: sub.payment_method,
          notes: sub.notes,
          status: sub.status,
          name: user.name,
          phoneNumber: user.phoneNumber, // Append subscriber's name
          price: 0,
        }))
    );

    console.log("Daily Subscriptions for Today:", dailySubscriptionsForToday);

    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", data: dailySubscriptionsForToday },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching daily subscriptions for today:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
