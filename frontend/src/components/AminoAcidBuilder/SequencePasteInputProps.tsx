interface SequencePasteInputProps {
  onPasteSequence: (seq: string) => void;
}

export default function SequencePasteInput({ onPasteSequence }: SequencePasteInputProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Paste Sequence (single-letter codes)
      </label>

      <input
        type="text"
        placeholder="Example: MKWVTFISLL..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onPasteSequence(e.target.value.toUpperCase())}
      />
    </div>
  );
}
