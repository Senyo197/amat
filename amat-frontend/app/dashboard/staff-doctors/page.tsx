"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/dashboard/MedicalDashboardSidebar";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function DoctorsPage() {
  const medicalprofessional = {
    fullName: "Dr. John Doe",
    initials: "DJD",
    profession: "Hospital Administrator",
  };

  interface Doctor {
    _id: string;
    name: string;
    specializations: string;
    patients?: number;
  }

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-practitioners/medical/doctors`
        );
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []); // Run only once when the component mounts

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
            <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500">
              Add New Doctor
            </button>
          </div>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Doctor ID
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Name
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Specialty
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Patients Treated
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="text-left">
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {doctor._id}
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/3.jpg"
                        alt={doctor.name}
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <span className="font-semibold">{doctor.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {doctor.specializations || "N/A"}
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {doctor.patients || "N/A"}{" "}
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
    </div>
  );
}
