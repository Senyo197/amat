import React, { useState, useEffect } from "react";
import { patients } from "@/app/_data/mockData";

type PatientInformationProps = {
  formData: {
    date: string;
    time: string;
    town: string;
    name: string;
    insured: boolean;
    age: string;
    sex: string;
    education: string;
    occupation: string;
    religion: string;
    maritalStatus: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function PatientInformation({
  formData,
  handleChange,
}: PatientInformationProps) {
  const [patientData, setPatientData] = useState<any | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const patientId = searchParams.get("id");

    if (patientId) {
      const patient = patients.find((p) => p.id === patientId);
      setPatientData(patient || null);
      console.log(patient);
    }
  }, [window.location.search]);

  const inputFields: Array<{
    label: string;
    name: keyof PatientInformationProps["formData"];
    type: string;
  }> = [
    { label: "Date of Visit", name: "date", type: "date" },
    { label: "Time of Visit", name: "time", type: "time" },
    { label: "Town", name: "town", type: "text" },
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Sex", name: "sex", type: "text" },
    { label: "Education", name: "education", type: "text" },
    { label: "Occupation", name: "occupation", type: "text" },
    { label: "Religion", name: "religion", type: "text" },
    { label: "Marital Status", name: "maritalStatus", type: "text" },
  ];

  return (
    <div className="text-black">
      <h2 className="font-semibold text-lg mb-4">Patient Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {inputFields.map(({ label, name, type }) => (
          <div key={name}>
            <label className="pl-4">{label}:</label>
            <input
              type={type}
              name={name}
              value={patientData?.[name] || formData[name]}
              readOnly
              className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
