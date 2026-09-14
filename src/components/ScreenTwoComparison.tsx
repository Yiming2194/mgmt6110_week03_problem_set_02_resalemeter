import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  TrendingUp,
  Sliders,
  ChevronDown,
  ArrowRight,
  Info,
  Check,
  Calendar,
  RefreshCw,
  Wifi,
} from 'lucide-react';
import {
  ALL_QUARTERS,
  FLAT_TYPES,
  TOWNS,
  formatCompactSGD,
  formatSGD,
  getTownFlatSummaryStats,
} from '../data/mockHdbData';
import { fetchLiveHdbStats } from '../services/hdbResaleService';
import { ComparisonItem, FlatType, Town, TownFlatSummaryStats } from '../types';

const COLOR_PALETTES = {
  blue: {
    stroke: '#2563eb',
    fill: '#dbeafe',
    text: 'text-blue-700',
    bg: 'bg-blue-600',
    border: 'border-blue-500',
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  emerald: {
    stroke: '#059669',
    fill: '#d1fae5',
    text: 'text-emerald-700',
    bg: 'bg-emerald-600',
    border: 'border-emerald-500',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  amber: {
    stroke: '#d97706',
    fill: '#fef3c7',
    text: 'text-amber-700',
    bg: 'bg-amber-600',
    border: 'border-amber-500',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
  },
};

const DEFAULT_COMBINATIONS: ComparisonItem[] = [
  { id: 'combo-1', town: 'Tampines', flatType: '4-ROOM', colorKey: 'blue' },
  { id: 'combo-2', town: 'Punggol', flatType: '4-ROOM', colorKey: 'emerald' },
  { id: 'combo-3', town: 'Bishan', flatType: '4-ROOM', colorKey: 'amber' },
];

export default function ScreenTwoComparison() {
  const [combinations, setCombinations] = useState<ComparisonItem[]>(DEFAULT_COMBINATIONS);
  const [hoveredQuarterIndex, setHoveredQuarterIndex] = useState<number | null>(null);

  // Cache for live statistics per combo key (e.g. 'Tampines:4-ROOM')
  const [liveStatsCache, setLiveStatsCache] = useState<Record<string, TownFlatSummaryStats>>({});
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);

  // Timeframe filter state: defaults to all quarters
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>(() =>
    ALL_QUARTERS.map((q) => q.key)
  );
  const [isQuarterDropdownOpen, setIsQuarterDropdownOpen] = useState<boolean>(false);
  const quarterDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch live stats for active combinations
  useEffect(() => {
    let isMounted = true;
    setIsLoadingLive(true);

    const fetchPromises = combinations.map(async (combo) => {
      const cacheKey = `${combo.town}:${combo.flatType}`;
      if (liveStatsCache[cacheKey]) return; // already cached

      try {
        const result = await fetchLiveHdbStats(combo.town, combo.flatType);
        if (isMounted && result.state === 'success' && result.stats) {
          setLiveStatsCache((prev) => ({
            ...prev,
            [cacheKey]: result.stats!,
          }));
        }
      } catch {
        // ignore errors; fallback will supply baseline stats
      }
    });

    Promise.all(fetchPromises).finally(() => {
      if (isMounted) setIsLoadingLive(false);
    });

    return () => {
      isMounted = false;
    };
  }, [combinations]);

  // Close dropdown on outside click
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

  // Calculate detailed stats for each selected combination (prefer live stats when available)
  const comboStatsList = useMemo(() => {
    return combinations.map((combo) => {
      const cacheKey = `${combo.town}:${combo.flatType}`;
      const stats = liveStatsCache[cacheKey] || getTownFlatSummaryStats(combo.town, combo.flatType);
      return {
        ...combo,
        stats,
        palette: COLOR_PALETTES[combo.colorKey],
      };
    });
  }, [combinations, liveStatsCache]);

  // All available quarters from first combo stats
  const allAvailableQuarters = useMemo(() => {
    return comboStatsList[0]?.stats.quarterlyTrends || [];
  }, [comboStatsList]);

  // Filtered quarters based on user selection
  const filteredQuartersList = useMemo(() => {
    const filtered = allAvailableQuarters.filter((q) => selectedQuarters.includes(q.quarter));
    return filtered.length > 0 ? filtered : allAvailableQuarters;
  }, [allAvailableQuarters, selectedQuarters]);

  // Quarter timeframe toggle & selection helpers
  const toggleQuarter = (quarterKey: string) => {
    setSelectedQuarters((prev) => {
      if (prev.includes(quarterKey)) {
        if (prev.length <= 1) return prev; // Retain at least one quarter
        return prev.filter((q) => q !== quarterKey);
      } else {
        const allOrder = allAvailableQuarters.map((t) => t.quarter);
        const next = [...prev, quarterKey];
        return next.sort((a, b) => allOrder.indexOf(a) - allOrder.indexOf(b));
      }
    });
  };

  const selectAllQuarters = () => {
    setSelectedQuarters(allAvailableQuarters.map((t) => t.quarter));
  };

  const selectYearOnly = (yearStr: string) => {
    const matching = allAvailableQuarters
      .filter((t) => t.quarter.startsWith(yearStr))
      .map((t) => t.quarter);
    setSelectedQuarters(matching);
  };

  // Distinct sorted years present in allAvailableQuarters
  const availableYears = useMemo(() => {
    const years = Array.from(
      new Set(allAvailableQuarters.map((t) => t.quarter.split('-')[0]))
    ) as string[];
    return years.sort((a, b) => b.localeCompare(a)); // Newest first
  }, [allAvailableQuarters]);

  // Handler to update a combination's town or flatType
  const handleUpdateCombo = (id: string, field: 'town' | 'flatType', value: string) => {
    setCombinations((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          [field]: value,
        };
      })
    );
  };

  // Handler to add a new combination (up to 3)
  const handleAddCombination = () => {
    if (combinations.length >= 3) return;

    // Pick an unused color key
    const usedColors = new Set(combinations.map((c) => c.colorKey));
    let newColor: 'blue' | 'emerald' | 'amber' = 'blue';
    if (!usedColors.has('emerald')) newColor = 'emerald';
    else if (!usedColors.has('amber')) newColor = 'amber';
    else if (!usedColors.has('blue')) newColor = 'blue';

    // Pick an initial unused town if possible
    const usedTowns = new Set(combinations.map((c) => c.town));
    const availableTown = TOWNS.find((t) => !usedTowns.has(t.id))?.id || 'Woodlands';

    const newCombo: ComparisonItem = {
      id: `combo-${Date.now()}`,
      town: availableTown,
      flatType: '4-ROOM',
      colorKey: newColor,
    };

    setCombinations((prev) => [...prev, newCombo]);
  };

  // Handler to remove a combination (minimum 1 must remain)
  const handleRemoveCombination = (id: string) => {
    if (combinations.length <= 1) return;
    setCombinations((prev) => prev.filter((c) => c.id !== id));
  };

  // Global scale for Charts
  const chartWidth = 620;
  const chartHeight = 240;
  const paddingLeft = 65;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 45;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;

  const allMins = comboStatsList.map((c) => c.stats.overallMin);
  const allMaxs = comboStatsList.map((c) => c.stats.overallMax);

  // Active trend prices based on filtered quarters
  const activeTrendMins = comboStatsList.flatMap((c) =>
    c.stats.quarterlyTrends
      .filter((t) => selectedQuarters.includes(t.quarter))
      .map((t) => t.minPrice)
  );
  const activeTrendMaxs = comboStatsList.flatMap((c) =>
    c.stats.quarterlyTrends
      .filter((t) => selectedQuarters.includes(t.quarter))
      .map((t) => t.maxPrice)
  );

  const globalMinPrice =
    activeTrendMins.length > 0
      ? Math.floor(Math.min(...activeTrendMins) / 50000) * 50000
      : Math.floor(Math.min(...allMins, 300000) / 50000) * 50000;
  const globalMaxPrice =
    activeTrendMaxs.length > 0
      ? Math.ceil(Math.max(...activeTrendMaxs) / 50000) * 50000
      : Math.ceil(Math.max(...allMaxs, 1000000) / 50000) * 50000;
  const globalValRange = globalMaxPrice - globalMinPrice || 1;

  const getY = (val: number) => {
    const ratio = (val - globalMinPrice) / globalValRange;
    return chartHeight - paddingBottom - ratio * innerHeight;
  };

  const getX = (idx: number) => {
    const totalPoints = filteredQuartersList.length;
    if (totalPoints <= 1) {
      return paddingLeft + innerWidth / 2;
    }
    return paddingLeft + (idx / (totalPoints - 1)) * innerWidth;
  };

  const activeQuarterIdx =
    hoveredQuarterIndex < filteredQuartersList.length
      ? hoveredQuarterIndex
      : Math.max(0, filteredQuartersList.length - 1);
  const activeQuarterItem = filteredQuartersList[activeQuarterIdx] || filteredQuartersList[0];
  const activeQuarterLabel = activeQuarterItem?.quarterLabel || 'Q4 2024';

  return (
    <div id="screen-2-comparison" className="space-y-6">
      {/* Screen Title & Explanatory Lead */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Screen 2: Multi-Combination Comparison</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Resale Trends & Ranges
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
              Select up to three town and flat type combinations to directly compare historical
              price movement, price range boundaries, and median premiums side by side using live data.gov.sg records.
            </p>
            <div className="mt-2.5 inline-flex items-center space-x-2 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {isLoadingLive ? 'Updating live HDB stats...' : 'Live HDB API Connected (data.gov.sg)'}
              </span>
            </div>
          </div>

          {/* Add Combination Button */}
          {combinations.length < 3 && (
            <button
              id="add-combination-btn"
              type="button"
              onClick={handleAddCombination}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-xs transition-all min-h-[44px] self-start md:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Combination ({combinations.length}/3)</span>
            </button>
          )}
        </div>

        {/* Combination Selector Cards (1 to 3 items) */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          {comboStatsList.map((combo, index) => {
            return (
              <div
                key={combo.id}
                id={`combo-card-${index + 1}`}
                className="bg-slate-50/80 rounded-xl p-4 border-2 transition-all flex flex-col justify-between"
                style={{ borderColor: combo.palette.stroke }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: combo.palette.stroke }}
                      />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                        Combination #{index + 1}
                      </span>
                    </div>

                    {/* Delete button (enabled only when > 1 combination) */}
                    {combinations.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCombination(combo.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove this combination"
                        aria-label={`Remove Combination ${index + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Town Dropdown */}
                  <div className="space-y-2.5">
                    <div>
                      <label
                        htmlFor={`town-select-${combo.id}`}
                        className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1"
                      >
                        Town
                      </label>
                      <div className="relative">
                        <select
                          id={`town-select-${combo.id}`}
                          value={combo.town}
                          onChange={(e) =>
                            handleUpdateCombo(combo.id, 'town', e.target.value as Town)
                          }
                          className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-bold text-sm focus:outline-none focus:border-blue-600"
                        >
                          {TOWNS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.label} ({t.region})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    {/* Flat Type Dropdown */}
                    <div>
                      <label
                        htmlFor={`flat-select-${combo.id}`}
                        className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1"
                      >
                        Flat Type
                      </label>
                      <div className="relative">
                        <select
                          id={`flat-select-${combo.id}`}
                          value={combo.flatType}
                          onChange={(e) =>
                            handleUpdateCombo(combo.id, 'flatType', e.target.value as FlatType)
                          }
                          className="w-full min-h-[44px] px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-bold text-sm focus:outline-none focus:border-blue-600"
                        >
                          {FLAT_TYPES.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-3 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instant Snapshot */}
                <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Current Median:</span>
                  <span className="text-sm font-black text-slate-900">
                    {formatSGD(combo.stats.overallMedian)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 1: Historical Resale Price Trends Comparison Chart */}
      <section
        id="multi-line-trend-chart-card"
        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Comparative Trend Analysis ({filteredQuartersList.length} Quarters Selected)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Historical Price Trends Over Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {filteredQuartersList[0]?.quarterLabel} to{' '}
              {filteredQuartersList[filteredQuartersList.length - 1]?.quarterLabel} comparison across selected combinations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            {/* Timeframe Drop-down Filter List by Quarter & Year */}
            <div className="relative" ref={quarterDropdownRef}>
              <button
                id="comparison-timeframe-dropdown-btn"
                type="button"
                onClick={() => setIsQuarterDropdownOpen((prev) => !prev)}
                className="min-h-[44px] px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between gap-2 shadow-2xs transition-all cursor-pointer"
                aria-expanded={isQuarterDropdownOpen}
                aria-haspopup="listbox"
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {selectedQuarters.length === allAvailableQuarters.length
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
                  id="comparison-timeframe-dropdown-menu"
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
                      const yearQuarters = allAvailableQuarters.filter((t) =>
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
                                  const allOrder = allAvailableQuarters.map((t) => t.quarter);
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
                                  id={`comparison-quarter-option-${q.quarter}`}
                                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                                    isChecked
                                      ? 'bg-blue-50/70 text-blue-900 font-bold'
                                      : 'hover:bg-slate-50 text-slate-700'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2.5">
                                    <input
                                      type="checkbox"
                                      id={`comparison-checkbox-${q.quarter}`}
                                      checked={isChecked}
                                      onChange={() => toggleQuarter(q.quarter)}
                                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-xs sm:text-sm">{q.quarterLabel}</span>
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-500">
                                    {q.quarter}
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
                      {selectedQuarters.length} of {allAvailableQuarters.length} quarters active
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

            {/* Accessible Legend */}
            <div className="flex flex-wrap items-center gap-3">
              {comboStatsList.map((c) => (
                <div key={c.id} className="flex items-center space-x-1.5 text-xs font-bold">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.palette.stroke }} />
                  <span className="text-slate-800">
                    {c.town} ({c.flatType.replace('-ROOM', 'R')})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SVG Multi-Line Chart - responsive, fits within mobile screen without horizontal scroll */}
        <div className="mt-5 relative w-full overflow-hidden">
          <div className="w-full">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto select-none overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background Grid Lines & Y-Axis Labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = chartHeight - paddingBottom - ratio * innerHeight;
                const val = globalMinPrice + ratio * globalValRange;
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

              {/* Vertical Scrubber Line for Active/Hovered Quarter */}
              <line
                x1={getX(activeQuarterIdx)}
                y1={paddingTop}
                x2={getX(activeQuarterIdx)}
                y2={chartHeight - paddingBottom}
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Draw Lines for each Combination */}
              {comboStatsList.map((combo) => {
                const activeComboTrends = combo.stats.quarterlyTrends.filter((t) =>
                  selectedQuarters.includes(t.quarter)
                );
                const trendsToDraw =
                  activeComboTrends.length > 0 ? activeComboTrends : combo.stats.quarterlyTrends;

                const points = trendsToDraw.map((t, idx) => ({
                  x: getX(idx),
                  y: getY(t.medianPrice),
                }));
                const pathD = points.reduce(
                  (acc, curr, idx) =>
                    idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`,
                  ''
                );

                return (
                  <g key={combo.id}>
                    {/* Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={combo.palette.stroke}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Nodes */}
                    {points.map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r={
                          activeQuarterIdx === idx
                            ? '5'
                            : filteredQuartersList.length > 24
                            ? '2.5'
                            : '3.5'
                        }
                        fill={combo.palette.stroke}
                        stroke="#ffffff"
                        strokeWidth={filteredQuartersList.length > 24 ? '1' : '1.5'}
                      />
                    ))}
                  </g>
                );
              })}

              {/* Quarter X-Axis Labels with Touch/Click Hit Targets */}
              {filteredQuartersList.map((q, idx) => {
                const x = getX(idx);
                const isHovered = activeQuarterIdx === idx;
                const step =
                  filteredQuartersList.length > 20
                    ? 4
                    : filteredQuartersList.length > 12
                    ? 2
                    : 1;
                const showLabel =
                  isHovered ||
                  idx === 0 ||
                  idx === filteredQuartersList.length - 1 ||
                  idx % step === 0;

                return (
                  <g
                    key={q.quarter}
                    className="cursor-pointer"
                    onClick={() => setHoveredQuarterIndex(idx)}
                  >
                    <rect
                      x={x - 20}
                      y={chartHeight - paddingBottom}
                      width="40"
                      height={paddingBottom}
                      fill="transparent"
                    />
                    {showLabel && (
                      <text
                        x={x}
                        y={chartHeight - 14}
                        textAnchor="middle"
                        className={`text-[9px] sm:text-[10px] font-bold ${
                          isHovered ? 'fill-blue-700 font-extrabold text-[11px]' : 'fill-slate-600'
                        }`}
                      >
                        {q.quarterLabel.replace(' 20', ' ')}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Dynamic Quarterly Scrubber Card: Shows exact prices for all selected combos at this quarter */}
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Snapshot Comparison at {activeQuarterLabel}
            </span>
            <span className="text-xs text-slate-500">
              (Tap any quarter along the chart axis to inspect)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {comboStatsList.map((combo) => {
              const quarterData =
                combo.stats.quarterlyTrends.find((t) => t.quarter === activeQuarterItem?.quarter) ||
                combo.stats.quarterlyTrends[0];
              return (
                <div
                  key={combo.id}
                  className="bg-white p-3 rounded-lg border flex items-center justify-between"
                  style={{ borderColor: combo.palette.stroke }}
                >
                  <div>
                    <span
                      className="text-xs font-bold block"
                      style={{ color: combo.palette.stroke }}
                    >
                      {combo.town} • {combo.flatType}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Range: {formatCompactSGD(quarterData.minPrice)} –{' '}
                      {formatCompactSGD(quarterData.maxPrice)}
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {formatSGD(quarterData.medianPrice)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
