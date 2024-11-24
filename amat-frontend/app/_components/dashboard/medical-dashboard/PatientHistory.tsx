"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientInformation from "./PatientInformation";

type Appointment = {
  visitNumber: number;
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
  appointments: Appointment[];
};

const PatientHistory: React.FC = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const patientId = searchParams.get("id");

      if (!patientId) {
        setError("No patient ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/api/book-appointments/history/${patientId}`
        );
        const data = response.data;

        setPatientData({
          id: patientId,
          name: "Patient Name",
          dob: "Patient DOB",
          gender: "Patient Gender",
          contact: "Patient Contact",
          primaryDiagnosis: "",
          pastConditions: [],
          allergies: [],
          medications: [],
          appointments: data,
        });
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch patient history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHistory();
  }, []);

  if (loading) {
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

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">
          No patient history found.
        </p>
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

      {/* Appointment History */}
      <div className="border-b border-gray-300 pb-4">
        <h2 className="font-semibold text-xl">Appointment History</h2>
        {patientData.appointments.map((appointment: Appointment) => (
          <div key={appointment.visitNumber} className="mb-4">
            <p>
              <strong>Visit Number:</strong> {appointment.visitNumber}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Appointment Type:</strong> {appointment.type}
            </p>
            <p>
              <strong>Doctor:</strong> {appointment.doctor}
            </p>
            <p>
              <strong>Diagnosis:</strong> {appointment.diagnosis}
            </p>
            <p>
              <strong>Medications Prescribed:</strong>
              <ul className="list-disc pl-6">
                {appointment.medicationPrescribed.map((medication, index) => (
                  <li key={index}>{medication}</li>
                ))}
              </ul>
            </p>
            <p>
              <strong>Notes:</strong> {appointment.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
