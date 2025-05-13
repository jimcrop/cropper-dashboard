// File: components/GovTribeFeed.tsx

import React from 'react';
import opportunities from '../data/cropper_demo_opportunities_with_summary.json';

export default function GovTribeFeed() {
  if (!opportunities || opportunities.length === 0) {
    return <p>No opportunities available.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">GovTribe BD Feed (Demo Mode)</h2>
      {opportunities.map((opp, idx) => (
        <div key={idx} className="p-4 rounded-lg bg-white shadow space-y-2">
          <h3 className="text-xl font-bold text-blue-700">
            <a href={opp["SAM.gov Link"]} target="_blank" rel="noopener noreferrer">
              {opp["Opportunity Name"]}
            </a>
          </h3>

          <p className="text-sm text-gray-500">Agency: {opp["Agency"]}</p>
          <p className="text-sm text-gray-500">NAICS: {opp["NAICS"]}</p>
          <p className="text-sm text-gray-500">Due Date: {opp["Due Date"]}</p>
          <p className="text-sm text-gray-500">Type: {opp["Type"]}</p>
          <p className="text-sm text-gray-500">Set-Aside: {opp["Set-Aside"]}</p>
          <p className="text-sm text-gray-500">Location: {opp["Location"]}</p>

          <p className="text-sm font-medium text-black">
            Score: {opp["Score"]} ({opp["AI Recommendation"]})
          </p>

          <div className="text-sm text-gray-700 mt-2">
            <strong>Summary:</strong>
            <p>{opp["AI Summary"]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
