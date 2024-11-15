"use client";

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { patients } from "@/app/_data/mockData";

type ViewPatientSidebarProps = {
  activeRoute: string;
  onRouteChange: (route: string) => void;
};

const OpenIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 4l8 8-8 8" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 4l-8 8 8 8" />
  </svg>
);

const ViewPatientSidebar: React.FC<ViewPatientSidebarProps> = ({
  activeRoute,
  onRouteChange,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [patient, setPatient] = useState<{
    name: string;
    photo?: string;
  } | null>(null);

  const routes = [
    "Patient History",
    "Consult Patient",
    "Prescribe Medication",
    "Scan/X-Ray/Lab Report",
    "Refer Patient",
  ];

  useEffect(() => {
    // Extract query parameters from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const patientId = searchParams.get("id");

    if (patientId) {
      const patientData = patients.find((p) => p.id === patientId);
      setPatient(patientData || null);
    }
  }, []);

  return (
    <div className="min-h-screen h-full flex flex-col md:flex-row bg-gray-100">
      {/* Toggle Button for Small Screens */}
      <div className="md:hidden p-4 bg-gray-100">
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="text-black bg-gray-200 p-2 rounded-md hover:bg-gray-300"
        >
          {isMenuOpen ? <CloseIcon /> : <OpenIcon />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`absolute md:relative z-10 bg-gray-100 p-4 shadow-lg transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 min-h-screen`} // min-h-screen for full height
      >
        {/* Patient's Profile Section */}
        {patient && (
          <div className="flex flex-col items-center space-y-2 mb-16 p-6">
            {patient.photo ? (
              <img
                src={patient.photo}
                alt="Patient Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-16 h-16 text-gray-400" />
            )}
            <div>
              <h3 className="font-semibold text-lg text-black">
                {patient.name}
              </h3>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <ul className="space-y-2">
          {routes.map((route) => (
            <li key={route}>
              <button
                onClick={() => {
                  onRouteChange(route);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeRoute === route
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {route}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewPatientSidebar;
