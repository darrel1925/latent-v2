import { pinecone } from "@/lib/pinecone";
import { PatientRecord } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const newRecord: PatientRecord = await req.json();
    await pinecone.addPatientRecord(newRecord);
    return NextResponse.json({ message: "Patient record added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding patient record:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "GET request received" });
}
