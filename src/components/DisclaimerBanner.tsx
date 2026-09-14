import { AlertCircle, Info } from 'lucide-react';
import { MOCK_DATASET_DISCLAIMER } from '../data/mockHdbData';

export default function DisclaimerBanner() {
  return (
    <div
      id="disclaimer-banner"
      className="bg-amber-50 border-b border-amber-200/80 text-amber-900 px-4 py-2 text-xs sm:text-sm font-medium"
    >
      <div className="max-w-5xl mx-auto flex items-start sm:items-center space-x-2">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 leading-snug">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-800 mr-1.5 inline-flex items-center gap-1">
            <Info className="w-3 h-3" /> Fictional Academic Mock Data:
          </span>
          <span>{MOCK_DATASET_DISCLAIMER}</span>
        </div>
      </div>
    </div>
  );
}
