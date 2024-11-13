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
    // Extract query parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const patientId = searchParams.get("id");

    if (patientId) {
      // Find the patient based on the `id` from mock data
      const patient = patients.find((p) => p.id === patientId);
      setPatientData(patient || null);
      console.log(patient);
    }
  }, [window.location.search]);

  return (
    <div className="text-black">
      <h2 className="font-semibold">Patient Information</h2>
      <label className="pl-4">Date of Visit:</label>
      <input
        type="date"
        name="date"
        value={patientData?.date || formData.date}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Time of Visit:</label>
      <input
        type="time"
        name="time"
        value={patientData?.time || formData.time}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Town:</label>
      <input
        type="text"
        name="town"
        value={patientData?.town || formData.town}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Name:</label>
      <input
        type="text"
        name="name"
        value={patientData?.name || formData.name}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Age:</label>
      <input
        type="number"
        name="age"
        value={patientData?.age || formData.age}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Sex:</label>
      <input
        type="text"
        name="sex"
        value={patientData?.sex || formData.sex}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Education:</label>
      <input
        type="text"
        name="education"
        value={patientData?.education || formData.education}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Occupation:</label>
      <input
        type="text"
        name="occupation"
        value={patientData?.occupation || formData.occupation}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Religion:</label>
      <input
        type="text"
        name="religion"
        value={patientData?.religion || formData.religion}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
      <label className="pl-4">Marital Status:</label>
      <input
        type="text"
        name="maritalStatus"
        value={patientData?.maritalStatus || formData.maritalStatus}
        onChange={handleChange}
        className="mt-1 border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      />
    </div>
  );
}
