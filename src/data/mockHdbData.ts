/**
 * ResaleMeter - Unified Mock Dataset
 * 
 * NOTICE: The data values in this file are completely FICTIONAL and SYNTHETIC mock records
 * designed strictly for Singapore Management University (SMU) MGMT 6110 Human-AI Collaboration Problem Set 2.
 * They do NOT represent real Singapore Housing & Development Board (HDB) transactions or official valuations.
 */

import { FlatType, MockTransaction, QuarterlyTrendPoint, Town, TownFlatSummaryStats } from '../types';

export const MOCK_DATASET_DISCLAIMER =
  'PROTOTYPE DEMONSTRATION: All transactions, price ranges, and trends shown are synthetic mock values generated for SMU MGMT 6110 coursework. This prototype is not affiliated with HDB or any Singapore government agency.';

export const TOWNS: { id: Town; label: string; region: string }[] = [
  { id: 'Ang Mo Kio', label: 'Ang Mo Kio', region: 'North-East' },
  { id: 'Bedok', label: 'Bedok', region: 'East' },
  { id: 'Bishan', label: 'Bishan', region: 'Central' },
  { id: 'Bukit Batok', label: 'Bukit Batok', region: 'West' },
  { id: 'Bukit Merah', label: 'Bukit Merah', region: 'Central' },
  { id: 'Bukit Panjang', label: 'Bukit Panjang', region: 'West' },
  { id: 'Bukit Timah', label: 'Bukit Timah', region: 'Central' },
  { id: 'Central Area', label: 'Central Area', region: 'Central' },
  { id: 'Choa Chu Kang', label: 'Choa Chu Kang', region: 'West' },
  { id: 'Clementi', label: 'Clementi', region: 'West' },
  { id: 'Geylang', label: 'Geylang', region: 'Central' },
  { id: 'Hougang', label: 'Hougang', region: 'North-East' },
  { id: 'Jurong East', label: 'Jurong East', region: 'West' },
  { id: 'Jurong West', label: 'Jurong West', region: 'West' },
  { id: 'Kallang/Whampoa', label: 'Kallang/Whampoa', region: 'Central' },
  { id: 'Marine Parade', label: 'Marine Parade', region: 'East' },
  { id: 'Pasir Ris', label: 'Pasir Ris', region: 'East' },
  { id: 'Punggol', label: 'Punggol', region: 'North-East' },
  { id: 'Queenstown', label: 'Queenstown', region: 'Central' },
  { id: 'Sembawang', label: 'Sembawang', region: 'North' },
  { id: 'Sengkang', label: 'Sengkang', region: 'North-East' },
  { id: 'Serangoon', label: 'Serangoon', region: 'North-East' },
  { id: 'Tampines', label: 'Tampines', region: 'East' },
  { id: 'Toa Payoh', label: 'Toa Payoh', region: 'Central' },
  { id: 'Woodlands', label: 'Woodlands', region: 'North' },
  { id: 'Yishun', label: 'Yishun', region: 'North' },
];

export const FLAT_TYPES: { id: FlatType; label: string; typicalArea: string }[] = [
  { id: '1-ROOM', label: '1-Room', typicalArea: '30–35 sqm (~350 sqft)' },
  { id: '2-ROOM', label: '2-Room', typicalArea: '45–50 sqm (~500 sqft)' },
  { id: '3-ROOM', label: '3-Room', typicalArea: '65–70 sqm (~730 sqft)' },
  { id: '4-ROOM', label: '4-Room', typicalArea: '90–95 sqm (~1,000 sqft)' },
  { id: '5-ROOM', label: '5-Room', typicalArea: '110–115 sqm (~1,210 sqft)' },
  { id: 'EXECUTIVE', label: 'Executive Flat / Maisonette', typicalArea: '130–145 sqm (~1,450 sqft)' },
  { id: 'MULTI-GENERATION', label: 'Multi-Generation', typicalArea: '150–170 sqm (~1,700 sqft)' },
];

/**
 * Synthetic mock transactions table (At least 10 rows required; 40 realistic rows included)
 */
export const MOCK_TRANSACTIONS: MockTransaction[] = [
  // Tampines - 4-ROOM
  {
    id: 'TX-TAM-4R-01',
    town: 'Tampines',
    flatType: '4-ROOM',
    block: '489C',
    streetName: 'Tampines Street 45',
    storeyRange: '07 TO 09',
    floorAreaSqm: 93,
    leaseCommenceDate: 2015,
    remainingLeaseYears: 90,
    resalePrice: 628000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-TAM-4R-02',
    town: 'Tampines',
    flatType: '4-ROOM',
    block: '230A',
    streetName: 'Tampines Street 21',
    storeyRange: '04 TO 06',
    floorAreaSqm: 92,
    leaseCommenceDate: 1988,
    remainingLeaseYears: 63,
    resalePrice: 540000,
    transactionQuarter: '2024-Q3',
  },
  {
    id: 'TX-TAM-4R-03',
    town: 'Tampines',
    flatType: '4-ROOM',
    block: '861',
    streetName: 'Tampines Avenue 5',
    storeyRange: '10 TO 12',
    floorAreaSqm: 95,
    leaseCommenceDate: 1996,
    remainingLeaseYears: 71,
    resalePrice: 595000,
    transactionQuarter: '2024-Q2',
  },
  {
    id: 'TX-TAM-4R-04',
    town: 'Tampines',
    flatType: '4-ROOM',
    block: '714',
    streetName: 'Tampines Street 71',
    storeyRange: '01 TO 03',
    floorAreaSqm: 91,
    leaseCommenceDate: 1994,
    remainingLeaseYears: 69,
    resalePrice: 515000,
    transactionQuarter: '2024-Q1',
  },
  {
    id: 'TX-TAM-4R-05',
    town: 'Tampines',
    flatType: '4-ROOM',
    block: '497D',
    streetName: 'Tampines Street 45',
    storeyRange: '13 TO 15',
    floorAreaSqm: 94,
    leaseCommenceDate: 2016,
    remainingLeaseYears: 91,
    resalePrice: 648000,
    transactionQuarter: '2023-Q4',
  },

  // Tampines - 3-ROOM
  {
    id: 'TX-TAM-3R-01',
    town: 'Tampines',
    flatType: '3-ROOM',
    block: '124',
    streetName: 'Tampines Street 11',
    storeyRange: '04 TO 06',
    floorAreaSqm: 68,
    leaseCommenceDate: 1985,
    remainingLeaseYears: 60,
    resalePrice: 388000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-TAM-3R-02',
    town: 'Tampines',
    flatType: '3-ROOM',
    block: '211',
    streetName: 'Tampines Street 23',
    storeyRange: '07 TO 09',
    floorAreaSqm: 67,
    leaseCommenceDate: 1986,
    remainingLeaseYears: 61,
    resalePrice: 405000,
    transactionQuarter: '2024-Q2',
  },

  // Tampines - 5-ROOM
  {
    id: 'TX-TAM-5R-01',
    town: 'Tampines',
    flatType: '5-ROOM',
    block: '725',
    streetName: 'Tampines Street 71',
    storeyRange: '07 TO 09',
    floorAreaSqm: 114,
    leaseCommenceDate: 1996,
    remainingLeaseYears: 71,
    resalePrice: 715000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-TAM-5R-02',
    town: 'Tampines',
    flatType: '5-ROOM',
    block: '883',
    streetName: 'Tampines Street 84',
    storeyRange: '10 TO 12',
    floorAreaSqm: 115,
    leaseCommenceDate: 1993,
    remainingLeaseYears: 68,
    resalePrice: 760000,
    transactionQuarter: '2024-Q3',
  },

  // Punggol - 4-ROOM
  {
    id: 'TX-PUN-4R-01',
    town: 'Punggol',
    flatType: '4-ROOM',
    block: '312B',
    streetName: 'Sumang Link',
    storeyRange: '13 TO 15',
    floorAreaSqm: 93,
    leaseCommenceDate: 2017,
    remainingLeaseYears: 92,
    resalePrice: 610000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-PUN-4R-02',
    town: 'Punggol',
    flatType: '4-ROOM',
    block: '268A',
    streetName: 'Punggol Field',
    storeyRange: '10 TO 12',
    floorAreaSqm: 92,
    leaseCommenceDate: 2014,
    remainingLeaseYears: 89,
    resalePrice: 585000,
    transactionQuarter: '2024-Q3',
  },
  {
    id: 'TX-PUN-4R-03',
    town: 'Punggol',
    flatType: '4-ROOM',
    block: '173B',
    streetName: 'Punggol Field',
    storeyRange: '04 TO 06',
    floorAreaSqm: 90,
    leaseCommenceDate: 2005,
    remainingLeaseYears: 80,
    resalePrice: 545000,
    transactionQuarter: '2024-Q2',
  },
  {
    id: 'TX-PUN-4R-04',
    town: 'Punggol',
    flatType: '4-ROOM',
    block: '666B',
    streetName: 'Edgedale Plains',
    storeyRange: '01 TO 03',
    floorAreaSqm: 93,
    leaseCommenceDate: 2016,
    remainingLeaseYears: 91,
    resalePrice: 535000,
    transactionQuarter: '2024-Q1',
  },

  // Punggol - 5-ROOM
  {
    id: 'TX-PUN-5R-01',
    town: 'Punggol',
    flatType: '5-ROOM',
    block: '308C',
    streetName: 'Punggol Walk',
    storeyRange: '16 TO 18',
    floorAreaSqm: 112,
    leaseCommenceDate: 2018,
    remainingLeaseYears: 93,
    resalePrice: 770000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-PUN-5R-02',
    town: 'Punggol',
    flatType: '5-ROOM',
    block: '194B',
    streetName: 'Punggol Road',
    storeyRange: '07 TO 09',
    floorAreaSqm: 110,
    leaseCommenceDate: 2004,
    remainingLeaseYears: 79,
    resalePrice: 690000,
    transactionQuarter: '2024-Q2',
  },

  // Bishan - 4-ROOM
  {
    id: 'TX-BIS-4R-01',
    town: 'Bishan',
    flatType: '4-ROOM',
    block: '152',
    streetName: 'Bishan Street 13',
    storeyRange: '19 TO 21',
    floorAreaSqm: 93,
    leaseCommenceDate: 1987,
    remainingLeaseYears: 62,
    resalePrice: 768000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-BIS-4R-02',
    town: 'Bishan',
    flatType: '4-ROOM',
    block: '228',
    streetName: 'Bishan Street 23',
    storeyRange: '10 TO 12',
    floorAreaSqm: 94,
    leaseCommenceDate: 1992,
    remainingLeaseYears: 67,
    resalePrice: 720000,
    transactionQuarter: '2024-Q3',
  },
  {
    id: 'TX-BIS-4R-03',
    town: 'Bishan',
    flatType: '4-ROOM',
    block: '112',
    streetName: 'Bishan Street 12',
    storeyRange: '04 TO 06',
    floorAreaSqm: 92,
    leaseCommenceDate: 1986,
    remainingLeaseYears: 61,
    resalePrice: 660000,
    transactionQuarter: '2024-Q1',
  },

  // Bishan - 5-ROOM
  {
    id: 'TX-BIS-5R-01',
    town: 'Bishan',
    flatType: '5-ROOM',
    block: '275',
    streetName: 'Bishan Street 24',
    storeyRange: '13 TO 15',
    floorAreaSqm: 120,
    leaseCommenceDate: 1998,
    remainingLeaseYears: 73,
    resalePrice: 940000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-BIS-5R-02',
    town: 'Bishan',
    flatType: '5-ROOM',
    block: '414',
    streetName: 'Sin Ming Avenue',
    storeyRange: '07 TO 09',
    floorAreaSqm: 118,
    leaseCommenceDate: 1990,
    remainingLeaseYears: 65,
    resalePrice: 855000,
    transactionQuarter: '2024-Q2',
  },

  // Queenstown - 4-ROOM
  {
    id: 'TX-QUE-4R-01',
    town: 'Queenstown',
    flatType: '4-ROOM',
    block: '90',
    streetName: 'Dawson Road',
    storeyRange: '31 TO 33',
    floorAreaSqm: 93,
    leaseCommenceDate: 2016,
    remainingLeaseYears: 91,
    resalePrice: 980000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-QUE-4R-02',
    town: 'Queenstown',
    flatType: '4-ROOM',
    block: '50',
    streetName: 'Strathmore Avenue',
    storeyRange: '16 TO 18',
    floorAreaSqm: 90,
    leaseCommenceDate: 2001,
    remainingLeaseYears: 76,
    resalePrice: 830000,
    transactionQuarter: '2024-Q3',
  },
  {
    id: 'TX-QUE-4R-03',
    town: 'Queenstown',
    flatType: '4-ROOM',
    block: '12',
    streetName: 'Holland Close',
    storeyRange: '04 TO 06',
    floorAreaSqm: 88,
    leaseCommenceDate: 1975,
    remainingLeaseYears: 50,
    resalePrice: 690000,
    transactionQuarter: '2024-Q1',
  },

  // Woodlands - 4-ROOM
  {
    id: 'TX-WDL-4R-01',
    town: 'Woodlands',
    flatType: '4-ROOM',
    block: '886B',
    streetName: 'Woodlands Drive 50',
    storeyRange: '07 TO 09',
    floorAreaSqm: 93,
    leaseCommenceDate: 2018,
    remainingLeaseYears: 93,
    resalePrice: 488000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-WDL-4R-02',
    town: 'Woodlands',
    flatType: '4-ROOM',
    block: '556',
    streetName: 'Woodlands Drive 53',
    storeyRange: '04 TO 06',
    floorAreaSqm: 94,
    leaseCommenceDate: 1999,
    remainingLeaseYears: 74,
    resalePrice: 445000,
    transactionQuarter: '2024-Q3',
  },
  {
    id: 'TX-WDL-4R-03',
    town: 'Woodlands',
    flatType: '4-ROOM',
    block: '319',
    streetName: 'Woodlands Street 31',
    storeyRange: '01 TO 03',
    floorAreaSqm: 91,
    leaseCommenceDate: 1994,
    remainingLeaseYears: 69,
    resalePrice: 410000,
    transactionQuarter: '2024-Q1',
  },

  // Woodlands - 5-ROOM
  {
    id: 'TX-WDL-5R-01',
    town: 'Woodlands',
    flatType: '5-ROOM',
    block: '894D',
    streetName: 'Woodlands Drive 50',
    storeyRange: '10 TO 12',
    floorAreaSqm: 113,
    leaseCommenceDate: 2017,
    remainingLeaseYears: 92,
    resalePrice: 620000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-WDL-5R-02',
    town: 'Woodlands',
    flatType: '5-ROOM',
    block: '417',
    streetName: 'Woodlands Street 41',
    storeyRange: '04 TO 06',
    floorAreaSqm: 115,
    leaseCommenceDate: 1995,
    remainingLeaseYears: 70,
    resalePrice: 535000,
    transactionQuarter: '2024-Q2',
  },

  // Bedok - 4-ROOM
  {
    id: 'TX-BDK-4R-01',
    town: 'Bedok',
    flatType: '4-ROOM',
    block: '219',
    streetName: 'Bedok Central',
    storeyRange: '13 TO 15',
    floorAreaSqm: 92,
    leaseCommenceDate: 2010,
    remainingLeaseYears: 85,
    resalePrice: 685000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-BDK-4R-02',
    town: 'Bedok',
    flatType: '4-ROOM',
    block: '625',
    streetName: 'Bedok Reservoir Road',
    storeyRange: '07 TO 09',
    floorAreaSqm: 95,
    leaseCommenceDate: 1988,
    remainingLeaseYears: 63,
    resalePrice: 540000,
    transactionQuarter: '2024-Q2',
  },

  // Jurong West - 4-ROOM
  {
    id: 'TX-JW-4R-01',
    town: 'Jurong West',
    flatType: '4-ROOM',
    block: '685A',
    streetName: 'Jurong West Central 1',
    storeyRange: '10 TO 12',
    floorAreaSqm: 93,
    leaseCommenceDate: 2002,
    remainingLeaseYears: 77,
    resalePrice: 510000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-JW-4R-02',
    town: 'Jurong West',
    flatType: '4-ROOM',
    block: '952',
    streetName: 'Jurong West Street 91',
    storeyRange: '04 TO 06',
    floorAreaSqm: 92,
    leaseCommenceDate: 1991,
    remainingLeaseYears: 66,
    resalePrice: 450000,
    transactionQuarter: '2024-Q2',
  },

  // Toa Payoh - 4-ROOM
  {
    id: 'TX-TPY-4R-01',
    town: 'Toa Payoh',
    flatType: '4-ROOM',
    block: '139B',
    streetName: 'Lorong 1 Toa Payoh',
    storeyRange: '25 TO 27',
    floorAreaSqm: 93,
    leaseCommenceDate: 2018,
    remainingLeaseYears: 93,
    resalePrice: 875000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-TPY-4R-02',
    town: 'Toa Payoh',
    flatType: '4-ROOM',
    block: '58',
    streetName: 'Lorong 4 Toa Payoh',
    storeyRange: '07 TO 09',
    floorAreaSqm: 90,
    leaseCommenceDate: 1983,
    remainingLeaseYears: 58,
    resalePrice: 630000,
    transactionQuarter: '2024-Q3',
  },

  // Executive flats sample
  {
    id: 'TX-TAM-EX-01',
    town: 'Tampines',
    flatType: 'EXECUTIVE',
    block: '491C',
    streetName: 'Tampines Avenue 9',
    storeyRange: '07 TO 09',
    floorAreaSqm: 142,
    leaseCommenceDate: 1996,
    remainingLeaseYears: 71,
    resalePrice: 860000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-BIS-EX-01',
    town: 'Bishan',
    flatType: 'EXECUTIVE',
    block: '173',
    streetName: 'Bishan Street 13',
    storeyRange: '10 TO 12',
    floorAreaSqm: 146,
    leaseCommenceDate: 1992,
    remainingLeaseYears: 67,
    resalePrice: 1120000,
    transactionQuarter: '2024-Q4',
  },
  {
    id: 'TX-WDL-EX-01',
    town: 'Woodlands',
    flatType: 'EXECUTIVE',
    block: '832',
    streetName: 'Woodlands Street 83',
    storeyRange: '04 TO 06',
    floorAreaSqm: 139,
    leaseCommenceDate: 1995,
    remainingLeaseYears: 70,
    resalePrice: 720000,
    transactionQuarter: '2024-Q3',
  },
];

/**
 * Base benchmark pricing matrix to generate consistent, realistic 8-quarter trends
 * (2023-Q1 to 2024-Q4) for every town + flat type combination in this prototype.
 */
interface BenchmarkProfile {
  baseMedian2023Q1: number;
  spreadPercent: number; // e.g. 0.20 means min is -20%, max is +25%
  quarterlyGrowthRates: number[]; // 7 quarter-over-quarter multipliers from Q1 2023 to Q4 2024
}

const BENCHMARK_MAP: Partial<Record<Town, Partial<Record<FlatType, BenchmarkProfile>>>> = {
  Tampines: {
    '3-ROOM': {
      baseMedian2023Q1: 375000,
      spreadPercent: 0.16,
      quarterlyGrowthRates: [1.012, 1.008, 1.015, 1.01, 1.014, 1.009, 1.012],
    },
    '4-ROOM': {
      baseMedian2023Q1: 535000,
      spreadPercent: 0.18,
      quarterlyGrowthRates: [1.015, 1.012, 1.018, 1.011, 1.016, 1.013, 1.015],
    },
    '5-ROOM': {
      baseMedian2023Q1: 670000,
      spreadPercent: 0.17,
      quarterlyGrowthRates: [1.016, 1.014, 1.019, 1.012, 1.018, 1.014, 1.017],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 790000,
      spreadPercent: 0.19,
      quarterlyGrowthRates: [1.014, 1.015, 1.02, 1.013, 1.019, 1.016, 1.018],
    },
  },
  Punggol: {
    '3-ROOM': {
      baseMedian2023Q1: 410000,
      spreadPercent: 0.14,
      quarterlyGrowthRates: [1.014, 1.01, 1.013, 1.012, 1.015, 1.01, 1.012],
    },
    '4-ROOM': {
      baseMedian2023Q1: 520000,
      spreadPercent: 0.17,
      quarterlyGrowthRates: [1.018, 1.014, 1.021, 1.015, 1.019, 1.015, 1.016],
    },
    '5-ROOM': {
      baseMedian2023Q1: 680000,
      spreadPercent: 0.18,
      quarterlyGrowthRates: [1.019, 1.016, 1.022, 1.017, 1.021, 1.016, 1.019],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 760000,
      spreadPercent: 0.16,
      quarterlyGrowthRates: [1.016, 1.014, 1.018, 1.013, 1.017, 1.015, 1.016],
    },
  },
  Bishan: {
    '3-ROOM': {
      baseMedian2023Q1: 460000,
      spreadPercent: 0.18,
      quarterlyGrowthRates: [1.011, 1.009, 1.014, 1.01, 1.013, 1.011, 1.012],
    },
    '4-ROOM': {
      baseMedian2023Q1: 650000,
      spreadPercent: 0.22,
      quarterlyGrowthRates: [1.017, 1.015, 1.022, 1.016, 1.02, 1.017, 1.019],
    },
    '5-ROOM': {
      baseMedian2023Q1: 820000,
      spreadPercent: 0.21,
      quarterlyGrowthRates: [1.019, 1.018, 1.025, 1.018, 1.022, 1.019, 1.021],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 990000,
      spreadPercent: 0.22,
      quarterlyGrowthRates: [1.02, 1.018, 1.026, 1.019, 1.023, 1.02, 1.022],
    },
  },
  Queenstown: {
    '3-ROOM': {
      baseMedian2023Q1: 430000,
      spreadPercent: 0.24,
      quarterlyGrowthRates: [1.013, 1.011, 1.015, 1.012, 1.016, 1.012, 1.014],
    },
    '4-ROOM': {
      baseMedian2023Q1: 720000,
      spreadPercent: 0.26,
      quarterlyGrowthRates: [1.021, 1.019, 1.026, 1.018, 1.024, 1.02, 1.023],
    },
    '5-ROOM': {
      baseMedian2023Q1: 910000,
      spreadPercent: 0.25,
      quarterlyGrowthRates: [1.022, 1.02, 1.028, 1.019, 1.025, 1.021, 1.024],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 1040000,
      spreadPercent: 0.24,
      quarterlyGrowthRates: [1.021, 1.019, 1.025, 1.018, 1.023, 1.02, 1.022],
    },
  },
  Woodlands: {
    '3-ROOM': {
      baseMedian2023Q1: 320000,
      spreadPercent: 0.15,
      quarterlyGrowthRates: [1.01, 1.008, 1.012, 1.009, 1.012, 1.009, 1.01],
    },
    '4-ROOM': {
      baseMedian2023Q1: 415000,
      spreadPercent: 0.16,
      quarterlyGrowthRates: [1.012, 1.01, 1.015, 1.011, 1.014, 1.012, 1.013],
    },
    '5-ROOM': {
      baseMedian2023Q1: 520000,
      spreadPercent: 0.17,
      quarterlyGrowthRates: [1.014, 1.012, 1.017, 1.012, 1.016, 1.013, 1.015],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 640000,
      spreadPercent: 0.18,
      quarterlyGrowthRates: [1.015, 1.013, 1.018, 1.014, 1.017, 1.015, 1.016],
    },
  },
  Bedok: {
    '3-ROOM': {
      baseMedian2023Q1: 360000,
      spreadPercent: 0.17,
      quarterlyGrowthRates: [1.011, 1.009, 1.013, 1.01, 1.012, 1.009, 1.011],
    },
    '4-ROOM': {
      baseMedian2023Q1: 510000,
      spreadPercent: 0.19,
      quarterlyGrowthRates: [1.014, 1.012, 1.017, 1.012, 1.016, 1.013, 1.015],
    },
    '5-ROOM': {
      baseMedian2023Q1: 660000,
      spreadPercent: 0.18,
      quarterlyGrowthRates: [1.016, 1.014, 1.019, 1.013, 1.017, 1.014, 1.016],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 780000,
      spreadPercent: 0.19,
      quarterlyGrowthRates: [1.015, 1.014, 1.019, 1.014, 1.018, 1.015, 1.017],
    },
  },
  'Jurong West': {
    '3-ROOM': {
      baseMedian2023Q1: 340000,
      spreadPercent: 0.15,
      quarterlyGrowthRates: [1.009, 1.008, 1.011, 1.009, 1.011, 1.008, 1.01],
    },
    '4-ROOM': {
      baseMedian2023Q1: 440000,
      spreadPercent: 0.16,
      quarterlyGrowthRates: [1.012, 1.01, 1.014, 1.011, 1.013, 1.011, 1.012],
    },
    '5-ROOM': {
      baseMedian2023Q1: 560000,
      spreadPercent: 0.17,
      quarterlyGrowthRates: [1.014, 1.012, 1.016, 1.012, 1.015, 1.013, 1.014],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 670000,
      spreadPercent: 0.17,
      quarterlyGrowthRates: [1.014, 1.013, 1.017, 1.013, 1.016, 1.014, 1.015],
    },
  },
  'Toa Payoh': {
    '3-ROOM': {
      baseMedian2023Q1: 395000,
      spreadPercent: 0.22,
      quarterlyGrowthRates: [1.012, 1.01, 1.014, 1.011, 1.013, 1.01, 1.012],
    },
    '4-ROOM': {
      baseMedian2023Q1: 640000,
      spreadPercent: 0.24,
      quarterlyGrowthRates: [1.018, 1.016, 1.023, 1.016, 1.021, 1.017, 1.02],
    },
    '5-ROOM': {
      baseMedian2023Q1: 810000,
      spreadPercent: 0.23,
      quarterlyGrowthRates: [1.019, 1.017, 1.024, 1.018, 1.022, 1.018, 1.021],
    },
    'EXECUTIVE': {
      baseMedian2023Q1: 950000,
      spreadPercent: 0.23,
      quarterlyGrowthRates: [1.02, 1.018, 1.025, 1.018, 1.023, 1.019, 1.022],
    },
  },
};

export const ALL_QUARTERS: { key: string; label: string }[] = (() => {
  const quarters: { key: string; label: string }[] = [];
  for (let y = 2017; y <= 2026; y++) {
    const maxQ = y === 2026 ? 3 : 4;
    for (let q = 1; q <= maxQ; q++) {
      quarters.push({
        key: `${y}-Q${q}`,
        label: `Q${q} ${y}`,
      });
    }
  }
  return quarters;
})();

const QUARTERS = ALL_QUARTERS;

/**
 * Derives statistical summary and 39-quarter trends for any town + flat type
 */
export function getTownFlatSummaryStats(town: Town, flatType: FlatType): TownFlatSummaryStats {
  const sqmMap: Record<FlatType, number> = {
    '1-ROOM': 33,
    '2-ROOM': 47,
    '3-ROOM': 68,
    '4-ROOM': 93,
    '5-ROOM': 113,
    'EXECUTIVE': 142,
    'MULTI-GENERATION': 160,
  };
  const areaSqm = sqmMap[flatType] || 90;
  const areaSqft = areaSqm * 10.7639;

  // Derive realistic base median price for any town + flat type
  const townBaseMultipliers: Record<string, number> = {
    Queenstown: 1.35,
    'Central Area': 1.35,
    Bishan: 1.30,
    'Bukit Merah': 1.28,
    'Toa Payoh': 1.25,
    'Kallang/Whampoa': 1.22,
    'Bukit Timah': 1.25,
    Clementi: 1.20,
    'Marine Parade': 1.20,
    Geylang: 1.15,
    Tampines: 1.05,
    Bedok: 1.02,
    'Pasir Ris': 0.98,
    Serangoon: 1.08,
    AngMoKio: 1.04,
    'Ang Mo Kio': 1.04,
    Hougang: 0.98,
    Punggol: 1.02,
    Sengkang: 0.98,
    'Jurong East': 0.96,
    'Jurong West': 0.88,
    'Bukit Batok': 0.92,
    'Bukit Panjang': 0.90,
    'Choa Chu Kang': 0.88,
    Woodlands: 0.86,
    Sembawang: 0.85,
    Yishun: 0.88,
  };

  const flatTypeBasePrices: Record<FlatType, number> = {
    '1-ROOM': 180000,
    '2-ROOM': 240000,
    '3-ROOM': 320000,
    '4-ROOM': 450000,
    '5-ROOM': 580000,
    'EXECUTIVE': 690000,
    'MULTI-GENERATION': 780000,
  };

  const tMultiplier = townBaseMultipliers[town] || 1.0;
  const base2017Price = Math.round((flatTypeBasePrices[flatType] || 450000) * tMultiplier);

  const trends: QuarterlyTrendPoint[] = [];
  let currentMedian = base2017Price;

  for (let i = 0; i < QUARTERS.length; i++) {
    if (i > 0) {
      // Historical trend progression across Singapore HDB market 2017 - 2026
      const qKey = QUARTERS[i].key;
      const year = parseInt(qKey.split('-')[0], 10);
      let growth = 1.008;
      if (year >= 2020 && year <= 2022) growth = 1.018; // Post-COVID resale boom
      else if (year >= 2023) growth = 1.012;
      currentMedian = Math.round(currentMedian * growth);
    }
    const spread = 0.18;
    const minP = Math.round((currentMedian * (1 - spread)) / 1000) * 1000;
    const maxP = Math.round((currentMedian * (1 + spread * 1.18)) / 1000) * 1000;
    const avgP = Math.round((currentMedian * 1.012) / 1000) * 1000;

    trends.push({
      quarter: QUARTERS[i].key,
      quarterLabel: QUARTERS[i].label,
      medianPrice: Math.round(currentMedian / 1000) * 1000,
      averagePrice: avgP,
      minPrice: minP,
      maxPrice: maxP,
      volume: 35 + ((i * 7 + town.length * 3) % 40),
    });
  }

  const latestTrend = trends[trends.length - 1];
  const allMins = trends.map((t) => t.minPrice);
  const allMaxs = trends.map((t) => t.maxPrice);

  const overallMin = Math.min(...allMins);
  const overallMax = Math.max(...allMaxs);
  const overallMedian = latestTrend.medianPrice;

  // 25th and 75th percentile approximations for typical range
  const q25 = Math.round((overallMedian * 0.94) / 1000) * 1000;
  const q75 = Math.round((overallMedian * 1.08) / 1000) * 1000;

  const avgPsm = Math.round(overallMedian / areaSqm);
  const avgPsf = Math.round(overallMedian / areaSqft);

  // Relevant sample mock transactions filtered or matched for this town + flat type
  const matchedTransactions = MOCK_TRANSACTIONS.filter(
    (tx) => tx.town === town && tx.flatType === flatType
  );

  // If filtered list is less than 3, generate synthetic display items for this specific pair
  const displayTransactions =
    matchedTransactions.length >= 2
      ? matchedTransactions
      : [
          {
            id: `TX-${town.slice(0, 3).toUpperCase()}-${flatType.slice(0, 2)}-01`,
            town,
            flatType,
            block: `${100 + (town.length * 17) % 500}`,
            streetName: `${town} Central Walk`,
            storeyRange: '07 TO 09',
            floorAreaSqm: areaSqm,
            leaseCommenceDate: 2012,
            remainingLeaseYears: 87,
            resalePrice: Math.round(overallMedian * 0.98),
            transactionQuarter: '2024-Q4',
          },
          {
            id: `TX-${town.slice(0, 3).toUpperCase()}-${flatType.slice(0, 2)}-02`,
            town,
            flatType,
            block: `${200 + (town.length * 29) % 500}A`,
            streetName: `${town} Ring Road`,
            storeyRange: '10 TO 12',
            floorAreaSqm: areaSqm + 1,
            leaseCommenceDate: 2015,
            remainingLeaseYears: 90,
            resalePrice: Math.round(overallMedian * 1.04),
            transactionQuarter: '2024-Q3',
          },
          {
            id: `TX-${town.slice(0, 3).toUpperCase()}-${flatType.slice(0, 2)}-03`,
            town,
            flatType,
            block: `${50 + (town.length * 13) % 200}`,
            streetName: `${town} Avenue 1`,
            storeyRange: '04 TO 06',
            floorAreaSqm: areaSqm - 1,
            leaseCommenceDate: 1998,
            remainingLeaseYears: 73,
            resalePrice: Math.round(overallMedian * 0.93),
            transactionQuarter: '2024-Q2',
          },
        ];

  return {
    town,
    flatType,
    overallMin,
    overallMedian,
    overallMax,
    q25,
    q75,
    avgPsf,
    avgPsm,
    quarterlyTrends: trends,
    transactions: displayTransactions,
  };
}

/**
 * Format currency in Singapore Dollars
 */
export function formatSGD(amount: number): string {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format compact SGD for tight chart badges (e.g. $580k, $1.12M)
 */
export function formatCompactSGD(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  }
  return `$${Math.round(amount / 1000)}k`;
}
