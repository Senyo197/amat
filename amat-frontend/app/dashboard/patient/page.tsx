"use client";

import React, { useState } from "react";
import ViewPatientSidebar from "@/app/_components/dashboard/medical-dashboard/ViewPatientSidebar";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import PrescriptionForm from "@/app/_components/dashboard/medical-dashboard/PrescriptionForm";
import ConsultationForm from "@/app/_components/dashboard/medical-dashboard/ConsultationForm";
import ReferralForm from "@/app/_components/dashboard/medical-dashboard/ReferralForm";
import AddReportModal from "@/app/_components/AddReportModal";

type ReportDetailsType = {
  id: string;
};

const ViewPatient: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState("Patient History");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);

  const handleModalSubmit = async (
    reportData: Omit<ReportDetailsType, "id">
  ): Promise<void> => {
    try {
      console.log("Submitted report data:", reportData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  const renderContent = () => {
    switch (activeRoute) {
      case "Patient History":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-black">
              Patient History
            </h2>
            <p className="text-gray-700 mt-4">
              This section contains the patient's historical medical records,
              appointments, and other details.
            </p>
          </div>
        );
      case "Consult Patient":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-black">
              Consult Patient
            </h2>
            <ConsultationForm />
          </div>
        );
      case "Prescribe Medication":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-black">
              Prescribe Medication
            </h2>
            <PrescriptionForm />
          </div>
        );
      case "Scan/X-Ray/Lab Report":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-black">
              Scan/X-Ray/Lab Report
            </h2>
            <AddReportModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)} // Handle modal close here
              onSubmit={handleModalSubmit} // Optional: Handle form submission
            />
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => setModalOpen(true)}
            >
              Add new report
            </button>
          </div>
        );
      case "Refer Patient":
        return (
          <div>
            <h2 className="text-2xl font-semibold text-black">Refer Patient</h2>
            <ReferralForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <ViewPatientSidebar
        activeRoute={activeRoute}
        onRouteChange={setActiveRoute}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar />
        </div>

        {/* Content Area */}
        <div className=" bg-gray-50 p-6 rounded-md shadow-lg">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
