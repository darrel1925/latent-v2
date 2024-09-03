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


/* 
Take a large problem and break it down into smaller problems
 - Spec things out into smaller detailed chunks
 - Address it in parts
 - Able to do this across the stack
 - Very useful to go frontend to backend
*/