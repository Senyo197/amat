"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface PatientInformationProps {
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
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PatientInformation({
  formData,
  handleChange,
}: PatientInformationProps) {
  const [patientData, setPatientData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const patientId = searchParams.get("id");

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!patientId) {
        setError("No patient ID provided.");
        setLoading(false);
        return;
      }

      try {
        // Fetch patient data from the backend
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patients/${patientId}`
        );
        const data = response.data;

        // Calculate age based on dob
        if (data?.dob) {
          const today = new Date();
          const dob = new Date(data.dob);
          const age = today.getFullYear() - dob.getFullYear();
          const adjustedAge =
            today.getMonth() > dob.getMonth() ||
            (today.getMonth() === dob.getMonth() &&
              today.getDate() >= dob.getDate())
              ? age
              : age - 1;

          setPatientData({ ...data, age: adjustedAge });
        } else {
          setPatientData(data);
        }
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to fetch patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const inputFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Gender", name: "sex", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phoneNumber", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "Town", name: "town", type: "text" },
    { label: "Country", name: "country", type: "text" },
    { label: "Education", name: "education", type: "text" },
    { label: "Occupation", name: "occupation", type: "text" },
    { label: "Religion", name: "religion", type: "text" },
    { label: "Marital Status", name: "maritalStatus", type: "text" },
    {
      label: "Preexisting Conditions",
      name: "preexisting_conditions",
      type: "text",
    },
    { label: "Current Medications", name: "current_medications", type: "text" },
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
              value={patientData?.[name] || ""}
              readOnly
              className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
