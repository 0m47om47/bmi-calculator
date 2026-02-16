import dbConnect from "@/lib/db";
import BMI from "@/models/BMI";
import { getUserFromCookies } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { height, weight, bmi, category } = await req.json();

    if (!height || !weight || !bmi || !category) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    await BMI.create({
      userId: user._id,
      height,
      weight,
      bmi,
      category,
    });

    return NextResponse.json({ message: "BMI saved successfully" });
  } catch (error) {
    console.error("BMI POST ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getUserFromCookies();
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();
    const data = await BMI.find({ userId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(data);
  } catch (error) {
    console.error("BMI GET ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
