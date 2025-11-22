import React, { useState } from 'react';
import type {
  AminoAcid,
  ChainItem,
  CalculationResult as CalcResultType
} from './types';
import { aminoAcids } from './constants';
import AminoAcidLibrary from './AminoAcidLibrary';
import SequenceNameInput from './SequenceNameInput';
import SequenceDropZone from './SequenceDropZone';
import CalculationResult from './CalculationResult';
import EmptyModelPlaceholder from './EmptyModelPlaceholder';

export default function AminoAcidBuilder() {
  const [chain, setChain] = useState<ChainItem[]>([]);
  const [chainName, setChainName] = useState('');
  const [draggedAcid, setDraggedAcid] = useState<AminoAcid | null>(null);
  const [calcResult, setCalcResult] = useState<CalcResultType | null>(null);

  const handleDragStart = (acid: AminoAcid) => {
    setDraggedAcid(acid);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedAcid) {
      setChain([...chain, { ...draggedAcid, id: Date.now() }]);
      setDraggedAcid(null);
    }
  };

  const removeFromChain = (id: number) => {
    setChain(chain.filter(item => item.id !== id));
  };

  const clearChain = () => {
    setChain([]);
    setChainName('');
    setCalcResult(null);
  };

  const exportSequence = () => {
    const sequence = chain.map(a => a.code).join('');
    const text = `Name: ${chainName || 'Unnamed'}\nSequence: ${sequence}\nLength: ${chain.length} amino acids`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chainName || 'sequence'}.txt`;
    a.click();
  };

  const calculateSequence = async () => {
    const sequence = chain.map(a => a.code).join('');
    if (!sequence) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/calc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence })
      });

      const data = await res.json();
      setCalcResult(data);
    } catch (err) {
      console.error('Error fetching calculation:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Amino Acid Builder
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Drag amino acids to build your protein sequence
        </p>

        <AminoAcidLibrary 
          aminoAcids={aminoAcids}
          onDragStart={handleDragStart}
        />

        <SequenceNameInput 
          value={chainName}
          onChange={setChainName}
        />

        <SequenceDropZone 
          chain={chain}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onRemoveItem={removeFromChain}
          onClear={clearChain}
          onExport={exportSequence}
        />

        <CalculationResult 
          result={calcResult}
          onCalculate={calculateSequence}
          hasSequence={chain.length > 0}
        />

        <EmptyModelPlaceholder 
          hasSequence={chain.length > 0}
        />
      </div>
    </div>
  );
}