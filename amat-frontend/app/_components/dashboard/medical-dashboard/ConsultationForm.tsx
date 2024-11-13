import { useState } from "react";
import PatientInformation from "./PatientInformation";

export default function MedicalConsultationForm() {
  const [formData, setFormData] = useState({
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [name]: value },
    }));
  };

  return (
    <form className="border border-gray-300 text-black rounded-md p-6 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all">
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

      {/* Vitals */}
      <div>
        <h2 className="font-semibold">Vitals</h2>
        <label className="pl-4">Blood Pressure:</label>
        <input
          type="text"
          name="bp"
          value={formData.vitals.bp}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Height:</label>
        <input
          type="text"
          name="height"
          value={formData.vitals.height}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Weight:</label>
        <input
          type="text"
          name="weight"
          value={formData.vitals.weight}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">BMI:</label>
        <input
          type="text"
          name="bmi"
          value={formData.vitals.bmi}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Temperature:</label>
        <input
          type="text"
          name="temperature"
          value={formData.vitals.temperature}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Pulse:</label>
        <input
          type="text"
          name="pulse"
          value={formData.vitals.pulse}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Heart Rate:</label>
        <input
          type="text"
          name="heartRate"
          value={formData.vitals.heartRate}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Respiration:</label>
        <input
          type="text"
          name="respiration"
          value={formData.vitals.respiration}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">RBS:</label>
        <input
          type="text"
          name="rbs"
          value={formData.vitals.rbs}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">FBS:</label>
        <input
          type="text"
          name="fbs"
          value={formData.vitals.fbs}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Blood Group:</label>
        <input
          type="text"
          name="bloodGroup"
          value={formData.vitals.bloodGroup}
          onChange={handleVitalsChange}
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
        <label className="pl-4">Sickling:</label>
        <input
          type="checkbox"
          name="sickling"
          checked={formData.vitals.sickling}
          onChange={(e) =>
            handleVitalsChange({
              ...e,
              target: {
                ...e.target,
                value: String(e.target.checked),
              },
            })
          }
          className="border border-gray-300 text-black rounded-md p-1 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
        />
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
