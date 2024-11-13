"use client";

import React, { useEffect, useState } from "react"; // Import useEffect and useState
import PatientInformation from "./PatientInformation";
import { patients } from "@/app/_data/mockData";

type PatientHistoryProps = {
  patient: {
    name: string;
    dob: string;
    gender: string;
    contact: string;
    primaryDiagnosis: string;
    pastConditions: string[];
    allergies: string[];
    medications: string[];
    visits: {
      date: string;
      type: string;
      doctor: string;
      notes: string;
    }[];
  };
};

const PatientHistory: React.FC<PatientHistoryProps> = ({ patient }) => {
  const [patientData, setPatient] = useState<
    PatientHistoryProps["patient"] | null
  >(null);

  useEffect(() => {
    // Extract query parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const patientId = searchParams.get("id");

    if (patientId) {
      const patientData = patients.find((p) => p.id === patientId);
      setPatient(patientData || null);
    }
  }, []); // This will only run once, on component mount

  if (!patientData) {
    return <div>Loading...</div>; // Handle case when patientData is not available yet
  }

  return (
    <div className="space-y-6 p-6">
      {/* Patient Information Section */}
      <PatientInformation formData={patientData} handleChange={() => {}} />

      {/* Medical Summary */}
      <div className="border-b border-gray-300 pb-4">
        <h2 className="font-semibold text-xl">Medical Summary</h2>
        <p>
          <strong>Primary Diagnosis:</strong> {patientData.primaryDiagnosis}
        </p>
        <p>
          <strong>Past Conditions:</strong>{" "}
          {patientData.pastConditions.join(", ")}
        </p>
        <p>
          <strong>Allergies:</strong> {patientData.allergies.join(", ")}
        </p>
      </div>

      {/* Medications */}
      <div className="border-b border-gray-300 pb-4">
        <h2 className="font-semibold text-xl">Medications</h2>
        <ul className="list-disc pl-6">
          {patientData.medications.map((medication, index) => (
            <li key={index}>{medication}</li>
          ))}
        </ul>
      </div>

      {/* Visit History */}
      <div className="border-b border-gray-300 pb-4">
        <h2 className="font-semibold text-xl">Visit History</h2>
        {patientData.visits.map((visit, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>Date:</strong> {visit.date}
            </p>
            <p>
              <strong>Visit Type:</strong> {visit.type}
            </p>
            <p>
              <strong>Doctor:</strong> {visit.doctor}
            </p>
            <p>
              <strong>Notes:</strong> {visit.notes}
            </p>
          </div>
        ))}
      </div>

      {/* Optional: Vaccination History */}
      {/* Add another section for vaccination history */}
    </div>
  );
};

export default PatientHistory;
