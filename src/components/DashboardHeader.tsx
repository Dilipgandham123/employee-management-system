'use client';

import React from 'react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="px-4 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        </div>
      </div>
    </header>
  );
};