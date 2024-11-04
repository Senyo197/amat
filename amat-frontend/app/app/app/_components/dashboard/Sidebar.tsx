"use client";

import { FaHome, FaEnvelope, FaCalendarAlt, FaCog } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Patient {
  initials?: string;
  fullName?: string;
  profession?: string;
}

const DashboardSidebar = ({ patient }: { patient: Patient }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard/patient-dashboard", icon: <FaHome /> },
    { name: "Messages", href: "/messages", icon: <FaEnvelope /> },
    { name: "Book Appointment", href: "/dashboard/appointment", icon: <FaCalendarAlt /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <nav className="hidden sm:flex sm:flex-col sm:w-60 sm:shadow-md bg-blue-800">
      {/* Sidebar content */}
      <div className="sm:flex sm:flex-col sm:h-full">
        {/* Patient Info */}
        <div className="flex items-center justify-center py-8">
          <div className="bg-white text-blue-800 w-16 h-16 flex items-center justify-center rounded-full text-3xl font-bold">
            {patient.initials}
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold text-white">{patient.fullName}</p>
          <p className="text-sm text-white">{patient.profession}</p>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 px-4">
          <ul className="space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const baseStyles =
                "flex justify-between items-center py-2 px-4 text-base transition-colors font-semibold duration-200 rounded-md";
              const activeStyles = "bg-white text-blue-800";
              const inactiveStyles = "text-white hover:bg-white hover:text-blue-800";

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
                  >
                    {link.name}
                    {link.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardSidebar;
