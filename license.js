export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('method_not_allowed');
  
  try {
    const { hwid, bucket } = req.body || {};
    
    // Walidacja danych
    if (!hwid || typeof bucket !== 'number') {
      return res.status(200).send('denied');
    }

    // Lista dozwolonych HWID (pusta = wszystkie dozwolone)
    const ALLOWED_HWIDS = new Set([
      // 'twoj-hwid-tutaj',
      // 'inny-hwid-tutaj'
    ]);

    // Sprawdź czy HWID jest dozwolony
    const allowed = ALLOWED_HWIDS.size === 0 || ALLOWED_HWIDS.has(String(hwid));
    
    // Logowanie dla debugowania
    console.log(`License check: hwid=${hwid}, bucket=${bucket}, allowed=${allowed}`);
    
    return res.status(200).send(allowed ? 'ok' : 'denied');
    
  } catch (error) {
    console.error('License error:', error);
    return res.status(200).send('denied');
  }
}
