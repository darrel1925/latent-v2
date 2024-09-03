"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NecessityLetterForm() {
  const [patientId, setPatientId] = useState("");
  const [letterDescription, setLetterDescription] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      <Title />

      <div className="flex flex-col space-y-4 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PatientIdSection setPatientId={setPatientId} />
        <LetterDescriptionSection setLetterDescription={setLetterDescription} />
        <GenerateLetterButton patientId={patientId} letterDescription={letterDescription} />
      </div>
    </div>
  );
}

interface PatientIdSectionProps {
  setPatientId: (patientId: string) => void;
}

interface LetterDescriptionSectionProps {
  setLetterDescription: (letterDescription: string) => void;
}

interface GenerateLetterButtonProps {
  patientId: string;
  letterDescription: string;
}

function Title() {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-medium text-gray-900">Generate Necessity Letter</h1>
      </div>
    </div>
  );
}

function PatientIdSection({ setPatientId }: PatientIdSectionProps) {
  function handlePatientIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setPatientId(event.target.value);
  }

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <span className="block text-sm font-medium text-gray-700">Patient ID</span>
      <input
        type="text"
        onChange={handlePatientIdChange}
        placeholder="Patient ID"
        className="w-full p-2 h-14 border-2 border-gray-200 rounded-xl outline-none"
      />
    </div>
  );
}

function LetterDescriptionSection({ setLetterDescription }: LetterDescriptionSectionProps) {
  function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(event.target.value);
    setLetterDescription(event.target.value);
  }

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <span className="block text-sm font-medium text-gray-700">Letter description</span>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          className="w-full p-2 min-h-[100px] max-h-[250px] border-2 border-gray-200 rounded-xl outline-none resize-none overflow-hidden"
          placeholder="Search for patient records"
          rows={7}
          onChange={handleOnChange}
        />
        <p className="mt-2 text-sm text-gray-500">
          Write a brief description of what should be included in the letter.
        </p>
      </div>
    </div>
  );
}

function GenerateLetterButton({ patientId, letterDescription }: GenerateLetterButtonProps) {
  const router = useRouter();

  function handleOnClick() {
    console.log("Generating letter for patient ID", patientId);
    console.log("Letter description", letterDescription || "No description provided");
    router.push("/letter/letterID");
  }
  return (
    <div className="pt-5">
      <div className="flex justify-end">
        <button
          onClick={handleOnClick}
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Letter
        </button>
      </div>
    </div>
  );
}
