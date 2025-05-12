// File: pages/api/govtribe-feed.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join('/tmp', 'govtribe.json');

export const config = {
  api: {
    bodyParser: true,
  },
};

function simulatePWIN(item: any): number {
  let score = 0;
  if (/Air Force|Army|Navy|DoD|DARPA|GSA/i.test(item.agency)) score += 30;
  if (/5415[0-9]{2}/.test(item.naics)) score += 25;
  if (item.due_date && new Date(item.due_date) > new Date()) score += 20;
  if (item.title && /cloud|AI|cyber|data|model/i.test(item.title)) score += 25;
  return Math.min(score, 100);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = req.body;
    const wrap = Array.isArray(body) ? body : [body];
    try {
      let existingData: any[] = [];
      try {
        const existingRaw = fs.readFileSync(DATA_FILE, 'utf-8');
        existingData = JSON.parse(existingRaw);
      } catch (readErr) {
        existingData = [];
      }

      const merged = [...wrap, ...existingData.filter(e => !wrap.some(w => w.id === e.id))];

      const enriched = merged.map((item: any) => ({
        ...item,
        pwin: item.pwin ?? simulatePWIN(item),
        gates: item.gates ?? {
          gate1: false,
          gate2: false,
          gate3: false,
          gate4: false,
        },
        vehicle: item.vehicle ?? 'TBD',
        proposal_status: item.proposal_status ?? 'Not Started',
        grant_applicable: false,
        source_links: item.source_links ?? [],
        forecast_status: item.forecast_status ?? 'Unknown',
        submission_mode: item.submission_mode ?? 'Electronic',
      }));

      enriched.sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());
      const trimmed = enriched.slice(0, 10);

      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(trimmed, null, 2));
      return res.status(200).json({ success: true, count: trimmed.length });
    } catch (err) {
      console.error('File write error:', err);
      return res.status(500).json({ error: 'Failed to write file', details: err instanceof Error ? err.message : err });
    }
  }

  if (req.method === 'GET') {
    try {
      const file = fs.readFileSync(DATA_FILE, 'utf-8');
      let data = [];
      try {
        data = JSON.parse(file);
      } catch (err) {
        console.error('JSON parse error:', err);
        return res.status(200).json([]);
      }

      const enriched = data.map((item: any) => ({
        ...item,
        pwin: item.pwin ?? simulatePWIN(item),
        gates: item.gates ?? {
          gate1: false,
          gate2: false,
          gate3: false,
          gate4: false,
        },
        vehicle: item.vehicle ?? 'TBD',
        proposal_status: item.proposal_status ?? 'Not Started',
        grant_applicable: false,
        source_links: item.source_links ?? [],
        forecast_status: item.forecast_status ?? 'Unknown',
        submission_mode: item.submission_mode ?? 'Electronic',
      }));

      console.log('Fetched data from file:', enriched);
      return res.status(200).json(enriched);
    } catch (err) {
      console.error('Read error:', err);
      return res.status(200).json([]);
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
