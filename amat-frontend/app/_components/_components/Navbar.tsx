"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../_assets/logo.png";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  // Condition to hide the navbar if on the dashboard
  if (pathname.startsWith("/dashboard")) {
    return null;
  } else if (pathname.startsWith("/super-admin")) {
    return null;
  } else if (pathname.startsWith("/appointment")) {
    return null;
  } else if (pathname.startsWith("/medical_auth/login")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full p-5 flex items-center justify-between bg-white shadow-lg z-50">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={60} height={50} />
          <span className="text-xl font-semibold text-black">AMaT-HCL</span>
        </Link>
      </div>
      <div className="flex-1 flex justify-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-blue-900 font-sans font-semibold transition-colors duration-200 ${
              pathname === link.href
                ? "border-b-2 border-blue-900"
                : "hover:text-indigo-600"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-6">
        <Link
          href="/auth/login"
          className="text-blue-900 font-sans font-semibold transition-colors duration-200 hover:text-indigo-600 active:text-indigo-800"
        >
          Log In
        </Link>
        <Link
          href="/auth/signup"
          className="text-black font-sans border border-blue-300 px-4 py-2 rounded-full hover:bg-blue-300 hover:text-white active:bg-blue-400 transition-colors duration-200 font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
