/**
 * ResaleMeter - HDB Resale Flat Historical Price Benchmarker
 * 
 * Individual Problem Set 2 for MGMT 6110 Human-AI Collaboration at SMU.
 * Front-end prototype with unified fictional mock dataset.
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScreenOneExplorer from './components/ScreenOneExplorer';
import ScreenTwoComparison from './components/ScreenTwoComparison';
import DisqusComments from './components/DisqusComments';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'screen1' | 'screen2'>('screen1');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Top Application Navbar & Screen Switcher */}
      <Navbar activeScreen={activeScreen} onSelectScreen={setActiveScreen} />

      {/* 3. Main Screen Viewport */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeScreen === 'screen1' ? (
          <>
            <ScreenOneExplorer />
            {/* Disqus comment section on the main page */}
            <DisqusComments />
          </>
        ) : (
          <ScreenTwoComparison />
        )}
      </main>

      {/* 4. Prototype Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-1.5">
          <p className="font-semibold text-slate-700">
            ResaleMeter • Singapore HDB Resale Flat Price Explorer & Comparison Prototype
          </p>
          <p>
            Created for SMU MGMT 6110 Human-AI Collaboration (Individual Problem Set 2).
          </p>
          <p className="text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Contains information from Resale flat prices based on registration date from Jan-2017 onwards accessed from data.gov.sg which is made available under the terms of the{' '}
            <a
              href="https://data.gov.sg/open-data-licence"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 underline hover:text-blue-600 transition-colors"
            >
              Singapore Open Data Licence version 1.0
            </a>
            .
          </p>
          <p className="text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            This page uses Microsoft Clarity and Disqus, which use cookies to record how visitors
            use the site and to host comments. By using this page you agree that we and Microsoft
            may collect and use this data. See the{' '}
            <a
              href="https://www.microsoft.com/privacy/privacystatement"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 underline hover:text-blue-600 transition-colors"
            >
              Microsoft Privacy Statement
            </a>
            , the{' '}
            <a
              href="https://disqus.com/privacy-policy/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 underline hover:text-blue-600 transition-colors"
            >
              Disqus privacy policy
            </a>{' '}
            and the{' '}
            <a
              href="https://disqus.com/data-sharing-settings/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 underline hover:text-blue-600 transition-colors"
            >
              Disqus data sharing settings
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
