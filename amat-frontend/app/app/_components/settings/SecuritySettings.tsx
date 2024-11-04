import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorAuth: boolean;
}

interface SecuritySettingsProps {
  data: SecurityData;
  onSave: (data: SecurityData) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<SecurityData>({
    ...data,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!isEditing) {
      setFormData({
        ...data,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [data, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      ...data,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Security Settings</h2>
        {!isEditing && (
          <FaEdit
            className="text-blue-800 cursor-pointer hover:text-gray-700 transition-colors duration-200"
            onClick={handleEditClick}
            title="Edit Security Settings"
          />
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="currentPassword">
              Current Password:
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="newPassword">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-medium">Enable Two-Factor Authentication</label>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
            >
              <FaSave className="mr-2" /> Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-200"
            >
              <FaTimes className="mr-2" /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <div>
            <span className="font-medium">Two-Factor Authentication:</span> {data.twoFactorAuth ? 'Enabled' : 'Disabled'}
          </div>
        </div>
      )}
    </section>
  );
};

export default SecuritySettings;
