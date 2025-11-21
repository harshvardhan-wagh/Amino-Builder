import React from 'react';

interface SequenceNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SequenceNameInput({ value, onChange }: SequenceNameInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Sequence Name
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter sequence name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}