import { useState } from "react";
import PatientInformation from "@/app/_components/dashboard/medical-dashboard/PatientInformation";

type Vitals = {
  bp: string;
  height: string;
  weight: string;
  bmi: string;
  temperature: string;
  pulse: string;
  heartRate: string;
  respiration: string;
  rbs: string;
  fbs: string;
  bloodGroup: string;
  sickling: boolean;
};

type FormData = {
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
  vitals: Vitals;
  principalDiagnosis: string;
  additionalInformation: string;
  chronicDiseases: string[];
  typeOfCase: string;
  drugReaction: string;
  outcome: string;
  reviewDate: string;
};

export default function MedicalConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
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
    vitals: {
      bp: "",
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      pulse: "",
      heartRate: "",
      respiration: "",
      rbs: "",
      fbs: "",
      bloodGroup: "",
      sickling: false,
    },
    principalDiagnosis: "",
    additionalInformation: "",
    chronicDiseases: [],
    typeOfCase: "",
    drugReaction: "",
    outcome: "",
    reviewDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVitalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.vitals) {
      setFormData((prev) => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    }
  };

  return (
    <form className="max-w-6xl mx-auto p-6 border border-gray-300 text-black rounded-md hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-blue-700 font-extrabold text-xl">
          Medical Consultation Form
        </h1>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Save
        </button>
      </div>

      {/* Use the PatientInformation component here */}
      <PatientInformation formData={formData} handleChange={handleChange} />
      <hr className="my-4 border-t-2 border-gray-300" />

      {/* Vitals Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Blood Pressure", name: "bp" },
          { label: "Height", name: "height" },
          { label: "Weight", name: "weight" },
          { label: "BMI", name: "bmi" },
          { label: "Temperature", name: "temperature" },
          { label: "Pulse", name: "pulse" },
          { label: "Heart Rate", name: "heartRate" },
          { label: "Respiration", name: "respiration" },
          { label: "RBS", name: "rbs" },
          { label: "FBS", name: "fbs" },
          { label: "Blood Group", name: "bloodGroup" },
        ].map((vital) => (
          <div key={vital.name} className="flex flex-col">
            <label className="pl-4">{vital.label}:</label>
            <input
              type="text"
              name={vital.name}
              value={(formData.vitals as any)[vital.name]} // Access safely
              onChange={handleVitalsChange}
              className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
            />
          </div>
        ))}
        <div className="flex items-center">
          <label className="pl-4">Sickling:</label>
          <input
            type="checkbox"
            name="sickling"
            checked={formData.vitals.sickling}
            onChange={handleVitalsChange}
            className="ml-2"
          />
        </div>
      </div>

      <hr className="my-4 border-t-2 border-gray-300" />

      {/* Principal Diagnosis */}
      <div>
        <h2 className="font-semibold">Diagnosis</h2>
        <label className="pl-4">Principal Diagnosis:</label>
        <textarea
          name="principalDiagnosis"
          value={formData.principalDiagnosis}
          onChange={handleChange}
          className="border w-full border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Additional Information:</label>
        <textarea
          name="additionalInformation"
          value={formData.additionalInformation}
          onChange={handleChange}
          className="border w-full border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
      </div>
    </form>
  );
}
