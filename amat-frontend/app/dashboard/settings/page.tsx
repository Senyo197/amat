"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "@/app/_components/dashboard/Sidebar";
import DashboardNavbar from "@/app/_components/dashboard/DashboardNavbar";
import ProfileSettings, {
  ProfileData,
} from "@/app/_components/settings/ProfileSettings";
import NotificationSettings, {
  NotificationData,
} from "@/app/_components/settings/NotificationSettings";
import SecuritySettings, {
  SecurityData,
} from "@/app/_components/settings/SecuritySettings";
import axios from "axios";

interface Patient {
  initials: string;
  fullName: string;
  profession: string;
  profilePicture?: string;
}

export default function Settings() {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/protected`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = response.data;
        const initials = user.name
          .split(" ")
          .map((word: string) => word[0])
          .join("");
        setPatient({
          fullName: user.name,
          initials: initials,
          profession: user.profession,
          profilePicture: user.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching patient data", error);
      }
    };

    fetchPatientData();
  }, []);

  // Initial settings data
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    dob: "",
    gender: "other",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    preExistingConditions: "",
    currentMedications: "",
  });

  const [notificationData, setNotificationData] = useState<NotificationData>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const [securityData, setSecurityData] = useState<SecurityData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const handleProfileSave = async (data: ProfileData) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProfileData(data);
      console.log("Profile data saved:", data);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleNotificationSave = async (data: NotificationData) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/notifications`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setNotificationData(data);
      console.log("Notification settings saved:", data);
    } catch (error) {
      console.error("Error saving notification settings:", error);
    }
  };

  const handleSecuritySave = async (data: SecurityData) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/security`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSecurityData(data);
      console.log("Security settings saved:", data);
    } catch (error) {
      console.error("Error saving security settings:", error);
    }
  };

  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Just a moment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Desktop Sidebar Menu */}
      <DashboardSidebar patient={patient} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Settings */}
            <ProfileSettings data={profileData} onSave={handleProfileSave} />

            {/* Notification Settings */}
            <NotificationSettings
              data={notificationData}
              onSave={handleNotificationSave}
            />

            {/* Security Settings */}
            <SecuritySettings data={securityData} onSave={handleSecuritySave} />
          </div>
        </main>
      </div>
    </div>
  );
}
