import React from 'react';
import { Trash2, Download } from 'lucide-react';
import type { ChainItem } from './types';

interface SequenceDropZoneProps {
  chain: ChainItem[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onRemoveItem: (id: number) => void;
  onClear: () => void;
  onExport: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;

}

export default function SequenceDropZone({
  chain,
  onDragOver,
  onDrop,
  onRemoveItem,
  onClear,
  onExport,
  onUndo,
  onRedo,
  canUndo,
  canRedo
}: SequenceDropZoneProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Your Sequence ({chain.length} amino acids)
        </h2>

        <div className="flex gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg 
               hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
               hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Redo
          </button>
          <button
            onClick={onExport}
            disabled={chain.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Download size={16} />
            Export
          </button>
          
          <button
            onClick={onClear}
            disabled={chain.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>

      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
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
                onClick={() => onRemoveItem(acid.id)}
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
    </div>
  );
}