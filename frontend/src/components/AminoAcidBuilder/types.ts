export interface AminoAcid {
    code: string;
    name: string;
    color: string;
  }
  
  export interface ChainItem extends AminoAcid {
    id: number;
  }
  
  export interface CalculationResult {
    sequence: string;
    length: number;
    molecularWeight: number;
    molecularFormula: string;
    volume: number;
    netCharge: number;
    composition: {
      Acidic: number;
      Basic: number;
      Polar_Uncharged: number;
      Nonpolar: number;
    };
  }