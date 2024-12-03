"use client";
import { useState } from "react";
import axios from "axios";
import logo from "../../_assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MedicalDashboardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/medical-practitioners/medical/login`,
        { email, password }
      );

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => {
          window.location.href = "/dashboard/medical-dashboard";
        }, 1500);
      }
    } catch (err) {
      toast.error("Invalid email or password", { position: "top-center" });
      console.error("Error logging in:", err);
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
          Medical Practitioner
        </h2>
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
          Log in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-blue-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-blue-900"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FaEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <Link
            href="/auth/forget_password"
            className="text-red-600 text-right text-sm"
          >
            Forget Password?
          </Link>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Log in"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <a
            href="/medical_auth/signup"
            className="font-semibold leading-6 text-blue-900 hover:text-blue-500"
          >
            Sign Up Now!
          </a>
        </p>
      </div>
      {/* ToastContainer for toast notifications */}
      <ToastContainer />
    </div>
  );
}
