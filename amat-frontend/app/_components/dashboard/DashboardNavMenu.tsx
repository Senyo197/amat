"use client";

import { FaHome, FaEnvelope, FaCalendarAlt, FaCog, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Patient {
  initials?: string;
  fullName?: string;
  profession?: string;
}

interface DashboardNavMenuProps {
  patient: Patient;
  isOpen: boolean;
  toggleMenu: () => void;
}

const DashboardNavMenu = ({ patient, isOpen, toggleMenu }: DashboardNavMenuProps) => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard/patient-dashboard", icon: <FaHome /> },
    { name: "Messages", href: "/messages", icon: <FaEnvelope /> },
    { name: "Book Appointment", href: "/dashboard/appointment", icon: <FaCalendarAlt /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 sm:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <nav
        className={`bg-blue-800 fixed top-0 left-0 h-full w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30 sm:hidden`}
      >
        {/* Sidebar Content */}
        <div className="relative h-full overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Close Menu"
          >
            <FaTimes size={24} />
          </button>

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
                      onClick={() => isOpen && toggleMenu()}
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
    </>
  );
};

export default DashboardNavMenu;
