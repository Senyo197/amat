"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import logo from "../../_assets/logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MedicalSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    role: "",
    specializations: "",
    licenseCertificate: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
        throw new Error("Backend URL is not configured.");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-practitioners/signup`,
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        toast.success("Account created successfully! You can now log in.", {
          autoClose: 3000,
        });
        setTimeout(() => {
          window.location.href = "/medical_auth/login";
        }, 3000);
        setFormData({
          name: "",
          email: "",
          phonenumber: "",
          role: "",
          specializations: "",
          licenseCertificate: "",
          password: "",
        });
      }
    } catch (err: any) {
      console.error("Signup error:", err); // Log the error for debugging
      const errorMessage =
        err.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMessage, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-9 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto w-auto mb-3"
          src={logo}
          alt="AMaT-HCL"
          width={70}
          height={70}
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
          Create an Account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-900"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blue-900"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-blue-900"
            >
              Phone Number
            </label>
            <input
              id="phonenumber"
              name="phonenumber"
              type="text"
              required
              value={formData.phonenumber}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-blue-900"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              aria-label="Select your role"
              required
              value={formData.role}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="specializations"
              className="block text-sm font-medium text-blue-900"
            >
              Specializations
            </label>
            <input
              id="specializations"
              name="specializations"
              type="text"
              required
              value={formData.specializations}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="licenseCertificate"
              className="block text-sm font-medium text-blue-900"
            >
              License Certificate
            </label>
            <input
              id="licenseCertificate"
              name="licenseCertificate"
              type="text"
              required
              value={formData.licenseCertificate}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blue-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm focus:ring-blue-900 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus:ring-blue-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/medical_auth/login"
            className="text-blue-900 font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
