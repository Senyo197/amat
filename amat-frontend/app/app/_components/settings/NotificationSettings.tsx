import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

export interface NotificationData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

interface NotificationSettingsProps {
  data: NotificationData;
  onSave: (data: NotificationData) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<NotificationData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        {!isEditing && (
          <FaEdit
            className="text-blue-800 cursor-pointer hover:text-gray-700 transition-colors duration-200"
            onClick={handleEditClick}
            title="Edit Notification Settings"
          />
        )}
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={formData.emailNotifications}
              onChange={handleChange}
              className="mr-2"
            />
            Email Notifications
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={formData.smsNotifications}
              onChange={handleChange}
              className="mr-2"
            />
            SMS Notifications
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="pushNotifications"
              checked={formData.pushNotifications}
              onChange={handleChange}
              className="mr-2"
            />
            Push Notifications
          </label>
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
            <span className="font-medium">Email Notifications:</span> {data.emailNotifications ? 'Enabled' : 'Disabled'}
          </div>
          <div>
            <span className="font-medium">SMS Notifications:</span> {data.smsNotifications ? 'Enabled' : 'Disabled'}
          </div>
          <div>
            <span className="font-medium">Push Notifications:</span> {data.pushNotifications ? 'Enabled' : 'Disabled'}
          </div>
        </div>
      )}
    </section>
  );
};

export default NotificationSettings;
