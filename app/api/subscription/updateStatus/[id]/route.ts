import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import clientPromise from "@/app/lib/mongodb";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    const { id } = context.params;
    const { status } = await req.json();

    // Validate the parameters
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    // Ensure ObjectId format is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Update the user's subscription status
    const updatedUser = await collection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) }, // Query for user by ID
      { $set: { "active_subscription.status": status } }, // Update operation
      { returnDocument: "after" } // Return the updated document
    );

    // Log the updated user
    console.log("Updated User:", updatedUser);

    // ✅ Return success response with status 200
    return NextResponse.json(
      { success: true, updatedUser: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
