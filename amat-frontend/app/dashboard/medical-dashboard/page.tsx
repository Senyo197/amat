import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import MedicalDashboardSidebar from "@/app/_components/dashboard/MedicalDashboardSidebar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface Appointment {
  _id: string;
  patientId: string;
  practitionerId: string;
  createdAt: string;
  appointmentDetails?: {
    newHealthConcern?: string;
  };
  patientName?: string;
  patientInitials?: string;
  practitionerName?: string;
  practitionerImage?: string;
}

const TableRow = ({ appointment }: { appointment: Appointment }) => {
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Navigating to appointment ID: ${appointment._id}`);
    router.push(`/dashboard/view-appointment?id=${appointment._id}`);
  };

  return (
    <tr className="text-left hover:bg-gray-50">
      <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
        {appointment.patientId}
      </td>
      <td className="py-2 px-2 text-black text-xs whitespace-nowrap w-40">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
            {appointment.patientInitials || "N/A"}
          </div>
          <span className="ml-2">{appointment.patientName || "N/A"}</span>
        </div>
      </td>
      <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
        {new Date(appointment.createdAt).toLocaleDateString()}
      </td>
      <td className="py-2 px-6 text-black text-xs whitespace-nowrap w-40">
        <span className="border border-blue-300 px-2 py-1 rounded-md">
          {appointment.appointmentDetails?.newHealthConcern || "N/A"}
        </span>
      </td>
      <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img
            src={appointment.practitionerImage || "/placeholder.png"}
            alt={appointment.practitionerName || "Practitioner"}
            className="w-8 h-8 rounded-full border border-gray-300"
          />
          <span className="font-semibold">
            {appointment.practitionerName || "N/A"}
          </span>
        </div>
      </td>
      <td className="py-2 px-4 text-black text-xs whitespace-nowrap w-40 border-b border-gray-200">
        <a
          href={`/dashboard/view-appointment?id=${appointment._id}`}
          className="text-green-500 hover:underline flex items-center"
          onClick={handleNavigation}
        >
          View
        </a>
      </td>
    </tr>
  );
};

const Table = ({ appointments }: { appointments: Appointment[] }) => (
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
          Appointment Date
        </th>
        <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-28">
          Health Concern
        </th>
        <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
          Assigned Practitioner
        </th>
        <th className="py-2 px-4 text-black text-xs whitespace-nowrap w-40">
          View
        </th>
      </tr>
    </thead>
    <tbody>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <TableRow key={appointment._id} appointment={appointment} />
        ))
      ) : (
        <tr>
          <td colSpan={6} className="text-center py-4 text-gray-500">
            No appointments available.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default function MedicalDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalProfessional, setMedicalProfessional] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated.");
          setLoading(false);
          return;
        }

        // Decode the token to extract the practitioner ID
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);
        const practitionerId = decodedToken?.practitionerId;

        if (!practitionerId) {
          setError("Practitioner ID not found.");
          setLoading(false);
          return;
        }

        console.log(
          "Fetching appointments for practitioner ID:",
          practitionerId
        );

        const [appointmentsResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book-appointment/practitioner/${practitionerId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        console.log("Appointments fetched:", appointmentsResponse.data);

        setAppointments(appointmentsResponse.data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <MedicalDashboardSidebar medicalprofessional={medicalProfessional} />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md">
          <DashboardNavbar />
        </div>
        <div className="flex mt-4 ml-4">
          <div className="flex-1 flex flex-wrap">
            <div className="mx-3 mt-4">
              <Table appointments={appointments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
