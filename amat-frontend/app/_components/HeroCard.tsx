import React from "react";
import Image from "next/image";
import doctorImage from "../_assets/doctor.png";
import doctorImage2 from "../_assets/doctor2.png";
import doctorImage3 from "../_assets/doctor3.png";
import medicalPattern from "../_assets/medical.jpg";
import Carousel from "./Carousel";

export default function HeroCard() {
  return (
    <section className="relative w-full px-8 py-24 sm:py-16 bg-primary-700">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${medicalPattern.src})`,
          opacity: 0.05,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "840px",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Carousel>
          {/* Slide 1 */}
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="mr-auto place-self-center lg:col-span-7 p-8">
              <h2 className="max-w-2xl mb-4 text-2xl sm:text-5xl font-extrabold tracking-tight leading-none text-blue-900">
                Advans Medical and Health Consultancy
              </h2>
              <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 text-base sm:text-lg lg:text-xl dark:text-blue-700">
                Live Right Live Well: Consult A Doctor Anytime
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-950 rounded-lg bg-primary-800 hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Get started
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-300 border border-blue-300 rounded-lg hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 dark:text-blue-900 dark:border-blue-800 dark:hover:bg-blue-300 dark:focus:ring-gray-800"
                >
                  Speak to Us
                </a>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
              <Image
                src={doctorImage}
                alt="doctor"
                className="w-full h-auto"
                width={400}
                height={400}
              />
            </div>
          </div>

          {/* Slide 2 */}
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="mr-auto place-self-center lg:col-span-7 p-8">
              <h2 className="max-w-2xl mb-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-blue-900">
                "Your Health, <br className="hidden sm:block" /> Our Priority"
              </h2>
              <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 text-base sm:text-lg lg:text-xl dark:text-blue-700">
                Get Expert Consultation Anytime
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-950 rounded-lg bg-primary-800 hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Learn More
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-300 border border-blue-300 rounded-lg hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 dark:text-blue-900 dark:border-blue-800 dark:hover:bg-blue-300 dark:focus:ring-gray-800"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
              <Image
                src={doctorImage2}
                alt="doctor"
                className="w-full h-auto"
                width={400}
                height={400}
              />
            </div>
          </div>

          {/* Slide 3 */}
          <div className="grid lg:grid-cols-12 lg:gap-8">
            <div className="mr-auto place-self-center lg:col-span-7 p-8">
              <h2 className="max-w-2xl mb-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-none text-blue-900">
                Trusted Medical Services
              </h2>
              <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 text-base sm:text-lg lg:text-xl dark:text-blue-700">
                Care for Your Health, Always
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-950 rounded-lg bg-primary-800 hover:bg-primary-900 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                >
                  Explore Now
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-blue-300 border border-blue-300 rounded-lg hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 dark:text-blue-900 dark:border-blue-800 dark:hover:bg-blue-300 dark:focus:ring-gray-800"
                >
                  Book a Call
                </a>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex items-center justify-center">
              <Image
                src={doctorImage3}
                alt="doctor"
                className="w-full h-auto"
                width={400}
                height={400}
              />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
