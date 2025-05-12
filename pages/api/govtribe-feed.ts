// File: pages/api/govtribe-feed.ts
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const DATA_FILE = path.join(process.cwd(), 'data/govtribe.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let body = req.body;

    // ✅ UNWRAP in case Zapier wraps the payload
    if (Array.isArray(body) && body.length === 1 && body[0]?.wrap) {
      body = body[0].wrap;
    }

    const wrap = Array.isArray(body) ? body : [body];

    try {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(wrap, null, 2));
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('File write error:', err);
      return res.status(500).json({ error: 'Failed to write file' });
    }
  }

  if (req.method === 'GET') {
    try {
      const file = fs.readFileSync(DATA_FILE, 'utf-8');
      return res.status(200).json(JSON.parse(file));
    } catch (err) {
      return res.status(200).json([]); // default to empty array
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
