import React from 'react';
import type { CalculationResult as CalcResultType } from './types';

interface CalculationResultProps {
  result: CalcResultType | null;
  onCalculate: () => void;
  hasSequence: boolean;
}

export default function CalculationResult({ result, onCalculate, hasSequence }: CalculationResultProps) {
  if (!hasSequence) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Sequence Properties
      </h2>
      
      <button
        onClick={onCalculate}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Calculate Properties
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg text-gray-800 shadow-md space-y-2">
          <div><strong>Sequence:</strong> {result.sequence}</div>
          <div><strong>Length:</strong> {result.length} amino acids</div>
          <div><strong>Molecular Weight:</strong> {result.molecularWeight} Da</div>
          <div><strong>Molecular Formula:</strong> {result.molecularFormula}</div>
          <div><strong>Volume:</strong> {result.volume} Å³</div>
          <div><strong>Net Charge:</strong> {result.netCharge}</div>

          <div className="mt-2">
            <strong>Amino Acid Composition:</strong>
            <ul className="ml-4 list-disc">
              <li>Acidic: {result.composition.Acidic}</li>
              <li>Basic: {result.composition.Basic}</li>
              <li>Polar Uncharged: {result.composition.Polar_Uncharged}</li>
              <li>Nonpolar: {result.composition.Nonpolar}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}