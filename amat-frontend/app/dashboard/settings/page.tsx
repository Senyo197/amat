"use client";

import React, { useState, useEffect } from "react";
import DashboardNavMenu from "@/app/_components/dashboard/DashboardNavMenu";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const toggleMenu = () => setIsSidebarOpen(!isSidebarOpen);

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

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    dob: "1990-01-01",
    gender: "male",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Main St",
    city: "Anytown",
    country: "USA",
    preExistingConditions: "None",
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

  const handleProfileSave = (data: ProfileData) => {
    setProfileData(data);
    console.log("Profile data saved:", data);
  };

  const handleNotificationSave = (data: NotificationData) => {
    setNotificationData(data);
    console.log("Notification settings saved:", data);
  };

  const handleSecuritySave = (data: SecurityData) => {
    setSecurityData(data);
    console.log("Security settings saved:", data);
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Mobile Sidebar Menu */}
      <DashboardNavMenu
        patient={patient}
        isOpen={isSidebarOpen}
        toggleMenu={toggleMenu}
      />

      {/* Desktop Sidebar Menu */}
      <DashboardSidebar patient={patient} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <DashboardNavbar toggleMenu={toggleMenu} />

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
