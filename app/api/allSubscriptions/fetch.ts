import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Check if the customer exists
    const subscription = await collection.findOne();

    if (!subscription) {
      // If the customer does not exist, return an error
      return NextResponse.json(
        { error: "الاشتراك غير موجود" }, // User not found
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "تم جلب البيانات بنجاح", subscription }, // Data fetched successfully
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during fetching user details", error);
    return NextResponse.json(
      { error: "خطأ في الخادم" }, // Server error
      { status: 500 }
    );
  }
}
