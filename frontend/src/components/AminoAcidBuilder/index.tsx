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
  const [history, setHistory] = useState<ChainItem[][]>([]);
  const [future, setFuture] = useState<ChainItem[][]>([]);
  const [activeFilter, setActiveFilter] = useState("all");



  const insertPastedSequence = (seq: string) => {
    const chars = seq.toUpperCase().replace(/[^A-Z]/g, '').split('');

    const mapped = chars
      .map(code => aminoAcids.find(a => a.code === code))
      .filter(Boolean)
      .map(acid => ({ ...acid!, id: Date.now() + Math.random() }));

    if (mapped.length > 0) {
      setHistory(prev => [...prev, chain]);
      setFuture([]);
      setChain(mapped);
    }
  };

  const handleDragStart = (acid: AminoAcid) => {
    setDraggedAcid(acid);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedAcid) {
      setHistory(prev => [...prev, chain]);
      setFuture([]);

      setChain([...chain, { ...draggedAcid, id: Date.now() }]);
      setDraggedAcid(null);
    }
  };

  const removeFromChain = (id: number) => {
    setHistory(prev => [...prev, chain]);
    setFuture([]);
    setChain(chain.filter(item => item.id !== id));
  };

  const clearChain = () => {
    setHistory(prev => [...prev, chain]);
    setFuture([]);
    setChain([]);
    setChainName('');
    setCalcResult(null);
  };

  const undo = () => {
  if (history.length === 0) return;
  const previous = history[history.length - 1];

  setHistory(history.slice(0, -1));
  setFuture([chain, ...future]);
  setChain(previous);
};

const redo = () => {
  if (future.length === 0) return;
  const next = future[0];

  setFuture(future.slice(1));
  setHistory(prev => [...prev, chain]);
  setChain(next);
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
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <SequenceNameInput 
          value={chainName}
          onChange={(val) => {
            setChainName(val);
            if (val.trim() === "") {
              clearChain();
              return;
            }
          insertPastedSequence(val);   
          }}
        />

        <SequenceDropZone 
          chain={chain}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onRemoveItem={removeFromChain}
          onClear={clearChain}
          onExport={exportSequence}
          onUndo={undo}
          onRedo={redo}
          canUndo={history.length > 0}
          canRedo={future.length > 0}
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