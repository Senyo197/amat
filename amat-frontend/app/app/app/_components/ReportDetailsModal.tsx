"use client";
import { FaTimes } from "react-icons/fa";

interface ReportDetailsType {
  id: string;
  patientName: string;
  date: string;
  reportType: string;
  status: string;
  details: string;
}

interface ReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report?: ReportDetailsType | null;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 md:w-[30rem] lg:w-[36rem] relative">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Report Details
        </h2>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            Report ID: {report.id}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Patient Name: {report.patientName}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Date: {report.date}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Report Type: {report.reportType}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Status: {report.status}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Notes:</p>
          <p className="text-sm text-gray-600">
            {report.details || "No additional notes provided."}
          </p>
        </div>
        <button className="flex justify-center w-full mt-8" onClick={onClose}>
          <FaTimes className="text-gray-600" />
          <span className="ml-2 text-sm text-black font-semibold">Close</span>
        </button>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
