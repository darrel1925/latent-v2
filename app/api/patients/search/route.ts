// /src/app/api/pinecone/route.ts
import { pinecone } from "@/lib/pinecone";
import { SearchCriteria } from "@/types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const criteria: SearchCriteria = await req.json();
    const patientRecords = await pinecone.searchPatientRecords(criteria);
    return NextResponse.json(patientRecords);
  } catch (error) {
    console.error("Error querying Pinecone:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
