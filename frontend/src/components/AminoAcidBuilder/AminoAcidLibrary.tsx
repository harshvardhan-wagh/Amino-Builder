import type { AminoAcid } from './types';

interface AminoAcidLibraryProps {
  aminoAcids: AminoAcid[];
  onDragStart: (acid: AminoAcid) => void;
}

export default function AminoAcidLibrary({ aminoAcids, onDragStart }: AminoAcidLibraryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Amino Acid Library
      </h2>
      <div className="flex flex-wrap gap-2">
        {aminoAcids.map((acid) => (
          <div
            key={acid.code}
            draggable
            onDragStart={() => onDragStart(acid)}
            className={`${acid.color} text-white px-4 py-3 rounded-lg cursor-move hover:scale-105 transition-transform shadow-md`}
            title={acid.name}
          >
            <div className="font-bold text-lg">{acid.code}</div>
            <div className="text-xs">{acid.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}