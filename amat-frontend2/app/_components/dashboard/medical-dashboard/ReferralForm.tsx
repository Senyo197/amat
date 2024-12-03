import React, { useState } from "react";
import PatientInformation from "./PatientInformation";

interface FormData {
  doctor: string;
  referredToLab: boolean;
  testType: string;
  testResults: string;
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
  medicalNote: string;
}

const ReferralForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    doctor: "",
    referredToLab: false,
    testType: "",
    testResults: "",
    date: "",
    time: "",
    town: "",
    name: "",
    insured: false,
    age: "",
    sex: "",
    education: "",
    occupation: "",
    religion: "",
    maritalStatus: "",
    medicalNote: "",
  });

  const handleReferralChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const diagnoses = ["Atrial Septal Defect", "Ventricular Septal Defect"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 text-black rounded-md p-6 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-blue-700 font-extrabold text-xl">Refer Patient</h1>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Save
        </button>
      </div>

      <div className="p-4 border border-gray-300 rounded-md text-black space-y-4">
        {/* Patient Information Section */}
        <PatientInformation
          formData={formData}
          handleChange={handleReferralChange}
        />

        {/* Diagnoses Section */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2 text-black">
            Provisional Diagnoses
          </h2>
          <ul className="list-disc pl-6 text-black">
            {diagnoses.map((diagnosis, index) => (
              <li key={index}>{diagnosis}</li>
            ))}
          </ul>
        </div>

        {/* Doctor's Name */}
        <div>
          <label
            htmlFor="doctor"
            className="block text-sm font-semibold text-gray-700"
          >
            Doctor's name:
          </label>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleReferralChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
            required
          />
        </div>

        {/* Medical Note */}
        <div>
          <label
            htmlFor="medicalNote"
            className="block text-sm font-semibold text-gray-700"
          >
            Medical Note:
          </label>
          <textarea
            name="medicalNote"
            value={formData.medicalNote}
            onChange={handleReferralChange}
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
          />
        </div>
      </div>
    </form>
  );
};

export default ReferralForm;
