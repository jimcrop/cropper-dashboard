// File: components/GovTribeFeed.tsx

import React from 'react';
import opportunities from '../data/cropper_demo_opportunities_enriched.json';

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

          <div className="mt-4 pt-3 border-t">
            <h4 className="text-sm font-semibold text-gray-700">BD Intelligence</h4>
            <ul className="text-sm text-gray-600 space-y-1 mt-1">
              <li><strong>Gate Reviews:</strong> 
                Gate 1: {opp["Gate Reviews"]["Gate 1"] ? 'Pass' : 'Fail'}, 
                Gate 2: {opp["Gate Reviews"]["Gate 2"] ? 'Pass' : 'Fail'}, 
                Gate 3: {opp["Gate Reviews"]["Gate 3"] ? 'Pass' : 'Fail'}, 
                Gate 4: {opp["Gate Reviews"]["Gate 4"] ? 'Pass' : 'Fail'}
              </li>
              <li><strong>BD Stage:</strong> {opp["BD Stage"]}</li>
              <li><strong>Vehicle Fit:</strong> {opp["Vehicle Fit"]}</li>
              <li><strong>Recommended Teammate:</strong> {opp["Recommended Teammate"]}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
