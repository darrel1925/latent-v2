"use client";
import { getCurrentTimeMS, timeMSToString } from "@/helpers/time";
import { fetchPatientRecords } from "@/lib/api";
import { PatientRecord, RecordType, recordTypeToLabel, SearchCriteria } from "@/types";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function AddNewPatientRecord() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  function setCriteria(newCriteria: Partial<SearchCriteria>) {
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      ...newCriteria,
    }));
  }

  return (
    <div className="flex flex-col items-center space-y-2 w-1/2  mx-auto">
      <Title />
      <SearchBox setCriteria={setCriteria} />
      <SearchParams setCriteria={setCriteria} />
      <SearchButton
        searchCriteria={searchCriteria}
        setRecords={setRecords}
        setIsLoading={setIsLoading}
        setError={setError}
        setHasSearched={setHasSearched}
      />
      <SearchResults
        records={records}
        isLoading={isLoading}
        error={error}
        hasSearched={hasSearched}
      />
    </div>
  );
}

interface SearchCriteriaProps {
  setCriteria: (criteria: Partial<SearchCriteria>) => void;
}

interface SearchButtonProps {
  searchCriteria: SearchCriteria;
  setRecords: (records: PatientRecord[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setHasSearched: (hasSearched: boolean) => void;
}

interface SearchResultsProps {
  records: PatientRecord[];
  isLoading: boolean;
  hasSearched: boolean;
  error?: string | null;
}

function Title() {
  return <div className="text-4xl m-12">Search patient records</div>;
}

function SearchBox({ setCriteria }: SearchCriteriaProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    setCriteria({ query: event.target.value });
  }

  return (
    <div className="flex flex-col items-center w-full">
      <textarea
        ref={textareaRef}
        className="w-full p-2 min-h-[100px] max-h-[250px] border-2 border-gray-200 rounded-xl outline-none resize-none overflow-hidden"
        placeholder="Search for patient records"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

function SearchParams({ setCriteria }: SearchCriteriaProps) {
  const [selectedType, setSelectedType] = useState<string>("All");

  function handleSelectionChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedType(event.target.value);

    // Remove filter if "All" is selected
    if (event.target.value === "all") {
      setCriteria({ recordType: undefined });
      return;
    }
    setCriteria({ recordType: event.target.value as RecordType });
  }

  function handlePatientIdChange(event: ChangeEvent<HTMLInputElement>) {
    setCriteria({ patientId: event.target.value });
  }

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between w-full space-x-4">
        <input
          type="text"
          onChange={handlePatientIdChange}
          placeholder="Patient ID"
          className="w-full p-2 h-14 border-2 border-gray-200 rounded-xl outline-none"
        />
        <select
          value={selectedType}
          onChange={handleSelectionChange}
          className="w-full p-2 h-14 border-2 border-gray-200 rounded-xl outline-none"
        >
          {Object.values(RecordType).map((type) => (
            <option key={type} value={type}>
              {recordTypeToLabel(type)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function SearchButton({
  searchCriteria,
  setRecords,
  setIsLoading,
  setError,
  setHasSearched,
}: SearchButtonProps) {
  async function handleClick() {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    await fetchPatientRecords(
      searchCriteria,
      (records: PatientRecord[]) => {
        setRecords(records);
        setIsLoading(false);
      },
      (errorMessage) => {
        alert(errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    );
  }

  return (
    <button onClick={handleClick} className="w-full h-14 bg-blue-500 text-white p-2 rounded-xl">
      Search
    </button>
  );
}

function SearchResults({ records, isLoading, hasSearched, error }: SearchResultsProps) {
  if (records.length === 0 && hasSearched && !isLoading) {
    error = "No records found. Please try refining your search criteria.";
  }

  if (error) {
    return (
      <div className="w-full mt-4 p-4 text-red-900 bg-red-50 border-2 border-red-400 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {records.map((record: PatientRecord) => (
            <li key={record.id} className="border-2 p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="font-bold">
                  {record.patientId} - {recordTypeToLabel(record.recordType)}
                </span>
                <p className="text-sm text-gray-500">
                  {timeMSToString(record.uploadedAt || getCurrentTimeMS())}
                </p>
              </div>
              <p className="mt-2">{record.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
