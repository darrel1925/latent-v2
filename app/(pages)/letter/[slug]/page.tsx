"use client";

import { CLIENT_ROUTE, SERVER_ROUTE } from "@/constants/routes";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

export default function NecessityLetterDetail({ params }: { params: { slug: string } }) {
  const letter = useSelector((state: RootState) =>
    state.necessityLetter.letters.find((letter) => letter.id === params.slug)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Title />
      <PromptInputSection />
      <LetterDisplay1 />
    </div>
  );
}

function Title() {
  return <div className="text-center text-4xl m-12">Add new patient record</div>;
}

function PromptInputSection() {
  return (
    <div className="w-full max-w-[850px] mx-auto p-6 rounded-xl bg-gray-100 ">
      <div>
        <span>Prompt:</span>
        <br />
        <span className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facilis pariatur suscipit
          temporibus laudantium, corrupti magni quo explicabo aspernatur! Eaque, distinctio! Natus
          rerum sit voluptate placeat hic modi, accusantium aliquam.
        </span>
      </div>
    </div>
  );
}

function LetterDisplay1() {
  const [response, setResponse] = useState("Loading...");
  const [called, setCalled] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleSubmit() {
    setResponse("");

    const res = await fetch(SERVER_ROUTE.LETTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      setResponse("Error occurred while fetching the response.");
      return;
    }
    const data = await res.json();

    setResponse(data.message);
  }

  useEffect(() => {
    if (!called) {
      setCalled(true);
      console.log("calling");
      handleSubmit();
    }
  }, []);

  return (
    <div className="w-full max-w-[850px] mx-auto mt-8 p-8 bg-white border border-gray-300 shadow-lg">
      <div
        className="flex flex-col space-y-4"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(response) }}
      />
    </div>
  );
  return (
    <div className="w-full max-w-[850px] mx-auto mt-8 p-8 bg-white border border-gray-300 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Medical Necessity Letter</h2>
        <p className="text-gray-600">Dr. John Doe, MD</p>
        <p className="text-gray-600">123 Medical Center Drive, Cityville, State 12345</p>
      </div>
      <div className="mb-4">{currentDate}</div>
      <div className="mb-4">
        <p>Dear Insurance Provider,</p>
      </div>
      <div className="mb-4">
        <p>
          This letter is to document the medical necessity of [Treatment/Procedure] for my patient,
          [Patient Name].
        </p>
        <p className="mt-2">
          [Patient Name] has been diagnosed with [Condition] and requires [Treatment/Procedure] to
          [expected outcome/benefit]. Without this treatment, the patient is at risk of [potential
          consequences].
        </p>
        <p className="mt-2">
          Based on my professional medical opinion, I strongly recommend that [Treatment/Procedure]
          be approved for [Patient Name].
        </p>
      </div>
      <div className="mt-8">
        <p>Sincerely,</p>
        <p className="mt-4">Dr. John Doe, MD</p>
      </div>
    </div>
  );
}

function LetterDisplay2() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-[850px] mx-auto mt-8 p-8 bg-white shadow-md">
      <div className="border-l-4 border-blue-500 pl-4 mb-8">
        <h2 className="text-2xl font-light">Medical Necessity Letter</h2>
        <p className="text-gray-600">Dr. John Doe, MD</p>
      </div>
      <div className="text-gray-600 mb-6">{currentDate}</div>
      <div className="space-y-4">
        <p>Dear Insurance Provider,</p>
        <p>
          This letter is to document the medical necessity of [Treatment/Procedure] for my patient,
          [Patient Name].
        </p>
        <p>
          [Patient Name] has been diagnosed with [Condition] and requires [Treatment/Procedure] to
          [expected outcome/benefit]. Without this treatment, the patient is at risk of [potential
          consequences].
        </p>
        <p>
          Based on my professional medical opinion, I strongly recommend that [Treatment/Procedure]
          be approved for [Patient Name].
        </p>
      </div>
      <div className="mt-8">
        <p>Sincerely,</p>
        <div className="mt-4 border-b-2 border-blue-500 w-40"></div>
        <p className="mt-2">Dr. John Doe, MD</p>
      </div>
    </div>
  );
}

function LetterDisplay3() {
  const [letterContent, setLetterContent] = useState({
    patientName: "[Patient Name]",
    condition: "[Condition]",
    treatment: "[Treatment/Procedure]",
    outcome: "[expected outcome/benefit]",
    consequences: "[potential consequences]",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLetterContent({ ...letterContent, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-[850px] mx-auto mt-8 p-8 bg-white border border-gray-300 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Medical Necessity Letter</h2>
        <p className="text-gray-600">Dr. John Doe, MD</p>
      </div>
      <div className="mb-4">{new Date().toLocaleDateString()}</div>
      <div className="mb-4">
        <p>Dear Insurance Provider,</p>
      </div>
      <div className="space-y-4">
        <p>
          This letter is to document the medical necessity of
          <input
            type="text"
            name="treatment"
            value={letterContent.treatment}
            onChange={handleChange}
            className="mx-1 px-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          for my patient,
          <input
            type="text"
            name="patientName"
            value={letterContent.patientName}
            onChange={handleChange}
            className="mx-1 px-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          .
        </p>
        <p>
          {letterContent.patientName} has been diagnosed with
          <input
            type="text"
            name="condition"
            value={letterContent.condition}
            onChange={handleChange}
            className="mx-1 px-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          and requires {letterContent.treatment} to
          <input
            type="text"
            name="outcome"
            value={letterContent.outcome}
            onChange={handleChange}
            className="mx-1 px-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          . Without this treatment, the patient is at risk of
          <input
            type="text"
            name="consequences"
            value={letterContent.consequences}
            onChange={handleChange}
            className="mx-1 px-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          .
        </p>
        <p>
          Based on my professional medical opinion, I strongly recommend that{" "}
          {letterContent.treatment} be approved for {letterContent.patientName}.
        </p>
      </div>
      <div className="mt-8">
        <p>Sincerely,</p>
        <p className="mt-4">Dr. John Doe, MD</p>
      </div>
    </div>
  );
}
