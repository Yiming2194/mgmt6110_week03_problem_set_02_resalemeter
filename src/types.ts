export type Town =
  | 'Ang Mo Kio'
  | 'Bedok'
  | 'Bishan'
  | 'Bukit Batok'
  | 'Bukit Merah'
  | 'Bukit Panjang'
  | 'Bukit Timah'
  | 'Central Area'
  | 'Choa Chu Kang'
  | 'Clementi'
  | 'Geylang'
  | 'Hougang'
  | 'Jurong East'
  | 'Jurong West'
  | 'Kallang/Whampoa'
  | 'Marine Parade'
  | 'Pasir Ris'
  | 'Punggol'
  | 'Queenstown'
  | 'Sembawang'
  | 'Sengkang'
  | 'Serangoon'
  | 'Tampines'
  | 'Toa Payoh'
  | 'Woodlands'
  | 'Yishun';

export type FlatType =
  | '1-ROOM'
  | '2-ROOM'
  | '3-ROOM'
  | '4-ROOM'
  | '5-ROOM'
  | 'EXECUTIVE'
  | 'MULTI-GENERATION';

export interface MockTransaction {
  id: string;
  town: Town;
  flatType: FlatType;
  block: string;
  streetName: string;
  storeyRange: string;
  floorAreaSqm: number;
  leaseCommenceDate: number;
  remainingLeaseYears: number;
  resalePrice: number;
  transactionQuarter: string;
}

export interface QuarterlyTrendPoint {
  quarter: string; // e.g. '2023-Q1'
  quarterLabel: string; // e.g. 'Q1 23'
  medianPrice: number;
  averagePrice: number;
  minPrice: number;
  maxPrice: number;
  volume: number;
}

export interface TownFlatSummaryStats {
  town: Town;
  flatType: FlatType;
  overallMin: number;
  overallMedian: number;
  overallMax: number;
  q25: number;
  q75: number;
  avgPsf: number;
  avgPsm: number;
  quarterlyTrends: QuarterlyTrendPoint[];
  transactions: MockTransaction[];
}

export interface ComparisonItem {
  id: string;
  town: Town;
  flatType: FlatType;
  colorKey: 'blue' | 'emerald' | 'amber';
}
