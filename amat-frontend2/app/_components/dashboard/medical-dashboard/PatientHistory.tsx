"use client";

import React, { useEffect, useState } from "react";
import PatientInformation from "./PatientInformation";
import { patients } from "@/app/_data/mockData";

type Visit = {
  date: string;
  type: string;
  doctor: string;
  diagnosis: string;
  medicationPrescribed: string[];
  notes: string;
};

type Patient = {
  id: string;
  name: string;
  dob: string;
  gender: string;
  contact: string;
  primaryDiagnosis: string;
  pastConditions: string[];
  allergies: string[];
  medications: string[];
  visits: Visit[];
};

const PatientHistory: React.FC = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const patientId = searchParams.get("id");

    if (patientId) {
      const patient = patients.find((p) => p.id === patientId) as
        | Patient
        | undefined;
      setPatientData(patient || null);
      console.log(patient);
    }
  }, []);

  if (!patientData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Just a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 text-black">
      {/* Patient Information Section */}
      <PatientInformation
        formData={{
          date: "",
          time: "",
          town: "",
          name: patientData.name,
          insured: false,
          age: "",
          sex: patientData.gender,
          education: "",
          occupation: "",
          religion: "",
          maritalStatus: "",
        }}
        handleChange={() => {}}
      />
      <hr className="my-4 border-t-2 border-gray-300" />

      {/* Visit History */}
      <div className="border-b border-gray-300 pb-4">
        <h2 className="font-semibold text-xl">Appointment History</h2>
        {patientData.visits.map((visit: Visit, index: number) => (
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
              <strong>Diagnosis:</strong> {visit.diagnosis}
            </p>
            <p>
              <strong>Medications Prescribed:</strong>
              <ul className="list-disc pl-6">
                {visit.medicationPrescribed.map((medication, index) => (
                  <li key={index}>{medication}</li>
                ))}
              </ul>
            </p>
            <p>
              <strong>Notes:</strong> {visit.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
