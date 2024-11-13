import { useState } from "react";

export default function ImagingForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    imagingType: "",
    dateOfScan: "",
    bodyPart: "",
    scanDetails: "",
    radiologistNotes: "",
    uploadFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, uploadFile: e.target.files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-blue-600">
        Imaging Procedure Form
      </h1>

      {/* Patient Name */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Patient Name
        </label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter patient name"
          required
        />
      </div>

      {/* Imaging Type */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Imaging Type
        </label>
        <select
          name="imagingType"
          value={formData.imagingType}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled>
            Select an imaging type
          </option>
          <option value="X-ray">X-ray</option>
          <option value="MRI">MRI</option>
          <option value="CT Scan">CT Scan</option>
        </select>
      </div>

      {/* Date of Scan */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Date of Scan
        </label>
        <input
          type="date"
          name="dateOfScan"
          value={formData.dateOfScan}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Body Part */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Body Part Scanned
        </label>
        <input
          type="text"
          name="bodyPart"
          value={formData.bodyPart}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Chest, Brain, Abdomen"
          required
        />
      </div>

      {/* Scan Details */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Scan Details
        </label>
        <textarea
          name="scanDetails"
          value={formData.scanDetails}
          onChange={handleChange}
          rows={3}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Provide details about the scan"
          required
        />
      </div>

      {/* Radiologist Notes */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Radiologist Notes
        </label>
        <textarea
          name="radiologistNotes"
          value={formData.radiologistNotes}
          onChange={handleChange}
          rows={3}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Notes or observations by the radiologist"
        />
      </div>

      {/* Upload File */}
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-1">
          Upload Scan File
        </label>
        <input
          type="file"
          name="uploadFile"
          onChange={handleFileChange}
          className="w-full text-gray-500 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
