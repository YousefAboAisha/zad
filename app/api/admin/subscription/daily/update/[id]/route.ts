import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { SubscriptionStatus } from "@/app/enums";
import { ObjectId } from "mongodb";

type Params = Promise<{ id: string }>;

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const subscriptionsCollection = db.collection("subscriptions");

    // Extract the id from params and the status from the body
    const { id } = await params; // Extract id from params
    const { status } = await req.json();

    console.error("[SUB ID from Params]: ", id);

    // Validate status
    if (
      ![
        SubscriptionStatus.EXPIRED,
        SubscriptionStatus.PENDING,
        SubscriptionStatus.ACTIVE,
      ].includes(status)
    ) {
      return NextResponse.json(
        { error: "حالة الاشتراك غير صالحة" }, // Invalid subscription status
        { status: 400 }
      );
    }

    // Validate subscriptionId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "معرف الاشتراك غير صالح" }, // Invalid subscription ID
        { status: 400 }
      );
    }

    // Convert subscriptionId to ObjectId
    const subscriptionIdObject = new ObjectId(id);

    // Find the subscription by its ID
    const subscription = await subscriptionsCollection.findOne({
      _id: subscriptionIdObject,
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "الاشتراك غير موجود" }, // Subscription not found
        { status: 404 }
      );
    }

    // If the status is set to EXPIRED, calculate the price and set the end_date
    let price = subscription.price; // Default price if not "EXPIRED"
    let endDate = subscription.end_date; // Keep the existing end date by default
    if (status === SubscriptionStatus.EXPIRED) {
      const startDate = new Date(subscription.start_date);
      endDate = new Date(); // Set current date as the end_date

      // Calculate the duration in hours
      const durationInHours =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600); // Convert ms to hours

      // Calculate price: 5 ILS per hour
      price = (durationInHours * 5).toFixed(2);
    }

    // Update the subscription status, price, and end_date
    const result = await subscriptionsCollection.updateOne(
      { _id: subscriptionIdObject }, // Find the subscription by its ID
      {
        $set: {
          status: status,
          price: price,
          end_date: endDate,
        },
      }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "فشل تحديث حالة الاشتراك" }, // Failed to update subscription status
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "تم تحديث حالة الاشتراك بنجاح" }, // Subscription status updated successfully
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while updating subscription status:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
