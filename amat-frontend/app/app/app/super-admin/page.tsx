"use client";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import { useState } from "react";
import {
  FaHospital,
  FaChartBar,
  FaEdit,
  FaTrash,
  FaHome,
  FaPlusCircle,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SuperAdminDashboard() {
  const superAdmin = {
    fullName: "John Smith",
    initials: "JS",
    profession: "Super Admin",
  };

  const hospitals = [
    { id: 1, name: "City Hospital", location: "New York", admins: 5 },
    { id: 2, name: "River Valley Clinic", location: "California", admins: 3 },
    { id: 3, name: "Green Park Hospital", location: "Texas", admins: 2 },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Line  chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Patients Treated",
        data: [30, 45, 60, 40, 80, 70, 100],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Hospital Patient Analytics",
      },
    },
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-gray-200 shadow-md flex-shrink-0">
        <div className="flex items-center justify-center py-8">
          <div className="bg-white text-black w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold">
            {superAdmin.initials}
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-black">
            {superAdmin.fullName}
          </p>
          <p className="text-sm text-black">{superAdmin.profession}</p>
        </div>
        <div className="mt-8">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex justify-between items-center py-2 px-4 text-base text-black hover:bg-blue-200 rounded-lg"
              >
                Dashboard
                <FaHome className="text-gray-700 text-xl" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex justify-between items-center py-2 px-4 text-base text-black hover:bg-blue-200 rounded-lg"
              >
                Hospitals
                <FaHospital className="text-gray-700 text-xl" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex justify-between items-center py-2 px-4 text-base text-black hover:bg-blue-200 rounded-lg"
              >
                Analytics
                <FaChartBar className="text-gray-700 text-xl" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar toggleMenu={toggleDropdown} />
        </div>
        <div className="p-6">
          {/* Top Analytics Summary */}
          <div className="flex space-x-6">
            <div className="bg-green-100 shadow-md rounded-lg p-4 w-64 h-24 flex flex-col items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">
                Total Hospitals
              </p>
              <p className="text-lg font-bold text-gray-800">
                {hospitals.length}
              </p>
            </div>
          </div>

          {/* Add Hospital Button */}
          <div className="my-4">
            <button className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              <FaPlusCircle className="text-white text-xl" />
              <span>Add New Hospital</span>
            </button>
          </div>

          {/* Hospitals Table */}
          <div className="mt-6">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black">
                    Hospital Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black">
                    Admins
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.id} className="border-b">
                    <td className="py-3 px-4">{hospital.name}</td>
                    <td className="py-3 px-4">{hospital.location}</td>
                    <td className="py-3 px-4">{hospital.admins}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:underline flex items-center">
                          <FaEdit className="mr-1" />
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline flex items-center">
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Analytics Graph */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Hospital Analytics
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
