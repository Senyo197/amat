// AddNurseModal.js
"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface AddNurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nurseDetails: {
    name: string;
    email: string;
    department: string;
    password: string;
  }) => Promise<void>;
}

const AddNurseModal = ({ isOpen, onClose, onSubmit }: AddNurseModalProps) => {
  const [nurseDetails, setNurseDetails] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNurseDetails({ ...nurseDetails, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Call the onSubmit function passed as a prop to send data to the server
    await onSubmit(nurseDetails);
    // Close the modal after submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Nurse</h2>
        <button className="absolute top-2 right-2" onClick={onClose}>
          <FaTimes className="text-gray-600" />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={nurseDetails.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={nurseDetails.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={nurseDetails.department}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={nurseDetails.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Add Nurse
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNurseModal;
