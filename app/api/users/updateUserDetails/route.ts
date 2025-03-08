import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/app/lib/session";

export async function PUT(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("users");

    // Parse request body
    const body = await req.json();
    console.log("Raw Request Body:", body);

    const {
      subscription_id,
      subscription_type,
      start_date,
      end_date,
      payment_method,
      notes,
    } = body;

    const session = await getSession();
    const userId = session?.userId;

    console.log("Customer user ID", userId);

    if (!userId || !subscription_id) {
      return NextResponse.json(
        { error: "المستخدم أو الاشتراك غير موجود" },
        { status: 404 }
      );
    }

    // Convert IDs to ObjectId
    const userIdObject = new ObjectId(userId);
    const subscriptionIdObject = new ObjectId(subscription_id);

    // Find the user
    const existingUser = await collection.findOne({ _id: userIdObject });

    if (!existingUser) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // Find the existing subscription
    let currentType = "";
    const subscriptionArrays = [
      "dailySubscriptions",
      "weeklySubscriptions",
      "monthlySubscriptions",
    ];
    let existingSubscription = null;

    for (const arrayName of subscriptionArrays) {
      const found = existingUser[arrayName]?.find(
        (sub) => sub._id.toString() === subscription_id
      );
      if (found) {
        existingSubscription = found;
        currentType = arrayName;
        break;
      }
    }

    if (!existingSubscription) {
      return NextResponse.json(
        { error: "الاشتراك غير موجود" },
        { status: 404 }
      );
    }

    // Create updated subscription object
    const updatedSubscription = {
      ...existingSubscription,
      subscription_type,
      start_date,
      end_date,
      payment_method,
      notes,
      updatedAt: new Date(),
    };

    // Determine new subscription array
    let newArrayName = "";
    if (subscription_type === "DAILY") newArrayName = "dailySubscriptions";
    else if (subscription_type === "WEEKLY")
      newArrayName = "weeklySubscriptions";
    else if (subscription_type === "MONTHLY")
      newArrayName = "monthlySubscriptions";
    else {
      return NextResponse.json(
        { error: "نوع الاشتراك غير صالح" },
        { status: 400 }
      );
    }

    // Update in database
    const updateQuery: any = {
      $set: { active_subscription: updatedSubscription }, // Update active_subscription
    };

    if (currentType !== newArrayName) {
      updateQuery.$pull = { [currentType]: { _id: subscriptionIdObject } }; // Remove from old array
      updateQuery.$push = { [newArrayName]: updatedSubscription }; // Add to new array
    } else {
      updateQuery.$set[`${newArrayName}.$[elem]`] = updatedSubscription;
    }

    const result = await collection.updateOne(
      { _id: userIdObject },
      updateQuery,
      { arrayFilters: [{ "elem._id": subscriptionIdObject }] } // Ensure correct subscription is updated
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "لم يتم تحديث الاشتراك" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "تم تحديث الاشتراك بنجاح", updatedSubscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while updating subscription:", error);
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}
