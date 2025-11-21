import React from 'react';
import { Cuboid } from "lucide-react";

interface EmptyModelPlaceholderProps {
  hasSequence: boolean;
}

export default function EmptyModelPlaceholder({ hasSequence }: EmptyModelPlaceholderProps) {
  if (!hasSequence) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        3D Structure Visualization
      </h2>
      <div className="min-h-[300px] border-4 border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
        <Cuboid size={64} className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg font-medium">Coming Soon</p>
        <p className="text-gray-400 text-sm mt-2">
          2D/3D protein structure visualization
        </p>
      </div>
    </div>
  );
}