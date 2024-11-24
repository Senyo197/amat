"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    phonenumber: "",
    address: "",
    town: "",
    country: "",
    education: "",
    occupation: "",
    religion: "",
    maritalStatus: "",
    preexisting_conditions: "",
    current_medications: "",
    password: "",
    confirm_password: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as keyof typeof formData]: value });
  };

  const handleContinue = () => {
    if (currentSection < 5) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/signup`,
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigateToDashboard();
        }, 1500);
      }
    } catch (error) {
      if ((error as any).response?.status === 400) {
        const errorMessage = (error as any).response?.data?.error;
        if (errorMessage === "Name is already in use") {
          toast.error(
            "A user with this name, email, or phone number already exists."
          );
        } else if (errorMessage === "A user with this email already exists") {
          toast.error("This email is already registered.");
        } else if (
          errorMessage === "A user with this phone number already exists"
        ) {
          toast.error("This phone number is already registered.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        console.error("Error creating account: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToDashboard = () => {
    window.location.href = "/auth/login";
  };

  const sections = [
    [
      {
        label: "Full Name",
        name: "name",
        type: "text",
        placeholder: "Enter your full name",
      },
      {
        label: "Date of Birth",
        name: "dob",
        type: "date",
        placeholder: "Enter your date of birth",
      },
      {
        label: "Gender",
        name: "gender",
        type: "select",
        options: ["Male", "Female"],
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter your email address",
      },
    ],
    [
      {
        label: "Phone Number",
        name: "phonenumber",
        type: "tel",
        placeholder: "Enter your phone number",
      },
      {
        label: "Address",
        name: "address",
        type: "text",
        placeholder: "Enter your address",
      },
      {
        label: "Town",
        name: "town",
        type: "text",
        placeholder: "Enter your town",
      },
      {
        label: "Country",
        name: "country",
        type: "text",
        placeholder: "Enter your country",
      },
    ],
    [
      {
        label: "Education",
        name: "education",
        type: "text",
        placeholder: "Enter your highest level of education",
      },
      {
        label: "Occupation",
        name: "occupation",
        type: "text",
        placeholder: "Enter your current occupation",
      },
      {
        label: "Religion",
        name: "religion",
        type: "text",
        placeholder: "Enter your religion",
      },
      {
        label: "Marital Status",
        name: "maritalStatus",
        type: "text",
        placeholder: "Enter your marital status",
      },
    ],
    [
      {
        label: "Pre-existing Conditions",
        name: "preexisting_conditions",
        type: "textarea",
        placeholder:
          "List any chronic illnesses, allergies, past surgeries, etc.",
      },
      {
        label: "Current Medications",
        name: "current_medications",
        type: "textarea",
        placeholder: "List any medications you are currently taking.",
      },
    ],
    [
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Create your password",
      },
      {
        label: "Confirm Password",
        name: "confirm_password",
        type: "password",
        placeholder: "Confirm your password",
      },
    ],
  ];

  return (
    <div
      className={`flex min-h-screen flex-col justify-center px-6 py-5 lg:px-8 ${
        loading ? "blur-sm" : ""
      }`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-9 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
          Sign up for an account
        </h2>
        <div className="text-sm text-center text-blue-900">
          Let's get you started. Please enter your details
        </div>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4">
          {sections[currentSection - 1].map(
            ({ label, name, type, placeholder, options }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium leading-6 text-blue-900"
                >
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    id={name}
                    name={name}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select your {label.toLowerCase()}</option>
                    {options?.map((option) => (
                      <option key={option} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <textarea
                    id={name}
                    name={name}
                    rows={4}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                  />
                )}
              </div>
            )
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentSection === 1}
              className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-blue-900 bg-white border-blue-900 focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-white bg-blue-900 border-transparent focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              {currentSection === 5 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opatown-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Account Created</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
