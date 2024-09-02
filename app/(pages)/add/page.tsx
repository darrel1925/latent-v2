"use client";

import { getCurrentTimeMS } from "@/helpers/time";
import { addPatientRecord } from "@/lib/api";
import { PatientRecord, RecordType, recordTypeToLabel } from "@/types";
import { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddRecord() {
  const [patientRecord, setPatientRecord] = useState<Partial<PatientRecord>>({
    recordType: RecordType.PatientVisit,
  });
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex w-full justify-center mx-auto">
      <div className="flex-col space-y-4 w-1/2 justify-center mx-auto">
        <Title />
        <SearchParams patientRecord={patientRecord} setPatientRecord={setPatientRecord} />
        <SubmitButton
          patientRecord={patientRecord}
          setPatientRecord={setPatientRecord}
          setError={setError}
        />
        {error && <ResponseMessage error={error} />}
      </div>
    </div>
  );
}

interface SearchCriteriaProps {
  patientRecord: Partial<PatientRecord>;
  setPatientRecord: React.Dispatch<React.SetStateAction<Partial<PatientRecord>>>;
}

interface SubmitButtonProps {
  patientRecord: Partial<PatientRecord>;
  setPatientRecord: React.Dispatch<React.SetStateAction<Partial<PatientRecord>>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

function ResponseMessage({ error }: { error: string }) {
  if (error === "success") {
    return (
      <div className="w-full mt-4 p-4 text-green-900 bg-green-50 border-2 border-green-400 rounded-lg">
        Patient record added successfully
      </div>
    );
  }
  return (
    <div className="w-full mt-4 p-4 text-red-900 bg-red-50 border-2 border-red-400 rounded-lg">
      Error: {error}
    </div>
  );
}

function Title() {
  return <div className="text-center text-4xl m-12">Add new patient record</div>;
}

function SearchParams({ patientRecord, setPatientRecord }: SearchCriteriaProps) {
  function handleSelectionChange(event: ChangeEvent<HTMLSelectElement>) {
    setPatientRecord((prevRecord) => ({
      ...prevRecord,
      recordType: event.target.value as RecordType,
    }));
  }

  function handlePatientIdChange(event: ChangeEvent<HTMLInputElement>) {
    setPatientRecord((prevRecord) => ({ ...prevRecord, patientId: event.target.value }));
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setPatientRecord((prevRecord) => ({ ...prevRecord, content: event.target.value }));
  }

  return (
    <div className="flex flex-col items-start space-y-4 w-full">
      <input
        type="text"
        onChange={handlePatientIdChange}
        placeholder="Patient ID"
        className="w-full p-2 h-14 border-2 border-gray-200 rounded-xl outline-none"
      />

      <select
        value={patientRecord.recordType}
        onChange={handleSelectionChange}
        className="w-full p-2 h-14 border-2 border-gray-200 rounded-xl outline-none"
      >
        {Object.values(RecordType)
          .filter((type) => type !== RecordType.All) // Filter out RecordType.All
          .map((type) => (
            <option key={type} value={type}>
              {recordTypeToLabel(type)}
            </option>
          ))}
      </select>

      <textarea
        name="content"
        id="content"
        value={patientRecord.content}
        onChange={handleContentChange}
        rows={4}
        className="p-2 w-full border-2 border-gray-200 rounded-xl outline-none"
      ></textarea>
    </div>
  );
}

function SubmitButton({ patientRecord, setPatientRecord, setError }: SubmitButtonProps) {
  async function handleSubmit() {
    if (!patientRecord.patientId) {
      setError("Patient ID is required.");
      return;
    } else if (!patientRecord.content) {
      setError("Content is required.");
      return;
    } else if (!patientRecord.recordType) {
      setError("Record type is required.");
      return;
    }

    const record: PatientRecord = {
      id: uuidv4(),
      patientId: patientRecord.patientId as string,
      recordType: patientRecord.recordType as RecordType,
      uploadedAt: getCurrentTimeMS(),
      content: patientRecord.content as string,
      metadata: {},
    };

    console.log("Adding patient record:", record);

    await addPatientRecord(record)
      .then(() => {
        setError("success");
        setPatientRecord({});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <button onClick={handleSubmit} className="p-2 h-14 w-full rounded-xl bg-blue-500 text-white">
      Submit
    </button>
  );
}
