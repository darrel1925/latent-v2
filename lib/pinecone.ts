import { Namespace, PatientRecord, RecordType, SearchCriteria } from "@/types";
import { Index, Pinecone, PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { openai } from "./openai";
import { assert } from "console";
import { getCurrentTimeMS } from "@/helpers/time";

const DIMENSIONS = 1536; // Open AI default size
const METRIC = "cosine"; // Open AI default metric
const INDEX_NAME = process.env.PINECONE_INDEX_NAME || "";
const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";

class PineconeClient {
  private client: Pinecone;
  public index: Index; // Change to private

  constructor() {
    this.client = new Pinecone({
      apiKey: PINECONE_API_KEY,
    });

    // this.createIndex();
    this.index = this.client.index(INDEX_NAME);
  }

  private async createIndex() {
    await this.client.createIndex({
      name: INDEX_NAME,
      dimension: DIMENSIONS,
      metric: METRIC,
      spec: {
        serverless: { cloud: "aws", region: "us-east-1" },
      },
    });
    console.log("Index created successfully");
  }

  async addPatientRecord(record: PatientRecord): Promise<void> {
    const vector: PineconeRecord = {
      id: record.id,
      values: await openai.getEmbedding(record.content),
      metadata: {
        patientId: record.patientId,
        recordType: record.recordType,
        uploadedAt: getCurrentTimeMS(),
        content: record.content,
        ...record.metadata,
      },
    };
    await this.index.namespace(Namespace.PatientRecords).upsert([vector]);
  }

  async searchPatientRecords(criteria: SearchCriteria): Promise<PatientRecord[]> {
    let filter: any = {};

    if (criteria.patientId) filter.patientId = criteria.patientId;
    if (criteria.recordType) filter.recordType = criteria.recordType;

    // Check if the filter object is empty
    if (Object.keys(filter).length === 0) {
      console.log("No filter applied");
      filter = undefined;
    } else {
      console.log("Filter applied:", filter);
    }
    assert(criteria.query, "Diagnosis is required");

    console.log("Searching for records with diagnosis: ", criteria.query);
    const queryVector = await openai.getEmbedding(criteria.query || "");
    const results = await this.index.namespace(Namespace.PatientRecords).query({
      vector: queryVector,
      filter: filter,
      topK: 100,
      includeValues: true,
      includeMetadata: true,
    });

    console.log("Search results:", results.matches.length);

    return results.matches.map((match) => ({
      id: match.id,
      patientId: match.metadata?.patientId as string,
      recordType: match.metadata?.recordType as RecordType,
      uploadedAt: match.metadata?.uploadedAt as number,
      content: match.metadata?.content as string,
      metadata: (match.metadata || {}) as RecordMetadata,
    }));
  }
}

const pinecone = new PineconeClient();
export { pinecone };
