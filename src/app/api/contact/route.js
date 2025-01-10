import { NextResponse } from "next/server";

export async function POST(req) {
    const { name, email, message } = await req.json()
    return NextResponse.json({ message: "Form submitted successfully!" }, {
      status: 200,
    });
  }