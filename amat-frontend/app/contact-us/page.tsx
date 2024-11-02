"use client";

import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20">
        <section className="bg-blue-400 text-white text-center py-10 h-[207px] flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-lg">
            Have any questions? We'd love to hear from you.
          </p>
        </section>
        <section className="flex flex-col md:flex-row justify-around py-10 px-5 text-center text-black">
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-4">Address Details</h3>
            <div className="flex items-center text-lg mb-2">
              <FiMapPin className="mr-2 text-blue-600" size={24} />
              <span>Service Areas:</span>
            </div>
            <p className="text-lg">
              Accra - Kumasi - Tamale - Kintampo - Kpandai [Ghana]
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-4">Contact our Team</h3>
            <div className="flex items-center text-lg mb-2">
              <FiPhone className="mr-2 text-blue-600" size={24} />
              <span>055 577 8254</span>
            </div>
            <div className="flex items-center text-lg">
              <FiMail className="mr-2 text-blue-600" size={24} />
              <span>amathcl2021@gmail.com</span>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 text-black py-10">
          <h2 className="text-center text-2xl font-bold mb-1">
            Can't find what you are looking for?
          </h2>
          <p className="text-center mb-8">Get in touch with us!</p>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200 hover:border-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200 hover:border-blue-600"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200 hover:border-blue-600"
                required
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
      <div className="mt-auto text-center py-5 bg-white"></div>
    </div>
  );
}
