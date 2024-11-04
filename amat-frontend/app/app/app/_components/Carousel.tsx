"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Carousel({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="whitespace-nowrap transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div className="inline-block w-full">{child}</div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent text-blue-300 p-2"
      >
        <FaArrowLeft className="text-4xl opacity-50 hover:opacity-100" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-blue-300  p-2"
      >
        <FaArrowRight className="text-4xl opacity-50 hover:opacity-100" />
      </button>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 p-2">
        {React.Children.map(children, (child, index) => (
          <div
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
