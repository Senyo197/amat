"use client";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/dashboard/MedicalDashboardSidebar";
import { FaUser, FaUserFriends, FaFileAlt, FaComments } from "react-icons/fa";

export default function MedicalDashboard() {
  const medicalprofessional = {
    fullName: "Dr. John Doe",
    initials: "DJD",
    profession: "Hospital Administrator",
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <MedicalDashboardSidebar medicalprofessional={medicalprofessional} />{" "}
      {/* Use the new sidebar */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar />
        </div>
        <div className="flex mt-4 ml-4">
          <div className="flex-1 flex flex-wrap">
            <div className="bg-green-50 shadow-md rounded-lg p-4 w-64 h-24 m-2 flex flex-col items-center justify-between">
              <div className="flex items-center">
                <div className="border-2 border-blue-400 rounded-full p-2 bg-white">
                  <FaUser className="text-black text-2xl" />
                </div>
                <p className="text-sm font-semibold text-gray-900 ml-2 whitespace-nowrap">
                  Patients
                </p>
              </div>
              <p className="text-lg font-bold text-gray-800 whitespace-nowrap">
                150
              </p>
            </div>

            <div className="bg-yellow-50 shadow-md rounded-lg p-4 w-64 h-24 m-2 flex flex-col items-center justify-between">
              <div className="flex items-center">
                <div className="border-2 border-blue-400 rounded-full p-2 bg-white">
                  <FaFileAlt className="text-black text-2xl" />
                </div>
                <p className="text-sm font-semibold text-gray-900 ml-2 whitespace-nowrap">
                  Lab Reports
                </p>
              </div>
              <p className="text-lg font-bold text-gray-800 whitespace-nowrap">
                50
              </p>
            </div>

            <div className="bg-blue-50 shadow-md rounded-lg p-4 w-64 h-24 m-2 flex flex-col items-center justify-between">
              <div className="flex items-center">
                <div className="border-2 border-blue-400 rounded-full p-2 bg-white">
                  <FaComments className="text-black text-2xl" />
                </div>
                <p className="text-sm font-semibold text-gray-900 ml-2 whitespace-nowrap">
                  Urgent
                </p>
              </div>
              <p className="text-lg font-bold text-gray-800 whitespace-nowrap">
                10
              </p>
            </div>

            <div className="bg-red-50 shadow-md rounded-lg p-4 w-64 h-24 m-2 flex flex-col items-center justify-between">
              <div className="flex items-center">
                <div className="border-2 border-blue-400 rounded-full p-2 bg-white">
                  <FaUserFriends className="text-black text-2xl" />
                </div>
                <p className="text-sm font-semibold text-gray-900 ml-2 whitespace-nowrap">
                  Surgeries
                </p>
              </div>
              <p className="text-lg font-bold text-gray-800 whitespace-nowrap">
                5
              </p>
            </div>
            <div className="mx-3 mt-4">
              <table className="w-full bg-white rounded-lg">
                <thead className="bg-gray-200">
                  <tr className="text-left">
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-20">
                      Patient ID
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                      Patient Name
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-32">
                      Date Check-in
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-28">
                      Disease
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-48">
                      Type of Appointment
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                      Online / In-Person
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                      Assigned Doctor
                    </th>
                    <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-left">
                    <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                      P001
                    </td>
                    <td className="py-2 px-2 text-black text-xs whitespace-nowrap w-40">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
                          JD
                        </div>
                        <span className="ml-2">John Doe</span>
                      </div>
                    </td>
                    <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
                      2024-10-10
                    </td>
                    <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
                      <span className="border border-blue-300 px-2 py-1 rounded-md">
                        Flu
                      </span>
                    </td>
                    <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
                      Regular Check-up
                    </td>
                    <td className="py-2 px-7 text-black text-xs whitespace-nowrap w-40">
                      In-Person
                    </td>
                    <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        {/* Profile Picture */}
                        <img
                          src="https://randomuser.me/api/portraits/men/3.jpg"
                          alt="Dr. Stella"
                          className="w-8 h-8 rounded-full border border-gray-300"
                        />
                        <span className="font-semibold">Dr. Stella</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                      <a
                        href="#"
                        target="_blank"
                        className="text-green-500 hover:underline flex items-center"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="text-left">
                    <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                      P002
                    </td>
                    <td className="py-2 px-2 text-black text-xs whitespace-nowrap w-40">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
                          JD
                        </div>
                        <span className="ml-2">Jane Doe</span>
                      </div>
                    </td>
                    <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
                      2024-10-10
                    </td>
                    <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
                      <span className="border border-blue-300 px-2 py-1 rounded-md">
                        Stomach Ache
                      </span>
                    </td>
                    <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
                      Regular Check-up
                    </td>
                    <td className="py-2 px-7 text-black text-xs whitespace-nowrap w-40">
                      Online
                    </td>
                    <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://randomuser.me/api/portraits/women/4.jpg"
                          alt="Dr. Emma"
                          className="w-8 h-8 rounded-full border border-gray-300"
                        />
                        <span className="font-semibold">Dr. Emma</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                      <a
                        href="#"
                        target="_blank"
                        className="text-green-500 hover:underline flex items-center"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
