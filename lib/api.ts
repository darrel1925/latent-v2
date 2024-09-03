import { SERVER_ROUTE } from "@/constants/routes";
import { PatientRecord, SearchCriteria } from "@/types";

export async function fetchPatientRecords(
  criteria: SearchCriteria,
  onSuccess: (records: PatientRecord[]) => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    const response = await fetch(SERVER_ROUTE.PATIENTS.SEARCH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(criteria),
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch patient records");
    }

    const patientRecords: PatientRecord[] = await response.json();
    onSuccess(patientRecords);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error fetching patient records:", err);
    onError(errorMessage);
  }
}

export async function addPatientRecord(record: PatientRecord): Promise<void> {
  try {
    const response = await fetch(SERVER_ROUTE.PATIENTS.ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error("Failed to add patient record");
    }

    return;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error adding patient record:", err);
    throw err;
  }
}
