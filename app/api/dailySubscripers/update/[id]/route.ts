import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import clientPromise from "@/app/lib/mongodb";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const { status, end_date } = await req.json();

    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Validate input parameters
    if (!id || !status || !end_date) {
      return NextResponse.json(
        { error: "Missing id, status, or end_date" },
        { status: 400 }
      );
    }

    // Ensure ObjectId format is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Find user with subscriptions
    const user = await collection.findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { dailySubscriptions: 1 } } // Fetch only dailySubscriptions
    );

    if (!user || !user.dailySubscriptions.length) {
      return NextResponse.json(
        { error: "User not found or no subscriptions available" },
        { status: 404 }
      );
    }

    // Get the most recent subscription (last element)
    const lastSubscriptionIndex = user.dailySubscriptions.length - 1;
    const lastSubscription = user.dailySubscriptions[lastSubscriptionIndex];

    if (!lastSubscription || !lastSubscription.start_date) {
      return NextResponse.json(
        { error: "Invalid subscription data" },
        { status: 400 }
      );
    }

    // Convert start_date and end_date to timestamps
    const startTime = new Date(lastSubscription.start_date).getTime();
    const endTime = new Date(end_date).getTime();

    if (isNaN(startTime) || isNaN(endTime) || endTime <= startTime) {
      return NextResponse.json(
        { error: "Invalid start_date or end_date" },
        { status: 400 }
      );
    }

    // Calculate subscription duration in hours
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    const totalPrice = (durationInHours * 5).toFixed(2); // Round to 2 decimal places and keep it as a string

    // Convert totalPrice back to a number to store in MongoDB
    const price = parseFloat(totalPrice);

    // **✅ Correctly update the last subscription**
    const updatedUser = await collection.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          [`dailySubscriptions.${lastSubscriptionIndex}.status`]: status,
          [`dailySubscriptions.${lastSubscriptionIndex}.end_date`]: end_date,
          [`dailySubscriptions.${lastSubscriptionIndex}.price`]: price,
        },
      },
      {
        returnDocument: "after",
      }
    );

    // ✅ Return success response
    return NextResponse.json(
      { success: true, totalPrice, updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription status" },
      { status: 500 }
    );
  }
}
