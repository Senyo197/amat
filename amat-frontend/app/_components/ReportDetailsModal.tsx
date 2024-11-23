"use client";
import { useState, useEffect } from "react";
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
  reportId?: string | null;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({
  isOpen,
  onClose,
  reportId,
}) => {
  const [report, setReport] = useState<ReportDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId || !isOpen) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reports/${reportId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch report: ${response.statusText}`);
        }

        const data: ReportDetailsType = await response.json();
        setReport(data);
      } catch (err: any) {
        console.error("Error fetching report:", err);
        setError(err.message || "Failed to load report details.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 md:w-[30rem] lg:w-[36rem] relative">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {loading ? "Loading..." : "Report Details"}
        </h2>

        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : loading ? (
          <p className="text-gray-500 text-sm">Fetching report details...</p>
        ) : report ? (
          <>
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
          </>
        ) : (
          <p className="text-gray-500 text-sm">No report found.</p>
        )}

        <button className="flex justify-center w-full mt-8" onClick={onClose}>
          <FaTimes className="text-gray-600" />
          <span className="ml-2 text-sm text-black font-semibold">Close</span>
        </button>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
