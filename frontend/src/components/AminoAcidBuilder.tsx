import React, { useState } from 'react';
import { Trash2, Download } from 'lucide-react';

const aminoAcids = [
  { code: 'A', name: 'Alanine', color: 'bg-blue-400' },
  { code: 'C', name: 'Cysteine', color: 'bg-yellow-400' },
  { code: 'D', name: 'Aspartic Acid', color: 'bg-red-400' },
  { code: 'E', name: 'Glutamic Acid', color: 'bg-red-500' },
  { code: 'F', name: 'Phenylalanine', color: 'bg-purple-400' },
  { code: 'G', name: 'Glycine', color: 'bg-gray-400' },
  { code: 'H', name: 'Histidine', color: 'bg-blue-500' },
  { code: 'I', name: 'Isoleucine', color: 'bg-green-400' },
  { code: 'K', name: 'Lysine', color: 'bg-blue-600' },
  { code: 'L', name: 'Leucine', color: 'bg-green-500' },
  { code: 'M', name: 'Methionine', color: 'bg-yellow-500' },
  { code: 'N', name: 'Asparagine', color: 'bg-pink-400' },
  { code: 'P', name: 'Proline', color: 'bg-orange-400' },
  { code: 'Q', name: 'Glutamine', color: 'bg-pink-500' },
  { code: 'R', name: 'Arginine', color: 'bg-blue-700' },
  { code: 'S', name: 'Serine', color: 'bg-teal-400' },
  { code: 'T', name: 'Threonine', color: 'bg-teal-500' },
  { code: 'V', name: 'Valine', color: 'bg-green-600' },
  { code: 'W', name: 'Tryptophan', color: 'bg-purple-600' },
  { code: 'Y', name: 'Tyrosine', color: 'bg-purple-500' }
];

export default function AminoAcidBuilder() {
  const [chain, setChain] = useState([]);
  const [chainName, setChainName] = useState('');
  const [draggedAcid, setDraggedAcid] = useState(null);
  const [calcResult, setCalcResult] = useState<any>(null);


  const handleDragStart = (acid) => {
    setDraggedAcid(acid);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedAcid) {
      setChain([...chain, { ...draggedAcid, id: Date.now() }]);
      setDraggedAcid(null);
    }
  };

  const removeFromChain = (id) => {
    setChain(chain.filter(item => item.id !== id));
  };

  const clearChain = () => {
    setChain([]);
    setChainName('');
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
    // 1️⃣ Convert the chain into a string (like "ACDEFG")
    const sequence = chain.map(a => a.code).join('');
    if (!sequence) return;
  
    try {
      // 2️⃣ Send POST request to backend API
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/calc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sequence })
      });
  
      // 3️⃣ Parse the response JSON
      const data = await res.json();
  
      // 4️⃣ Store it in React state
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

        {/* Amino Acid Bar */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Amino Acid Library
          </h2>
          <div className="flex flex-wrap gap-2">
            {aminoAcids.map((acid) => (
              <div
                key={acid.code}
                draggable
                onDragStart={() => handleDragStart(acid)}
                className={`${acid.color} text-white px-4 py-3 rounded-lg cursor-move hover:scale-105 transition-transform shadow-md`}
                title={acid.name}
              >
                <div className="font-bold text-lg">{acid.code}</div>
                <div className="text-xs">{acid.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chain Name Input */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sequence Name
          </label>
          <input
            type="text"
            value={chainName}
            onChange={(e) => setChainName(e.target.value)}
            placeholder="Enter sequence name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Drop Zone */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Your Sequence ({chain.length} amino acids)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={exportSequence}
                disabled={chain.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Download size={16} />
                Export
              </button>
              <button
                onClick={clearChain}
                disabled={chain.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 size={16} />
                Clear
              </button>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="min-h-[200px] border-4 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-wrap gap-2 items-start"
          >
            {chain.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
                Drop amino acids here to build your sequence
              </div>
            ) : (
              chain.map((acid, index) => (
                <div
                  key={acid.id}
                  className={`${acid.color} text-white px-4 py-3 rounded-lg shadow-md relative group`}
                  title={acid.name}
                >
                  <div className="font-bold text-lg">{acid.code}</div>
                  <div className="text-xs">{acid.name}</div>
                  <div className="absolute -top-1 -left-1 bg-gray-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {index + 1}
                  </div>
                  <button
                    onClick={() => removeFromChain(acid.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {chain.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-semibold text-gray-700 mb-2">
                Sequence Code:
              </div>
              <div className="font-mono text-lg text-blue-600 break-all">
                {chain.map(a => a.code).join('-')}
              </div>
            </div>
          )}
          {chain.length > 0 && (
            <div className="mt-4">
                <button
                onClick={calculateSequence}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                Calculate Properties
                </button>

                {calcResult && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg text-gray-800 shadow-md">
                    <div><strong>Sequence:</strong> {calcResult.sequence}</div>
                    <div><strong>Molecular Weight:</strong> {calcResult.molecularWeight}</div>
                </div>
                )}
            </div>
            )}

        </div>
      </div>
    </div>
  );
}
