import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  TrendingUp,
  SlidersHorizontal,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  Calendar,
  MapPin,
  AlertTriangle,
  WifiOff,
  SearchX,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import {
  ALL_QUARTERS,
  FLAT_TYPES,
  TOWNS,
  formatCompactSGD,
  formatSGD,
  getTownFlatSummaryStats,
} from '../data/mockHdbData';
import {
  fetchLiveHdbStats,
  LiveDataState,
} from '../services/hdbResaleService';
import { FlatType, Town, TownFlatSummaryStats } from '../types';

export default function ScreenOneExplorer() {
  const [selectedTown, setSelectedTown] = useState<Town>('Tampines');
  const [selectedFlatType, setSelectedFlatType] = useState<FlatType>('4-ROOM');

  // Live data fetch states
  const [dataState, setDataState] = useState<LiveDataState>('loading');
  const [liveStats, setLiveStats] = useState<TownFlatSummaryStats | null>(null);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [retryTrigger, setRetryTrigger] = useState<number>(0);

  // Timeframe filter state: defaults to all quarters
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>(() =>
    ALL_QUARTERS.map((q) => q.key)
  );
  const [isQuarterDropdownOpen, setIsQuarterDropdownOpen] = useState<boolean>(false);
  const quarterDropdownRef = useRef<HTMLDivElement>(null);

  const [activeQuarterIndex, setActiveQuarterIndex] = useState<number | null>(null);
  const [showRangeEnvelope, setShowRangeEnvelope] = useState<boolean>(true);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        quarterDropdownRef.current &&
        !quarterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsQuarterDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch live data through serverless endpoint /api/hdb-resale
  useEffect(() => {
    let isMounted = true;
    setDataState('loading');
    setErrorDetails('');

    fetchLiveHdbStats(selectedTown, selectedFlatType)
      .then((result) => {
        if (!isMounted) return;
        setDataState(result.state);
        if (result.state === 'success' && result.stats) {
          setLiveStats(result.stats);
          setRecordCount(result.records.length);
          const quarters = result.stats.quarterlyTrends.map((t) => t.quarter);
          setSelectedQuarters(quarters);
          setActiveQuarterIndex(quarters.length > 0 ? quarters.length - 1 : null);
        } else {
          setErrorDetails(result.details || '');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setDataState('unreachable');
        setErrorDetails(err?.message || 'Failed to establish connection to data.gov.sg.');
      });

    return () => {
      isMounted = false;
    };
  }, [selectedTown, selectedFlatType, retryTrigger]);

  // Use live stats from real data.gov.sg records when successful;
  // otherwise fallback to baseline reference data for demonstration
  const stats = useMemo(() => {
    if (dataState === 'success' && liveStats) {
      return liveStats;
    }
    return getTownFlatSummaryStats(selectedTown, selectedFlatType);
  }, [dataState, liveStats, selectedTown, selectedFlatType]);

  // Quarter timeframe toggle & selection helpers
  const toggleQuarter = (quarterKey: string) => {
    setSelectedQuarters((prev) => {
      if (prev.includes(quarterKey)) {
        if (prev.length <= 1) return prev; // Retain at least one quarter
        return prev.filter((q) => q !== quarterKey);
      } else {
        const allOrder = stats.quarterlyTrends.map((t) => t.quarter);
        const next = [...prev, quarterKey];
        return next.sort((a, b) => allOrder.indexOf(a) - allOrder.indexOf(b));
      }
    });
  };

  const selectAllQuarters = () => {
    setSelectedQuarters(stats.quarterlyTrends.map((t) => t.quarter));
  };

  const selectYearOnly = (yearStr: string) => {
    const matching = stats.quarterlyTrends
      .filter((t) => t.quarter.startsWith(yearStr))
      .map((t) => t.quarter);
    setSelectedQuarters(matching);
  };

  // Distinct sorted years present in stats.quarterlyTrends
  const availableYears = useMemo(() => {
    const years = Array.from(
      new Set(stats.quarterlyTrends.map((t) => t.quarter.split('-')[0]))
    ) as string[];
    return years.sort((a, b) => b.localeCompare(a)); // Newest first
  }, [stats.quarterlyTrends]);

  // Filtered quarterly trends based on selected quarters & years
  const activeQuarterTrends = useMemo(() => {
    const filtered = stats.quarterlyTrends.filter((t) =>
      selectedQuarters.includes(t.quarter)
    );
    return filtered.length > 0 ? filtered : stats.quarterlyTrends;
  }, [stats.quarterlyTrends, selectedQuarters]);

  // Trend calculation based on active filtered quarters
  const firstQuarter = activeQuarterTrends[0];
  const latestQuarter = activeQuarterTrends[activeQuarterTrends.length - 1];
  const overallGrowthPercent =
    firstQuarter && latestQuarter && firstQuarter.medianPrice > 0
      ? (
          ((latestQuarter.medianPrice - firstQuarter.medianPrice) / firstQuarter.medianPrice) *
          100
        ).toFixed(1)
      : '0.0';

  // SVG Chart Geometry
  const chartWidth = 620;
  const chartHeight = 220;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const trendMinPrice = Math.min(...activeQuarterTrends.map((t) => t.minPrice));
  const trendMaxPrice = Math.max(...activeQuarterTrends.map((t) => t.maxPrice));
  const minChartVal = Math.floor((trendMinPrice * 0.95) / 50000) * 50000;
  const maxChartVal = Math.ceil((trendMaxPrice * 1.05) / 50000) * 50000;
  const valRange = maxChartVal - minChartVal || 1;

  const getY = (val: number) => {
    const ratio = (val - minChartVal) / valRange;
    return chartHeight - paddingBottom - ratio * innerHeight;
  };

  const getX = (idx: number) => {
    if (activeQuarterTrends.length <= 1) {
      return paddingLeft + innerWidth / 2;
    }
    return paddingLeft + (idx / (activeQuarterTrends.length - 1)) * innerWidth;
  };

  // Build SVG paths
  const medianPoints = activeQuarterTrends.map((t, idx) => ({
    x: getX(idx),
    y: getY(t.medianPrice),
    point: t,
  }));

  const medianPathD = medianPoints.reduce(
    (acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ''
  );

  const envelopePathD = useMemo(() => {
    if (activeQuarterTrends.length <= 1) return '';
    const topPoints = activeQuarterTrends.map((t, idx) => `${getX(idx)} ${getY(t.maxPrice)}`);
    const bottomPoints = [...activeQuarterTrends]
      .reverse()
      .map((t, idx) => {
        const originalIdx = activeQuarterTrends.length - 1 - idx;
        return `${getX(originalIdx)} ${getY(t.minPrice)}`;
      });
    return `M ${topPoints.join(' L ')} L ${bottomPoints.join(' L ')} Z`;
  }, [activeQuarterTrends, minChartVal, maxChartVal]);

  const activePoint =
    activeQuarterIndex !== null && activeQuarterIndex < activeQuarterTrends.length
      ? activeQuarterTrends[activeQuarterIndex]
      : latestQuarter;

  return (
    <div id="screen-1-explorer" className="space-y-6">
      {/* Screen Title & Explanatory Lead */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Screen 1: Single Town Historical Explorer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Historical Price Range & Trends
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
              Select a Singapore town and flat type to evaluate historical resale price boundaries,
              check quarterly price movements, and benchmark asking prices against past transactions.
            </p>
          </div>

          {/* Quick Selection Summary Tag */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl self-start md:self-auto">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {selectedTown} • {selectedFlatType}
            </span>
          </div>
        </div>

        {/* Input Selectors */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Town Selector */}
          <div>
            <label
              htmlFor="town-select"
              className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mb-2"
            >
              1. Select Town
            </label>
            <div className="relative">
              <select
                id="town-select"
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value as Town)}
                className="w-full min-h-[48px] px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-900 font-semibold text-base sm:text-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
              >
                {TOWNS.map((town) => (
                  <option key={town.id} value={town.id}>
                    {town.label} ({town.region} Region)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
              <span>Region:</span>
              <span className="font-semibold text-slate-700">
                {TOWNS.find((t) => t.id === selectedTown)?.region} Region
              </span>
            </p>
          </div>

          {/* Flat Type Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Select Flat Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {FLAT_TYPES.map((type) => {
                const isSelected = selectedFlatType === type.id;
                return (
                  <button
                    key={type.id}
                    id={`flat-type-${type.id}`}
                    type="button"
                    onClick={() => setSelectedFlatType(type.id)}
                    className={`min-h-[48px] px-2 py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center border-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>{type.label.split(' ')[0]}</span>
                    <span
                      className={`text-[10px] font-normal ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {type.id === 'EXECUTIVE'
                        ? 'Exec'
                        : type.id === 'MULTI-GENERATION'
                        ? 'Multi-Gen'
                        : 'Flat'}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Typical floor size:{' '}
              <span className="font-semibold text-slate-700">
                {FLAT_TYPES.find((f) => f.id === selectedFlatType)?.typicalArea}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Live Data Status Indicator & Four State Notifications */}
      {dataState === 'loading' && (
        <section
          id="data-status-loading-card"
          className="p-5 bg-blue-50/90 border-2 border-blue-200 rounded-2xl text-blue-900 shadow-xs"
        >
          <div className="flex items-start space-x-3.5">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base font-bold text-blue-950">
                Fetching the latest HDB resale transaction records from data.gov.sg...
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Querying resale registration records for {selectedTown} ({selectedFlatType}) from Jan-2017 onwards.
              </p>
            </div>
          </div>
        </section>
      )}

      {dataState === 'empty' && (
        <section
          id="data-status-empty-card"
          className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-800 shadow-xs"
        >
          <div className="flex items-start space-x-3.5">
            <SearchX className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base font-bold text-slate-900">
                No resale transaction records were found for the selected town, flat type, and timeframe.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Please try choosing a different town or flat type, or expand the quarter timeframe.
              </p>
            </div>
          </div>
        </section>
      )}

      {dataState === 'refused' && (
        <section
          id="data-status-refused-card"
          className="p-5 bg-amber-50/90 border-2 border-amber-300 rounded-2xl text-amber-950 shadow-xs space-y-3"
        >
          <div className="flex items-start space-x-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base font-bold text-amber-950">
                The data.gov.sg API refused the request due to an unauthenticated or invalid credential.
              </p>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                {errorDetails ||
                  'The environment variable HDB_RESALE_PRICE_API_KEY is missing or invalid in your deployment environment.'}
              </p>
            </div>
          </div>
          <div className="pl-8.5 flex flex-wrap items-center gap-3 pt-2 border-t border-amber-200/80">
            <button
              id="retry-refused-request-btn"
              type="button"
              onClick={() => setRetryTrigger((prev) => prev + 1)}
              className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Live Request</span>
            </button>
            <span className="text-xs text-amber-800 font-medium">
              Note: A baseline synthetic estimate is displayed below for UI preview.
            </span>
          </div>
        </section>
      )}

      {dataState === 'unreachable' && (
        <section
          id="data-status-unreachable-card"
          className="p-5 bg-red-50/90 border-2 border-red-200 rounded-2xl text-red-950 shadow-xs space-y-3"
        >
          <div className="flex items-start space-x-3.5">
            <WifiOff className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-base font-bold text-red-950">
                Unable to establish a connection to data.gov.sg; the upstream service is currently unreachable.
              </p>
              <p className="text-xs text-red-800 mt-1 leading-relaxed">
                {errorDetails ||
                  'The upstream service failed to respond or network connection could not be established.'}
              </p>
            </div>
          </div>
          <div className="pl-8.5 flex flex-wrap items-center gap-3 pt-2 border-t border-red-200/80">
            <button
              id="retry-unreachable-request-btn"
              type="button"
              onClick={() => setRetryTrigger((prev) => prev + 1)}
              className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
            <span className="text-xs text-red-700 font-medium">
              Note: A baseline synthetic estimate is displayed below for UI preview.
            </span>
          </div>
        </section>
      )}

      {dataState === 'success' && (
        <section
          id="data-status-success-card"
          className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-xl text-emerald-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-2xs"
        >
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-emerald-900">
              Live Data Active: Real HDB resale flat prices from data.gov.sg (Jan-2017 onwards)
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full self-start sm:self-auto">
            {recordCount.toLocaleString()} transactions analyzed
          </span>
        </section>
      )}

      {/* SECTION B: Historical Price Trend Over Time */}
      <section
        id="historical-price-trend-card"
        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Historical Trend ({activeQuarterTrends.length} Quarters Selected)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Resale Price Trend Over Time
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
            {/* Timeframe Drop-down Filter List by Quarter & Year */}
            <div className="relative" ref={quarterDropdownRef}>
              <button
                id="timeframe-quarter-dropdown-btn"
                type="button"
                onClick={() => setIsQuarterDropdownOpen((prev) => !prev)}
                className="min-h-[44px] px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between gap-2 shadow-2xs transition-all cursor-pointer"
                aria-expanded={isQuarterDropdownOpen}
                aria-haspopup="listbox"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {selectedQuarters.length === stats.quarterlyTrends.length
                      ? `All Quarters (${availableYears[availableYears.length - 1] ?? '2017'}–${availableYears[0] ?? '2026'})`
                      : `${selectedQuarters.length} Quarters Selected`}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 pl-1">
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {selectedQuarters.length}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isQuarterDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {isQuarterDropdownOpen && (
                <div
                  id="timeframe-quarter-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-30 max-h-[380px] overflow-y-auto"
                  role="listbox"
                  aria-multiselectable="true"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Filter by Quarter & Year
                    </span>
                    <button
                      type="button"
                      onClick={selectAllQuarters}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline p-1 cursor-pointer"
                    >
                      Select All
                    </button>
                  </div>

                  {/* Year Quick Action Filter Shortcuts */}
                  <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-slate-100 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-500">Quick set:</span>
                    {availableYears.slice(0, 5).map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => selectYearOnly(year)}
                        className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                      >
                        {year}
                      </button>
                    ))}
                  </div>

                  {/* Grouped Quarters list */}
                  <div className="space-y-3">
                    {availableYears.map((year) => {
                      const yearQuarters = stats.quarterlyTrends.filter((t) =>
                        t.quarter.startsWith(year)
                      );
                      if (yearQuarters.length === 0) return null;
                      const allYearChecked = yearQuarters.every((q) =>
                        selectedQuarters.includes(q.quarter)
                      );

                      return (
                        <div key={year} className="space-y-1">
                          <div className="flex items-center justify-between px-1 py-0.5">
                            <span className="text-xs font-black text-slate-800 tracking-wider">
                              Year {year}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (allYearChecked) {
                                  const remaining = selectedQuarters.filter(
                                    (q) => !q.startsWith(year)
                                  );
                                  if (remaining.length > 0) setSelectedQuarters(remaining);
                                } else {
                                  const combined = Array.from(
                                    new Set([
                                      ...selectedQuarters,
                                      ...yearQuarters.map((q) => q.quarter),
                                    ])
                                  );
                                  const allOrder = stats.quarterlyTrends.map((t) => t.quarter);
                                  setSelectedQuarters(
                                    combined.sort(
                                      (a, b) => allOrder.indexOf(a) - allOrder.indexOf(b)
                                    )
                                  );
                                }
                              }}
                              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                            >
                              {allYearChecked ? 'Deselect Year' : 'Select All'}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-1">
                            {yearQuarters.map((q) => {
                              const isChecked = selectedQuarters.includes(q.quarter);
                              return (
                                <label
                                  key={q.quarter}
                                  id={`timeframe-quarter-option-${q.quarter}`}
                                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                                    isChecked
                                      ? 'bg-blue-50/70 text-blue-900 font-bold'
                                      : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2.5">
                                    <input
                                      type="checkbox"
                                      id={`quarter-checkbox-${q.quarter}`}
                                      checked={isChecked}
                                      onChange={() => toggleQuarter(q.quarter)}
                                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-xs sm:text-sm">{q.quarterLabel}</span>
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-500">
                                    {formatCompactSGD(q.medianPrice)}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      {selectedQuarters.length} of {stats.quarterlyTrends.length} quarters active
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsQuarterDropdownOpen(false)}
                      className="font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Toggle Range Envelope */}
            <button
              id="toggle-range-envelope-btn"
              type="button"
              onClick={() => setShowRangeEnvelope(!showRangeEnvelope)}
              className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                showRangeEnvelope
                  ? 'bg-blue-50 border-blue-300 text-blue-800'
                  : 'bg-slate-50 border-slate-300 text-slate-600'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showRangeEnvelope ? 'Hide Range Envelope' : 'Show Min-Max Envelope'}</span>
            </button>
          </div>
        </div>

        {/* Trend Summary Badge */}
        {firstQuarter && latestQuarter && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <div
              className={`inline-flex items-center space-x-1 font-bold px-3 py-1.5 rounded-lg border ${
                parseFloat(overallGrowthPercent) >= 0
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {parseFloat(overallGrowthPercent) >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4 rotate-180" />
              )}
              <span>
                {parseFloat(overallGrowthPercent) >= 0
                  ? `+${overallGrowthPercent}%`
                  : `${overallGrowthPercent}%`}{' '}
                overall change ({firstQuarter.quarterLabel} to {latestQuarter.quarterLabel})
              </span>
            </div>
            <span className="text-slate-500">
              Baseline {firstQuarter.quarterLabel}: {formatSGD(firstQuarter.medianPrice)} →{' '}
              {latestQuarter.quarterLabel}: {formatSGD(latestQuarter.medianPrice)}
            </span>
          </div>
        )}

        {/* SVG Line / Envelope Chart - responsive, fits within mobile screen without horizontal scroll */}
        <div className="mt-5 relative w-full overflow-hidden">
          <div className="w-full">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto select-none overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = chartHeight - paddingBottom - ratio * innerHeight;
                const val = minChartVal + ratio * valRange;
                return (
                  <g key={i}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={chartWidth - paddingRight}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-500 font-semibold text-[10px] sm:text-[11px]"
                    >
                      {formatCompactSGD(val)}
                    </text>
                  </g>
                );
              })}

              {/* Shaded Price Range Envelope (Min to Max) */}
              {showRangeEnvelope && (
                <path
                  d={envelopePathD}
                  fill="rgba(59, 130, 246, 0.12)"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}

              {/* Median Trend Line */}
              <path
                d={medianPathD}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & Interactive Hover Hitboxes */}
              {medianPoints.map((pt, idx) => {
                const isSelected = activeQuarterIndex === idx;
                // When there are many quarters, show labels selectively on x-axis (first, last, and every Nth)
                const step = medianPoints.length > 20 ? 4 : medianPoints.length > 12 ? 2 : 1;
                const showLabel =
                  isSelected ||
                  idx === 0 ||
                  idx === medianPoints.length - 1 ||
                  idx % step === 0;

                return (
                  <g
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => setActiveQuarterIndex(idx)}
                  >
                    {/* Hit target for touch */}
                    <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                    {/* Outer ring on active */}
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="7"
                        fill="none"
                        stroke="#1d4ed8"
                        strokeWidth="2.5"
                      />
                    )}

                    {/* Point circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '4.5' : medianPoints.length > 24 ? '2.5' : '3.5'}
                      fill={isSelected ? '#1d4ed8' : '#3b82f6'}
                      stroke="#ffffff"
                      strokeWidth={medianPoints.length > 24 ? '1' : '1.5'}
                    />

                    {/* Quarter X-axis Label */}
                    {showLabel && (
                      <text
                        x={pt.x}
                        y={chartHeight - 12}
                        textAnchor="middle"
                        className={`text-[9px] sm:text-[10px] font-bold ${
                          isSelected ? 'fill-blue-700 font-extrabold text-[11px]' : 'fill-slate-600'
                        }`}
                      >
                        {pt.point.quarterLabel.replace(' 20', ' ')}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Quarter Inspector Card */}
        {activePoint && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-extrabold text-sm sm:text-base text-slate-900">
                  Quarterly Detail: {activePoint.quarterLabel}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ({activePoint.volume} transactions recorded)
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm">
                <span>
                  <span className="text-slate-500">Median: </span>
                  <span className="font-black text-blue-700">
                    {formatSGD(activePoint.medianPrice)}
                  </span>
                </span>
                <span>
                  <span className="text-slate-500">Range: </span>
                  <span className="font-bold text-slate-700">
                    {formatCompactSGD(activePoint.minPrice)} –{' '}
                    {formatCompactSGD(activePoint.maxPrice)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
