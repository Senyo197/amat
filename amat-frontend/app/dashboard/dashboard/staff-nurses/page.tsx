"use client";
import { useEffect, useState } from "react";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/dashboard/MedicalDashboardSidebar";
import { FaUser, FaUserNurse, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import MedicalModal from "@/app/_components/dashboard/MedicalModal";
import axios from "axios";

export default function NursesPage() {
  const medicalprofessional = {
    fullName: "Dr. John Doe",
    initials: "DJD",
    profession: "Hospital Administrator",
  };

  interface Nurse {
    _id: string;
    name: string;
    specializations: string;
    patients?: number;
  }

  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateCustomID = (index: number): string => {
    const number = (index + 1).toString().padStart(3, "0");
    return `N${number}`;
  };

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-practitioners/medical/nurses`
        );
        setNurses(response.data);
      } catch (err) {
        console.error("Error fetching nurses:", err);
      }
    };

    fetchNurses();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddNurse = async (formData: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-practitioners/medical/signup`,
        {
          name: formData.name,
          email: formData.email,
          phonenumber: formData.phonenumber,
          role: "nurse",
          specializations: formData.specializations,
          password: formData.password,
        }
      );
      setNurses((prevNurses) => [...prevNurses, response.data]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding nurse:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <MedicalDashboardSidebar medicalprofessional={medicalprofessional} />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar
            toggleMenu={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="flex flex-col mt-4 mx-4">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Nurses Management
          </h2>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
              onClick={handleModalOpen}
            >
              Add New Nurse
            </button>
          </div>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-20">
                  Nurse ID
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Name
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Specialty
                </th>
                <th className="py-2 px-4 text-black text-sm whitespace-nowrap w-40">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {nurses.map((nurse, index) => (
                <tr key={nurse._id} className="text-left">
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {generateCustomID(index)}
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/9.jpg"
                        alt={nurse.name}
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                      <span className="font-semibold">{nurse.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
                    {nurse.specializations || "N/A"}
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

      {/* Modal for adding new nurse */}
      <MedicalModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleAddNurse}
      />
    </div>
  );
}
