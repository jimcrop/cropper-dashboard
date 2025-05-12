// File: components/GovTribeFeed.tsx
import { useEffect, useState } from 'react';

type Opp = {
  title: string;
  url: string;
  agency: string;
  naics: string;
  posted_date: string;
  due_date: string;
  gov_summary: string;
  ai_summary: string;
};

export default function GovTribeFeed() {
  const [opps, setOpps] = useState<Opp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/govtribe-feed');
      const data = await res.json();
      setOpps(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading GovTribe feed...</p>;
  if (!opps.length) return <p>No opportunities available.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">GovTribe BD Feed</h2>
      {opps.map((opp, idx) => (
        <div key={idx} className="p-4 rounded-lg bg-white shadow">
          <h3 className="text-xl font-bold text-blue-700">
            <a href={opp.url} target="_blank" rel="noopener noreferrer">
              {opp.title}
            </a>
          </h3>
          <p className="text-sm text-gray-500">Agency: {opp.agency}</p>
          <p className="text-sm text-gray-500">NAICS: {opp.naics}</p>
          <p className="text-sm text-gray-500">Posted: {opp.posted_date}</p>
          <p className="text-sm text-gray-500">Due: {opp.due_date}</p>
          <p className="mt-2"><strong>Gov Summary:</strong> {opp.gov_summary}</p>
          <p className="mt-1"><strong>AI Summary:</strong> {opp.ai_summary}</p>
        </div>
      ))}
    </div>
  );
}
