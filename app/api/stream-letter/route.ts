import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  // const { prompt } = await req.json();

  const resp = await openai.getResponse("prompt");
  console.log("resp -->");
  return NextResponse.json({ message: resp });
}

export async function GET() {
  return NextResponse.json({ message: "GET request received" });
}
