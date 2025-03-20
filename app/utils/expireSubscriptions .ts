import clientPromise from "@/app/lib/mongodb";

export async function expireSubscriptions() {
  try {
    const client = await clientPromise;
    const db = client.db("zad_space");
    const collection = db.collection("subscriptions");

    const now = new Date();

    // Expire "DAILY" subscriptions that should have ended today
    const dailyResult = await collection.updateMany(
      {
        type: "DAILY",
        status: "ACTIVE",
        createdAt: { $lt: new Date(now.setHours(0, 0, 0, 0)) }, // Before today
      },
      { $set: { status: "EXPIRED" } }
    );

    // Expire "WEEKLY" & "MONTHLY" subscriptions that have passed their end_date
    const periodicalResult = await collection.updateMany(
      {
        type: { $in: ["WEEKLY", "MONTHLY"] },
        status: "ACTIVE",
        end_date: { $lt: new Date() }, // If end_date is in the past
      },
      { $set: { status: "EXPIRED" } }
    );

    console.log(
      `Expired ${dailyResult.modifiedCount} daily subscriptions, and ${periodicalResult.modifiedCount} weekly/monthly subscriptions.`
    );
  } catch (error) {
    console.error("Error expiring subscriptions:", error);
  }
}
