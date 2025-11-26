  import type { AminoAcid } from './types';

  export const aminoAcids: AminoAcid[] = [
    { code: 'A', name: 'Alanine', color: 'bg-blue-400', groups: ['non-polar'] },
    { code: 'C', name: 'Cysteine', color: 'bg-yellow-400', groups: ['polar', 'non-polar'] },
    { code: 'D', name: 'Aspartic Acid', color: 'bg-red-400', groups: ['acidic', 'polar'] },
    { code: 'E', name: 'Glutamic Acid', color: 'bg-red-500', groups: ['acidic', 'polar'] },
    { code: 'F', name: 'Phenylalanine', color: 'bg-purple-400', groups: ['non-polar'] },
    { code: 'G', name: 'Glycine', color: 'bg-gray-400', groups: ['non-polar'] },
    { code: 'H', name: 'Histidine', color: 'bg-blue-500', groups: ['basic', 'polar'] },
    { code: 'I', name: 'Isoleucine', color: 'bg-green-400', groups: ['non-polar'] },
    { code: 'K', name: 'Lysine', color: 'bg-blue-600', groups: ['basic', 'polar'] },
    { code: 'L', name: 'Leucine', color: 'bg-green-500', groups: ['non-polar'] },
    { code: 'M', name: 'Methionine', color: 'bg-yellow-500', groups: ['non-polar'] },
    { code: 'N', name: 'Asparagine', color: 'bg-pink-400', groups: ['polar'] },
    { code: 'P', name: 'Proline', color: 'bg-orange-400', groups: ['non-polar'] },
    { code: 'Q', name: 'Glutamine', color: 'bg-pink-500', groups: ['polar'] },
    { code: 'R', name: 'Arginine', color: 'bg-blue-700', groups: ['basic', 'polar'] },
    { code: 'S', name: 'Serine', color: 'bg-teal-400', groups: ['polar'] },
    { code: 'T', name: 'Threonine', color: 'bg-teal-500', groups: ['polar'] },
    { code: 'V', name: 'Valine', color: 'bg-green-600', groups: ['non-polar'] },
    { code: 'W', name: 'Tryptophan', color: 'bg-purple-600', groups: ['non-polar', 'polar'] },
    { code: 'Y', name: 'Tyrosine', color: 'bg-purple-500', groups: ['polar'] }
  ];
