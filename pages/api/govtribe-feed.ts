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

      // Merge new items only if they are not duplicates
      const merged = [...wrap, ...existingData.filter(e => !wrap.some(w => w.id === e.id))];

      // Add enriched defaults if not present
      const enriched = merged.map((item: any) => ({
        ...item,
        pwin: item.pwin ?? Math.floor(Math.random() * 100),
        gates: item.gates ?? {
          gate1: false,
          gate2: false,
          gate3: false,
          gate4: false,
        },
        vehicle: item.vehicle ?? 'TBD',
        proposal_status: item.proposal_status ?? 'Not Started',
        grant_applicable: item.grant_applicable ?? false,
      }));

      // Sort by due_date descending
      enriched.sort((a, b) => new Date(b.due_date).getTime() - new Date(a.due_date).getTime());

      // Trim to latest 10
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
      const data = JSON.parse(file);

      const enriched = data.map((item: any) => ({
        ...item,
        pwin: item.pwin ?? Math.floor(Math.random() * 100),
        gates: item.gates ?? {
          gate1: false,
          gate2: false,
          gate3: false,
          gate4: false,
        },
        vehicle: item.vehicle ?? 'TBD',
        proposal_status: item.proposal_status ?? 'Not Started',
        grant_applicable: item.grant_applicable ?? false,
      }));

      return res.status(200).json(enriched);
    } catch (err) {
      console.error('Read error:', err);
      return res.status(200).json([]); // return empty array if file not found
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
