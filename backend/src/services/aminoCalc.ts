// Amino acid classification groups
export const AA_CLASSIFICATION = {
  acidic: ['D', 'E'],
  basic: ['R', 'K', 'H'],
  polar_uncharged: ['S', 'T', 'N', 'Q', 'C', 'Y'],
  nonpolar: ['A', 'V', 'I', 'L', 'M', 'F', 'W', 'P', 'G']
};

// Monoisotopic masses of amino acids
export const MONOISOTOPIC_MASSES: Record<string, number> = {
  'A': 71.037114, 'R': 156.101111, 'N': 114.042927, 'D': 115.026943,
  'C': 103.009185, 'Q': 128.058578, 'E': 129.042593, 'G': 57.021464,
  'H': 137.058912, 'I': 113.084064, 'L': 113.084064, 'K': 128.094963,
  'M': 131.040485, 'F': 147.068414, 'P': 97.052764, 'S': 87.032028,
  'T': 101.047679, 'W': 186.079313, 'Y': 163.063329, 'V': 99.068414
};

// Amino acid volumes
export const AA_VOLUMES: Record<string, number> = {
  'A': 88.6, 'R': 173.4, 'N': 114.1, 'D': 111.1, 'C': 108.5,
  'Q': 143.8, 'E': 138.4, 'G': 60.1, 'H': 153.2, 'I': 166.7,
  'L': 166.7, 'K': 168.6, 'M': 162.9, 'F': 189.9, 'P': 112.7,
  'S': 89.0, 'T': 116.1, 'W': 227.8, 'Y': 193.6, 'V': 140.0
};

// Molecular formulas for each amino acid
export const AA_FORMULAS: Record<string, { C: number; H: number; N: number; O: number; S: number }> = {
  'A': { C: 3, H: 5, N: 1, O: 1, S: 0 },
  'R': { C: 6, H: 12, N: 4, O: 1, S: 0 },
  'N': { C: 4, H: 6, N: 2, O: 2, S: 0 },
  'D': { C: 4, H: 5, N: 1, O: 3, S: 0 },
  'C': { C: 3, H: 5, N: 1, O: 1, S: 1 },
  'Q': { C: 5, H: 8, N: 2, O: 2, S: 0 },
  'E': { C: 5, H: 7, N: 1, O: 3, S: 0 },
  'G': { C: 2, H: 3, N: 1, O: 1, S: 0 },
  'H': { C: 6, H: 7, N: 3, O: 1, S: 0 },
  'I': { C: 6, H: 11, N: 1, O: 1, S: 0 },
  'L': { C: 6, H: 11, N: 1, O: 1, S: 0 },
  'K': { C: 6, H: 12, N: 2, O: 1, S: 0 },
  'M': { C: 5, H: 9, N: 1, O: 1, S: 1 },
  'F': { C: 9, H: 9, N: 1, O: 1, S: 0 },
  'P': { C: 5, H: 7, N: 1, O: 1, S: 0 },
  'S': { C: 3, H: 5, N: 1, O: 2, S: 0 },
  'T': { C: 4, H: 7, N: 1, O: 2, S: 0 },
  'W': { C: 11, H: 10, N: 2, O: 1, S: 0 },
  'Y': { C: 9, H: 9, N: 1, O: 2, S: 0 },
  'V': { C: 5, H: 9, N: 1, O: 1, S: 0 }
};

// -------------------------------------
// Calculation functions
// -------------------------------------

export function calculateMolecularWeight(sequence: string): number {
  let mass = 18.010565; // H2O for N/C terminals

  for (const aa of sequence) {
    mass += MONOISOTOPIC_MASSES[aa] || 0;
  }

  return parseFloat(mass.toFixed(4));
}

export function calculateMolecularFormula(sequence: string): string {
  const formula = { C: 0, H: 2, N: 0, O: 1, S: 0 };

  for (const aa of sequence) {
    const data = AA_FORMULAS[aa];
    if (data) {
      formula.C += data.C;
      formula.H += data.H;
      formula.N += data.N;
      formula.O += data.O;
      formula.S += data.S;
    }
  }

  let output = "";
  if (formula.C) output += `C${formula.C}`;
  if (formula.H) output += `H${formula.H}`;
  if (formula.N) output += `N${formula.N}`;
  if (formula.O) output += `O${formula.O}`;
  if (formula.S) output += `S${formula.S}`;

  return output;
}

export function calculateVolume(sequence: string): number {
  let volume = 0;

  for (const aa of sequence) {
    volume += AA_VOLUMES[aa] || 0;
  }

  return parseFloat(volume.toFixed(2));
}

export function calculateNetCharge(sequence: string): number {
  let positive = 0;
  let negative = 0;

  for (const aa of sequence) {
    if (['R', 'K', 'H'].includes(aa)) positive++;
    if (['D', 'E'].includes(aa)) negative++;
  }

  return positive - negative;
}

export function classifyAminoAcids(sequence: string) {
  const counts = {
    Acidic: 0,
    Basic: 0,
    Polar_Uncharged: 0,
    Nonpolar: 0
  };

  for (const aa of sequence) {
    if (AA_CLASSIFICATION.acidic.includes(aa)) counts.Acidic++;
    else if (AA_CLASSIFICATION.basic.includes(aa)) counts.Basic++;
    else if (AA_CLASSIFICATION.polar_uncharged.includes(aa)) counts.Polar_Uncharged++;
    else if (AA_CLASSIFICATION.nonpolar.includes(aa)) counts.Nonpolar++;
  }

  return counts;
}

// Master calculation function
export function calculateAllProperties(sequence: string) {
  if (!sequence || sequence.length === 0) return null;

  return {
    sequence,
    length: sequence.length,
    molecularWeight: calculateMolecularWeight(sequence),
    molecularFormula: calculateMolecularFormula(sequence),
    volume: calculateVolume(sequence),
    netCharge: calculateNetCharge(sequence),
    composition: classifyAminoAcids(sequence)
  };
}
