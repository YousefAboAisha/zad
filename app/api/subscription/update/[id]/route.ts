import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import clientPromise from "@/app/lib/mongodb";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    const { id } = context.params;
    const body = await req.json();

    const { subscription_type, start_date, end_date, payment_method, notes } =
      body;

    // Validate required parameters
    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // Ensure ObjectId format is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Construct the update fields dynamically (only include provided values)
    const updateFields: Record<string, unknown> = {};
    if (subscription_type)
      updateFields["active_subscription.subscription_type"] = subscription_type;
    if (start_date) updateFields["active_subscription.start_date"] = start_date;
    if (end_date) updateFields["active_subscription.end_date"] = end_date;
    if (payment_method)
      updateFields["active_subscription.payment_method"] = payment_method;
    if (notes) updateFields["active_subscription.notes"] = notes;

    // Ensure there is something to update
    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    // Update the active subscription details
    const data = await collection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) }, // Find user by ID
      { $set: updateFields }, // Update operation
      { returnDocument: "after" } // Return updated document
    );

    // If user not found
    if (!data) {
      return NextResponse.json(
        { error: "User not found or subscription does not exist" },
        { status: 404 }
      );
    }

    // Log updated user data
    console.log("Updated Subscription:", data);

    // ✅ Return success response
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
