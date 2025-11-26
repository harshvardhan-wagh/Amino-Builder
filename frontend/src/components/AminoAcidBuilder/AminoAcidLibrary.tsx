import type { AminoAcid } from './types';

interface AminoAcidLibraryProps {
  aminoAcids: AminoAcid[];
  onDragStart: (acid: AminoAcid) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function AminoAcidLibrary({
  aminoAcids,
  onDragStart,
  activeFilter,
  onFilterChange
}: AminoAcidLibraryProps) {

  
  const filterAcids = () => {
    if (activeFilter === "all") return aminoAcids;

    return aminoAcids.filter(a =>
      a.groups.includes(activeFilter) 
    );
  };

  const filtered = filterAcids();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Amino Acid Library
      </h2>

      <div className="flex gap-2 mb-4">
        {["all", "polar", "non-polar", "acidic", "basic"].map(category => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-3 py-1 rounded-lg border 
              ${activeFilter === category ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map((acid) => (
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
