'use client';

import React, { useState } from 'react';
import { FaPlus, FaArrowRight } from 'react-icons/fa';

interface HealthProfileFormProps {
  initialData: HealthProfileData;
  onNext: (data: HealthProfileData) => void;
}

export interface HealthProfileData {
  healthConcern: string;
  howLong: string;
  symptoms: string[];
  medications: { name: string; duration: string }[];
  allergies: string;
  conditions: string;
  surgeries: string;
  familyHistory: string;
}

const HealthProfileForm: React.FC<HealthProfileFormProps> = ({ onNext }) => {
  const [days, setDays] = useState<number>(3);
  const [duration, setDuration] = useState<string>('Days');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [medications, setMedications] = useState<{ name: string; duration: string }[]>([]);
  const [showMedicationInput, setShowMedicationInput] = useState<boolean>(false);
  const [allergies, setAllergies] = useState<string>('No');
  const [conditions, setConditions] = useState<string>('No');
  const [surgeries, setSurgeries] = useState<string>('No');
  const [familyHistory, setFamilyHistory] = useState<string>('No');

  const symptomOptions = [
    'Difficulty sleeping',
    'Fatigue / weakness',
    'Fever',
    'Loss of appetite',
    'Mood changes',
    'Night sweats',
    'Congestion',
    'Ear pain',
    'Eye redness',
    'Headaches',
  ];

  const handleAddMedication = () => {
    setShowMedicationInput(true);
    setMedications([...medications, { name: '', duration: '' }]);
  };

  const handleMedicationChange = (
    index: number,
    field: 'name' | 'duration',
    value: string
  ) => {
    const updatedMeds = [...medications];
    updatedMeds[index][field] = value;
    setMedications(updatedMeds);
  };

  const handleDeleteMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleSymptomChange = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profileData: HealthProfileData = {
      healthConcern: 'New Health Concern',
      howLong: `${days} ${duration}`,
      symptoms,
      medications: medications.filter((med) => med.name.trim() !== ''),
      allergies,
      conditions,
      surgeries,
      familyHistory,
    };
    onNext(profileData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-pink-100 p-4 rounded-md flex items-center">
        <span className="text-red-600 font-bold">* New Health Concern</span>
      </div>

      {/* How long have you felt this way */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          How long have you felt this way?
        </label>
        <div className="flex items-center space-x-4 text-black">
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-24 p-2 border border-gray-300 rounded-md"
            required
            min={0}
          />
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
            <option value="Months">Months</option>
          </select>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Do you have any of these symptoms?</label>
        <div className="grid grid-cols-2 gap-4">
          {symptomOptions.map((symptom) => (
            <label key={symptom} className="flex items-center">
              <input
                type="checkbox"
                checked={symptoms.includes(symptom)}
                onChange={() => handleSymptomChange(symptom)}
                className="mr-2"
              />
              <span className="text-gray-600">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Please list any medications you are currently taking.
        </label>
        {showMedicationInput && medications.map((medication, index) => (
          <div key={index} className="flex items-center text-black space-x-4 mb-2">
            <input
              type="text"
              value={medication.name}
              onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
              placeholder={`Medication ${index + 1}`}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              required
            />
            <select
              value={medication.duration}
              onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
              className="w-40 p-2 border border-gray-300 rounded-md text-black"
              required
            >
              <option value="">How Long</option>
              <option value="Days">Days</option>
              <option value="Weeks">Weeks</option>
              <option value="Months">Months</option>
            </select>
            <button
              type="button"
              onClick={() => handleDeleteMedication(index)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddMedication}
          className="flex items-center text-blue-600 mt-2"
        >
          <FaPlus className="mr-2" />
          Add new medication
        </button>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Are you allergic to any of the drugs listed?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="allergies"
              value="Yes"
              checked={allergies === 'Yes'}
              onChange={() => setAllergies('Yes')}
              className="mr-2"
              required
            />
            Yes
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="allergies"
              value="No"
              checked={allergies === 'No'}
              onChange={() => setAllergies('No')}
              className="mr-2"
              required
            />
            No
          </label>
        </div>
      </div>

      {/* Medical Conditions */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Do you have any medical conditions?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="conditions"
              value="Yes"
              checked={conditions === 'Yes'}
              onChange={() => setConditions('Yes')}
              className="mr-2"
              required
            />
            Yes
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="conditions"
              value="No"
              checked={conditions === 'No'}
              onChange={() => setConditions('No')}
              className="mr-2"
              required
            />
            No
          </label>
        </div>
      </div>

      {/* Surgeries */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">Have you had any surgeries?</label>
        <div className="flex space-x-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="surgeries"
              value="Yes"
              checked={surgeries === 'Yes'}
              onChange={() => setSurgeries('Yes')}
              className="mr-2"
              required
            />
            Yes
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="surgeries"
              value="No"
              checked={surgeries === 'No'}
              onChange={() => setSurgeries('No')}
              className="mr-2"
              required
            />
            No
          </label>
        </div>
      </div>

      {/* Family History */}
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Do you have any family history of medical conditions?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="familyHistory"
              value="Yes"
              checked={familyHistory === 'Yes'}
              onChange={() => setFamilyHistory('Yes')}
              className="mr-2"
              required
            />
            Yes
          </label>
          <label className="flex items-center text-black">
            <input
              type="radio"
              name="familyHistory"
              value="No"
              checked={familyHistory === 'No'}
              onChange={() => setFamilyHistory('No')}
              className="mr-2"
              required
            />
            No
          </label>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center">
        Next
        <FaArrowRight className="ml-2" />
      </button>
    </form>
  );
};

export default HealthProfileForm;
