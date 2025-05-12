// File: components/GovTribeFeed.tsx
import React, { useEffect, useState } from 'react';

type Opp = {
  title: string;
  url: string;
  agency: string;
  naics: string;
  posted_date: string;
  due_date: string;
  gov_summary: string;
  ai_summary: string;
  pwin: number;
  vehicle: string;
  proposal_status: string;
  grant_applicable: boolean;
  gates: {
    gate1: boolean;
    gate2: boolean;
    gate3: boolean;
    gate4: boolean;
  };
};

export default function GovTribeFeed() {
  const [opps, setOpps] = useState<Opp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/govtribe-feed')
      .then(res => res.json())
      .then(data => {
        setOpps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching govtribe feed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading GovTribe feed...</p>;
  if (!opps.length) return <p>No opportunities available.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">GovTribe BD Feed</h2>
      {opps.map((opp, idx) => (
        <div key={idx} className="p-4 rounded-lg bg-white shadow space-y-2">
          <h3 className="text-xl font-bold text-blue-700">
            <a href={opp.url} target="_blank" rel="noopener noreferrer">
              {opp.title}
            </a>
          </h3>
          <p className="text-sm text-gray-500">Agency: {opp.agency}</p>
          <p className="text-sm text-gray-500">NAICS: {opp.naics}</p>
          <p className="text-sm text-gray-500">Posted: {opp.posted_date}</p>
          <p className="text-sm text-gray-500">Due: {opp.due_date}</p>
          <p className="text-sm"><strong>PWIN:</strong> {opp.pwin}%</p>
          <p className="text-sm"><strong>Vehicle:</strong> {opp.vehicle}</p>
          <p className="text-sm"><strong>Status:</strong> {opp.proposal_status}</p>
          <p className="text-sm"><strong>Grant Eligible:</strong> {opp.grant_applicable ? 'Yes' : 'No'}</p>
          <div className="text-sm text-gray-700">
            <strong>Gates:</strong>
            <ul className="ml-4 list-disc">
              <li>Gate 1: {opp.gates.gate1 ? '✅' : '❌'}</li>
              <li>Gate 2: {opp.gates.gate2 ? '✅' : '❌'}</li>
              <li>Gate 3: {opp.gates.gate3 ? '✅' : '❌'}</li>
              <li>Gate 4: {opp.gates.gate4 ? '✅' : '❌'}</li>
            </ul>
          </div>
          <p className="mt-2"><strong>Gov Summary:</strong> {opp.gov_summary}</p>
          <p className="mt-1"><strong>AI Summary:</strong> {opp.ai_summary}</p>
        </div>
      ))}
    </div>
  );
}
