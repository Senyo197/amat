"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ServiceCards() {
  const services = [
    {
      title: "Telemedicine Solutions",
      icon: "https://cdn-icons-png.flaticon.com/128/448/448945.png",
    },
    {
      title: "Electronic Health Records",
      icon: "https://cdn-icons-png.flaticon.com/128/1156/1156975.png",
    },
    {
      title: "Appointment Scheduling",
      icon: "https://cdn-icons-png.flaticon.com/128/12572/12572008.png",
    },
    {
      title: "Medication Management",
      icon: "https://cdn-icons-png.flaticon.com/128/883/883356.png",
    },
    {
      title: "Lab Test Ordering and Results",
      icon: "https://cdn-icons-png.flaticon.com/128/7388/7388535.png",
    },
    {
      title: "Vaccination Management",
      icon: "https://cdn-icons-png.flaticon.com/128/2295/2295146.png",
    },
    {
      title: "Chronic Disease Management",
      icon: "https://cdn-icons-png.flaticon.com/128/15843/15843063.png",
    },
    {
      title: "Wellbeing Programs",
      icon: "https://cdn-icons-png.flaticon.com/128/17774/17774339.png",
    },
    {
      title: "Patient Exchangement",
      icon: "https://cdn-icons-png.flaticon.com/128/2302/2302715.png",
    },
    {
      title: "Data Analytics",
      icon: "https://cdn-icons-png.flaticon.com/128/5205/5205946.png",
    },
    {
      title: "Integration Services",
      icon: "https://cdn-icons-png.flaticon.com/128/8637/8637227.png",
    },
    {
      title: "Security and Compliance",
      icon: "https://cdn-icons-png.flaticon.com/128/12626/12626665.png",
    },
    {
      title: "Medical Equipment Supply",
      icon: "https://cdn-icons-png.flaticon.com/128/8070/8070595.png",
    },
    {
      title: "Medical Billing Software",
      icon: "https://cdn-icons-png.flaticon.com/128/1651/1651965.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;

  // Move to the next set of items
  const nextSection = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < services.length ? prevIndex + itemsPerPage : 0
    );
  };

  // Move to the previous set of items
  const prevSection = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage >= 0
        ? prevIndex - itemsPerPage
        : services.length - itemsPerPage
    );
  };

  // Get the current slice of services to display
  const currentServices = services.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section
      id="services"
      className="container mx-auto px-4 py-2 md:py-8 lg:py-5"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-2xl leading-[1.1] sm:text-3xl md:text-3xl text-blue-900">
          Our Consulting Specialties
        </h2>
      </div>

      {/* Service cards grid */}
      <div className="grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-4 mt-6">
        {currentServices.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border dark:bg-blue-600 select-none hover:shadow-lg hover:shadow-teal-200 transition duration-300 ease-in-out transform hover:scale-105 w-[250px] px-4 py-6"
          >
            <div className="flex flex-col justify-center items-center h-[120px] rounded-md text-center">
              <div className="flex justify-center items-center bg-white p-2 rounded-full border-4 border-gray-300 mb-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="h-10 w-10"
                />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevSection}
          className="mx-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-800"
        >
          <FaArrowLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSection}
          className="mx-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-800"
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </section>
  );
}
