import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = process.env.RELAYER_API || "http://localhost:8080/api/report";
  const r = await fetch(api, { method: req.method, headers: req.headers as any, body: JSON.stringify(req.body) });
  const json = await r.json();
  res.status(r.status).json(json);
}
