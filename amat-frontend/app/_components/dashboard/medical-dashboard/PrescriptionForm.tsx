import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import PatientInformation from "./PatientInformation";

interface Prescription {
  item: string;
  dosage: string;
  quantity: number;
  date: string;
}

interface PrescriptionFormProps {
  appointmentId: string;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  appointmentId,
}) => {
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
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    { item: "", dosage: "", quantity: 0, date: "" },
  ]);

  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingDiagnoses, setIsLoadingDiagnoses] = useState(true);

  // Fetch diagnoses based on appointmentId
  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axios.get(
          `${backendUrl}/api/book-appointment/${appointmentId}/diagnoses`
        );
        console.log("Diagnoses fetched from backend:", response.data);
        setDiagnoses(response.data.diagnoses || []);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
        alert("Failed to fetch diagnoses.");
      } finally {
        setIsLoadingDiagnoses(false);
      }
    };

    if (appointmentId) fetchDiagnoses();
  }, [appointmentId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: string
  ) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index] = {
      ...updatedPrescriptions[index],
      [field]: e.target.value,
    };
    setPrescriptions(updatedPrescriptions);
  };

  const addPrescriptionRow = () => {
    setPrescriptions([
      ...prescriptions,
      { item: "", dosage: "", quantity: 0, date: "" },
    ]);
  };

  const deletePrescriptionRow = (index: number) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updatedPrescriptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("Submitting prescriptions payload:", prescriptions);
      const response = await axios.put(
        `${backendUrl}/api/book-appointment/${appointmentId}`,
        { prescribedMedications: prescriptions }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Prescriptions saved successfully!");
      }
    } catch (error) {
      console.error("Error saving prescriptions:", error);
      alert("Failed to save prescriptions. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      className="border border-gray-300 text-black rounded-md p-6 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-blue-700 font-extrabold text-xl">
          Prescription Form
        </h1>
        <button
          type="submit"
          disabled={isSaving}
          className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
            isSaving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Patient Information Section */}
      <PatientInformation
        formData={formData}
        handleChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
      />

      {/* Diagnoses Section */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2 text-black">Provisional Diagnoses</h2>
        {isLoadingDiagnoses ? (
          <p>Loading diagnoses...</p>
        ) : diagnoses.length > 0 ? (
          <ul className="list-disc pl-6 text-black">
            {diagnoses.map((diagnosis, index) => (
              <li key={index}>{diagnosis}</li>
            ))}
          </ul>
        ) : (
          <p>No diagnoses available.</p>
        )}
      </div>

      {/* Prescriptions Section */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2 text-black">Prescriptions</h2>
        <table className="w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-black text-white">
              <th className="border border-black p-2">Item</th>
              <th className="border border-black p-2">Dosage</th>
              <th className="border border-black p-2">Quantity</th>
              <th className="border border-black p-2">Date</th>
              <th className="border border-black p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index} className="text-black">
                <td className="border border-black p-2">
                  <input
                    type="text"
                    value={prescription.item}
                    onChange={(e) => handleInputChange(e, index, "item")}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="text"
                    value={prescription.dosage}
                    onChange={(e) => handleInputChange(e, index, "dosage")}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="number"
                    value={prescription.quantity}
                    onChange={(e) => handleInputChange(e, index, "quantity")}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    type="date"
                    value={prescription.date}
                    onChange={(e) => handleInputChange(e, index, "date")}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-black p-2 text-center">
                  <button
                    type="button"
                    onClick={() => deletePrescriptionRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={addPrescriptionRow}
          className="mt-4 p-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default PrescriptionForm;
