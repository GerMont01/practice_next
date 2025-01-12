import { NextResponse } from "next/server";

export async function POST(req) {
    const { name, email, message } = await req.json()
    return NextResponse.json({ message: "Thank you for contacting us we will be in touch shortly" }, {
      status: 200,
    });
  }