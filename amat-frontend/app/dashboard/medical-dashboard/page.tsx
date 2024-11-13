"use client";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/dashboard/MedicalDashboardSidebar";
import {
  dashboardCards,
  medicalProfessional,
  patients,
} from "@/app/_data/mockData";
import { useRouter } from "next/navigation";

const Card = ({
  icon: Icon,
  label,
  count,
  bgColor,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
  bgColor: string;
}) => (
  <div
    className={`shadow-md rounded-lg p-4 w-64 h-24 m-2 flex flex-col items-center justify-between ${bgColor}`}
  >
    <div className="flex items-center">
      <div className="border-2 border-blue-400 rounded-full p-2 bg-white">
        <Icon className="text-black text-2xl" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-gray-900 ml-2 whitespace-nowrap">
        {label}
      </p>
    </div>
    <p className="text-lg font-bold text-gray-800 whitespace-nowrap">{count}</p>
  </div>
);

const TableRow = ({ patient }: { patient: any }) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/dashboard/patient?id=${patient.id}`);
  };

  return (
    <tr className="text-left">
      <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
        {patient.id}
      </td>
      <td className="py-2 px-2 text-black text-xs whitespace-nowrap w-40">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
            {patient.initials}
          </div>
          <span className="ml-2">{patient.name}</span>
        </div>
      </td>
      <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
        {patient.date}
      </td>
      <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
        <span className="border border-blue-300 px-2 py-1 rounded-md">
          {patient.disease}
        </span>
      </td>
      <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
        {patient.appointmentType}
      </td>
      <td className="py-2 px-7 text-black text-xs whitespace-nowrap w-40">
        {patient.mode}
      </td>
      <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img
            src={patient.assignedDoctor.image}
            alt={patient.assignedDoctor.name}
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <span className="font-semibold">{patient.assignedDoctor.name}</span>
        </div>
      </td>
      <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
        <a
          href={`/dashboard/patient?id=${patient.id}`}
          className="text-green-500 hover:underline flex items-center"
          onClick={handleNavigation}
        >
          View
        </a>
      </td>
    </tr>
  );
};

const Table = ({ patients }: { patients: any[] }) => (
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
      {patients.map((patient) => (
        <TableRow key={patient.id} patient={patient} />
      ))}
    </tbody>
  </table>
);

export default function MedicalDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <MedicalDashboardSidebar medicalprofessional={medicalProfessional} />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar />
        </div>
        <div className="flex mt-4 ml-4">
          <div className="flex-1 flex flex-wrap">
            {dashboardCards.map((card, index) => {
              const Icon = require("react-icons/fa")[card.icon];
              return (
                <Card
                  key={index}
                  icon={Icon}
                  label={card.label}
                  count={card.count}
                  bgColor={card.bgColor}
                />
              );
            })}
            <div className="mx-3 mt-4">
              <Table patients={patients} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
