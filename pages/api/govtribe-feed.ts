// File: pages/api/govtribe-feed.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Ephemeral in-memory store (will reset on redeploy)
let GOVTRIBE_FEED: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      const wrap = Array.isArray(body) ? body : [body];
      GOVTRIBE_FEED = wrap;
      return res.status(200).json({ success: true, count: GOVTRIBE_FEED.length });
    } catch (err) {
      console.error('POST error:', err);
      return res.status(500).json({ error: 'Failed to process feed' });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json(GOVTRIBE_FEED);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
