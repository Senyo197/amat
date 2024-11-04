"use client";

import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";
import Image from "next/image";
import logo from "../_assets/logo.png";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

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
    <footer className="bg-white dark:bg-blue-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 flex items-center">
            <Image src={logo} alt="AMaT-HCL Logo" width={60} height={60} />
            <span className="ml-3 text-2xl font-semibold whitespace-nowrap dark:text-black">
              AMaT-HCL
            </span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold dark:text-blue-950 uppercase dark:text-">
                Follow us
              </h2>
              <ul className="text-blue-900 dark:text-blue-900 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-blue-950">
                Legal
              </h2>
              <ul className="dark:text-blue-900 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-blue-900">
            © 2024{" "}
            <a href="../_assets/logo.png" className="hover:underline">
              AMaT-HCL™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="dark:text-blue-900 hover:text-gray-900 dark:hover:text-white"
            >
              <FaFacebook className="w-4 h-4" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="dark:text-blue-900 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaTwitter className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="dark:text-blue-900 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaInstagram className="w-4 h-4" />
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="#"
              className="dark:text-blue-900 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaGithub className="w-4 h-4" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              href="#"
              className="dark:text-blue-900 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <FaDribbble className="w-4 h-4" />
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
