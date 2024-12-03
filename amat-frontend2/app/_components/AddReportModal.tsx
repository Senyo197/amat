"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ReportDetailsType {
  id: string;
  patientName: string;
  date: string;
  reportType: string;
  status: string;
  details: string;
}

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: Omit<ReportDetailsType, "id">) => Promise<void>;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reportDetails, setReportDetails] = useState<
    Omit<ReportDetailsType, "id">
  >({
    patientName: "",
    date: "",
    reportType: "",
    status: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setReportDetails({ ...reportDetails, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(reportDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 md:w-[30rem] lg:w-[36rem] relative">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Upload New Lab Report
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={reportDetails.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="mt-1 block w-full border border-gray-300 text-black rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-black font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={reportDetails.date}
              onChange={handleChange}
              placeholder="Select date"
              className="mt-1 block w-full border border-gray-300 text-black rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">
              Report Type
            </label>
            <input
              type="text"
              name="reportType"
              value={reportDetails.reportType}
              onChange={handleChange}
              placeholder="Enter report type (e.g., X-ray, Blood Test)"
              className="mt-1 block w-full border border-gray-300 text-black rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">
              Status
            </label>
            <select
              name="status"
              value={reportDetails.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 text-black rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black">
              Notes
            </label>
            <textarea
              name="details"
              value={reportDetails.details}
              onChange={handleChange}
              placeholder="Add any additional notes here"
              className="mt-1 block w-full border border-gray-300 text-black rounded-md p-2 hover:border-blue-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Upload Report
          </button>
        </form>
        <button className="flex justify-center w-full mt-8" onClick={onClose}>
          <FaTimes className="text-gray-600" />
          <span className="ml-2 text-sm text-black font-semibold">Close</span>
        </button>
      </div>
    </div>
  );
};

export default AddReportModal;
