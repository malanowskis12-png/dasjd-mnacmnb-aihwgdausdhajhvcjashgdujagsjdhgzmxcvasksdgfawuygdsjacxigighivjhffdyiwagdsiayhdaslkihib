// api/license.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('method_not_allowed');
  try {
    const { hwid, bucket } = req.body || {};
    if (!hwid || typeof bucket !== 'number') return res.status(200).send('denied');

    const ALLOWED_HWIDS = new Set([
      // 'wstaw-swoje-hwidy'
    ]);

    const allowed = ALLOWED_HWIDS.size === 0 || ALLOWED_HWIDS.has(String(hwid));
    return res.status(200).send(allowed ? 'ok' : 'denied');
  } catch {
    return res.status(200).send('denied');
  }
}
