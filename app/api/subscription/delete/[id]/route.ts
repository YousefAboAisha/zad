import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import clientPromise from "@/app/lib/mongodb";

type Params = Promise<{ id: string }>;

export async function DELETE(
  req: NextRequest,
  { params }: { params: Params } // params is a simple object, not a Promise
) {
  try {
    // Connect to MongoDB client
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    const { id } = await params; // Extract id from params

    // Validate the id parameter
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Ensure ObjectId format is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    // Delete the user's subscription
    const deletedUser = await collection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) }, // Query for user by ID
      { $unset: { active_subscription: "" } }, // Remove the active_subscription field
      { returnDocument: "before" } // Return the deleted document before modification
    );

    // If no user was found
    if (!deletedUser) {
      return NextResponse.json(
        { error: "User not found or no active subscription" },
        { status: 404 }
      );
    }

    // ✅ Return success response with status 200
    return NextResponse.json(
      { success: true, message: "Subscription deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Failed to delete subscription" },
      { status: 500 }
    );
  }
}
