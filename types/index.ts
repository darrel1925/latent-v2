import { RecordMetadata } from "@pinecone-database/pinecone";

export interface PatientRecord {
  content: string;
  id: string;
  metadata: RecordMetadata;
  patientId: string;
  recordType: RecordType;
  uploadedAt: number;
}

export interface SearchCriteria {
  patientId?: string;
  recordType?: RecordType;
  startDate?: string;
  endDate?: string;
  query?: string;
}

export enum Namespace {
  PatientRecords = "ehr-patient-records",
}

export enum RecordType {
  All = "all",
  PatientVisit = "patientVisit",
  MriResult = "mriResult",
  LabReport = "labReport",
  TreatmentPlan = "treatmentPlan",
}

export function recordTypeToLabel(type: string) {
  switch (type) {
    case RecordType.PatientVisit:
      return "Patient Visit";
    case RecordType.LabReport:
      return "Lab Report";
    case RecordType.MriResult:
      return "MRI Result";
    case RecordType.TreatmentPlan:
      return "Treatment Plan";
    case RecordType.All:
      return "All";
    default:
      return type;
  }
}


export interface NecessityLetter {
  id: string;
  patientId: string;
  content: string;
  uploadedAt: number;
  prompt: string;
}