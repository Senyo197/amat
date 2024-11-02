"use client";
import { useState, FC } from "react";
import DashboardNavbar from "@/app/_components/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/MedicalDashboardSidebar";
import { FaUser, FaUserMd, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import AddDoctorModal from "./AddDoctorModal"; // Import the modal component

export default function DoctorsPage() {
  const medicalprofessional = {
    fullName: "Dr. John Doe",
    initials: "DJD",
    profession: "Hospital Administrator",
  };

  const doctors = [
    {
      id: "D001",
      name: "Dr. Stella Johnson",
      specialty: "Cardiology",
      patients: 120,
    },
    {
      id: "D002",
      name: "Dr. Emma Brown",
      specialty: "Dermatology",
      patients: 95,
    },
    // Add more doctors as needed
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDoctor = async (doctorDetails: any) => {
    // Call your API to add the new doctor and send an email
    const response = await fetch("/api/addDoctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorDetails),
    });

    if (!response.ok) {
      console.error("Error adding doctor");
    } else {
      console.log("Doctor added successfully!");
      // Optionally, you could refresh the doctors list or handle state updates here
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <MedicalDashboardSidebar medicalprofessional={medicalprofessional} />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar />
        </div>
        <div className="flex flex-col mt-4 mx-4">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Doctors Management
          </h2>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              <FaPlus className="mr-1" /> Add New Doctor
            </button>
          </div>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Doctor ID
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Name
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Specialty
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Patients Treated
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="text-left">
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {doctor.id}
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://randomuser.me/api/portraits/women/3.jpg"
                        alt="Dr. Stella"
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <span className="font-semibold">{doctor.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {doctor.specialty}
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {doctor.patients}
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    <button className="text-blue-600 hover:underline mr-3">
                      <FaEdit /> Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding a New Doctor */}
      <AddDoctorModal
      // isOpen={isModalOpen}
      // onClose={() => setIsModalOpen(false)}
      // onSubmit={handleAddDoctor}
      />
    </div>
  );
}
