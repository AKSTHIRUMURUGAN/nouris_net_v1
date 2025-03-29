import connectDB from "../../libs/mongodb";
import User from "../../models/userModel";
import { NextResponse } from "next/server";

// Check if a user exists by Clerk ID
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    await connectDB();
    const user = await User.findOne({ clerkId });

    if (user) {
      return NextResponse.json({ exists: true, user }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ message: "Error checking user", error }, { status: 500 });
  }
}
