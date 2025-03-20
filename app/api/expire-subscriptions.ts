import { NextResponse } from "next/server";
import { expireSubscriptions } from "../utils/expireSubscriptions ";

export async function GET() {
  await expireSubscriptions();
  return NextResponse.json({ message: "Expired subscriptions updated" });
}
