"use client";
import { useState } from "react";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/dashboard/MedicalDashboardSidebar";
import AddReportModal from "@/app/_components/AddReportModal";
import ReportDetailsModal from "@/app/_components/ReportDetailsModal";
import { FaEye } from "react-icons/fa";

type ReportDetailsType = {
  id: string;
  patientName: string;
  date: string;
  reportType: string;
  status: string;
  details: string;
};

const LabReportsPage = () => {
  const medicalprofessional = {
    fullName: "Dr. John Doe",
    initials: "DJD",
    profession: "Hospital Administrator",
  };

  const initialReports: ReportDetailsType[] = [
    {
      id: "R001",
      patientName: "John Smith",
      date: "2024-10-01",
      reportType: "Blood Test",
      status: "Completed",
      details: "Normal results.",
    },
    {
      id: "R002",
      patientName: "Jane Doe",
      date: "2024-10-05",
      reportType: "X-Ray",
      status: "Pending",
      details: "Awaiting analysis.",
    },
  ];

  const [reports, setReports] = useState(initialReports);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] =
    useState<ReportDetailsType | null>(null);

  const handleAddReport = async (reportData: Omit<ReportDetailsType, "id">) => {
    const newReport = { id: `R00${reports.length + 1}`, ...reportData };
    setReports([...reports, newReport]);
    setIsAddModalOpen(false);
  };

  function handleViewDetails(report: ReportDetailsType): void {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <MedicalDashboardSidebar medicalprofessional={medicalprofessional} />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar toggleMenu={() => {}} />
        </div>
        <div className="flex flex-col mt-4 mx-4">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Lab Reports Management
          </h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Upload New Report
            </button>
          </div>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Report ID
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Patient Name
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Date
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Report Type
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Status
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20 text-center">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-200">
                  <td className="py-2 px-4 text-sm text-black whitespace-nowrap">
                    {report.id}
                  </td>
                  <td className="py-2 px-4 text-sm text-black whitespace-nowrap">
                    {report.patientName}
                  </td>
                  <td className="py-2 px-4 text-sm text-black whitespace-nowrap">
                    {report.date}
                  </td>
                  <td className="py-2 px-4 text-sm text-black whitespace-nowrap">
                    {report.reportType}
                  </td>
                  <td className="py-2 px-4 text-sm text-black whitespace-nowrap">
                    {report.status}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button onClick={() => handleViewDetails(report)}>
                      <FaEye className="text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddReportModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddReport}
      />
      <ReportDetailsModal
        report={selectedReport}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};

export default LabReportsPage;
