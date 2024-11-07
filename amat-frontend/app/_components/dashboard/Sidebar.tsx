"use client";

import { useState } from "react";
import { FaHome, FaEnvelope, FaCalendarAlt, FaCog } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Patient {
  initials?: string;
  fullName?: string;
  profession?: string;
}

{
  /* SVG components for the custom toggle icons */
}
const OpenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline"
  >
    <path d="M8 4l8 8-8 8" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="inline"
  >
    <path d="M16 4l-8 8 8 8" />
  </svg>
);

const DashboardSidebar = ({ patient }: { patient: Patient }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/patient-dashboard",
      icon: <FaHome />,
    },
    { name: "Messages", href: "/messages", icon: <FaEnvelope /> },
    {
      name: "Book Appointment",
      href: "/dashboard/appointment",
      icon: <FaCalendarAlt />,
    },
    { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
  ];

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Toggle Button with SVG icons and text */}
      <button
        onClick={toggleDrawer}
        className={`sm:hidden fixed top-24 z-50 p-2 text-white bg-blue-800 rounded-r-md ${
          isOpen ? "left-60" : "left-0"
        }`}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <span className="flex items-center gap-2">
            <CloseIcon /> <span>Close</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <OpenIcon /> <span>Open</span>
          </span>
        )}
      </button>

      {/* Sidebar for larger screens */}
      <nav className="hidden sm:flex sm:flex-col sm:w-60 sm:shadow-md bg-blue-800">
        {/* Sidebar content */}
        <SidebarContent
          patient={patient}
          pathname={pathname}
          navLinks={navLinks}
        />
      </nav>

      {/* Drawer for smaller screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleDrawer}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-blue-800 shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <SidebarContent
          patient={patient}
          pathname={pathname}
          navLinks={navLinks}
        />
      </div>
    </>
  );
};

const SidebarContent = ({
  patient,
  pathname,
  navLinks,
}: {
  patient: Patient;
  pathname: string;
  navLinks: { name: string; href: string; icon: JSX.Element }[];
}) => (
  <div className="flex flex-col h-full">
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
          const inactiveStyles =
            "text-white hover:bg-white hover:text-blue-800";

          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${baseStyles} ${
                  isActive ? activeStyles : inactiveStyles
                }`}
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
);

export default DashboardSidebar;
