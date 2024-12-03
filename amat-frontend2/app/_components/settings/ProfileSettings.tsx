import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

export interface User {
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  preExistingConditions: string;
  currentMedications?: string;
  password: string;
  twoFactorAuth: boolean;
}

export type ProfileData = Omit<User, "password" | "twoFactorAuth">;

interface ProfileSettingsProps {
  data: ProfileData;
  onSave: (updatedUser: ProfileData) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<ProfileData>({
    name: data.name || "",
    dob: data.dob || "",
    gender: data.gender || "other",
    email: data.email || "",
    phoneNumber: data.phoneNumber || "",
    address: data.address || "",
    city: data.city || "",
    country: data.country || "",
    preExistingConditions: data.preExistingConditions || "",
    currentMedications: data.currentMedications || "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: data.name || "",
      dob: data.dob || "",
      gender: data.gender || "other",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      address: data.address || "",
      city: data.city || "",
      country: data.country || "",
      preExistingConditions: data.preExistingConditions || "",
      currentMedications: data.currentMedications || "",
    });
    setIsEditing(false);
  };

  const isCheckbox = (
    target: EventTarget &
      (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
  ): target is HTMLInputElement => {
    return target instanceof HTMLInputElement && target.type === "checkbox";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const name = target.name;

    if (isCheckbox(target)) {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        {!isEditing && (
          <FaEdit
            className="text-blue-800 cursor-pointer hover:text-gray-700 transition-colors duration-200"
            onClick={handleEditClick}
            title="Edit Profile"
          />
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-blue-900"
            >
              Full Name
            </label>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium leading-6 text-blue-900"
            >
              Date of Birth
            </label>
            <div>
              <input
                id="dob"
                name="dob"
                type="date"
                autoComplete="bday"
                required
                value={formData.dob}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-blue-900"
            >
              Gender
            </label>
            <div>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 
                sm:text-sm sm:leading-6"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-blue-900"
            >
              Email
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 shadow-sm 
                ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded 
              hover:bg-blue-700 transition-colors duration-200"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded 
              hover:bg-gray-400 transition-colors duration-200"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <div>
            <span className="font-medium">Full Name:</span> {data.name}
          </div>
          <div>
            <span className="font-medium">Date of Birth:</span> {data.dob}
          </div>
          <div>
            <span className="font-medium">Gender:</span>{" "}
            {data.gender
              ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
              : "Not Specified"}
          </div>
          <div>
            <span className="font-medium">Email:</span> {data.email}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileSettings;
