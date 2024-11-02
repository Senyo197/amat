'use client';

import React from 'react';
import { FaEdit, FaArrowRight } from 'react-icons/fa';
import { HealthProfileData } from './HealthProfileForm';

interface ReviewProfileProps {
  data: HealthProfileData;
  onEdit: (step: number) => void;
  onNext: () => void;
}

const ReviewProfile: React.FC<ReviewProfileProps> = ({ data, onEdit, onNext }) => {
  return (
    <div className="space-y-6">
      {/* Health Concern */}
      <div className="bg-pink-100 p-4 rounded-md flex items-center justify-between">
        <span className="text-red-600 font-bold">* New Health Concern</span>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* How long have you felt this way */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">How long have you felt this way?</h2>
          <p className="text-gray-600">{data.howLong}</p>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Symptoms */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">List of symptoms</h2>
          <p className="text-gray-600">{data.symptoms.join(', ') || 'No symptoms listed.'}</p>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Medications */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">Active Medications</h2>
          <ul className="text-gray-600 list-disc list-inside">
            {data.medications.length > 0 ? (
              data.medications.map((med, index) => (
                <li key={index}>
                  {med.name} - {med.duration}
                </li>
              ))
            ) : (
              <li>No medications listed.</li>
            )}
          </ul>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Allergies */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">Drug Allergies</h2>
          <p className="text-gray-600">{data.allergies}</p>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Medical Conditions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">Medical Conditions</h2>
          <p className="text-gray-600">{data.conditions}</p>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Surgeries */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">Surgeries</h2>
          <p className="text-gray-600">{data.surgeries}</p>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Family History */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-black">Family History</h2>
          <p className="text-gray-600">{data.familyHistory}</p>
        </div>
        <button onClick={() => onEdit(0)} className="text-blue-600 flex items-center">
          <FaEdit className="mr-1" />
          Edit
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center"
      >
        <span>Next</span>
        <FaArrowRight className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

export default ReviewProfile;
