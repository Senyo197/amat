"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../_assets/logo.png";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/super-admin") ||
    pathname.startsWith("/appointment") ||
    pathname.startsWith("/medical_auth/login")
  ) {
    return null;
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-5 flex items-center justify-between bg-white shadow-lg z-50">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={60} height={50} />
          <span className="text-xl font-semibold text-black">AMaT-HCL</span>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-blue-900 font-sans font-semibold transition-all duration-200 ${
              pathname === link.href
                ? "border-b-2 border-blue-900"
                : "hover:text-indigo-600 hover:underline"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Link
          href="/auth/login"
          className="text-black font-sans border border-blue-500 px-4 py-2 rounded-full hover:bg-blue-800 hover:text-white active:bg-blue-400 transition-colors duration-200 font-semibold"
        >
          Login / Sign Up
        </Link>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center space-x-4">
        <Link
          href="/auth/login"
          className="text-black font-sans border border-blue-500 px-3 py-1 rounded-full hover:bg-blue-800 hover:text-white active:bg-blue-400 transition-colors duration-200 font-semibold"
        >
          Login / Sign Up
        </Link>
        <button
          onClick={toggleMenu}
          className="text-blue-900 focus:outline-none hover:text-indigo-600 transition-all duration-200"
        >
          {menuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 mt-20 w-full h-screen bg-white flex flex-col items-center space-y-8 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-blue-900 font-sans font-semibold text-xl mt-16 hover:underline"
              onClick={toggleMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
