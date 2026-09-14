/**
 * Serverless function: /api/health
 * Reports whether HDB_RESALE_PRICE_API_KEY is configured (keyConfigured)
 * and whether upstream data.gov.sg answered, including the HTTP status returned.
 * Never prints or leaks the credential or any part of it.
 */

export default async function handler(req, res) {
  // Support standard Node HTTP / Connect response methods if not running in Express/Vercel
  if (!res.status) {
    res.status = function (code) {
      this.statusCode = code;
      return this;
    };
  }
  if (!res.json) {
    res.json = function (data) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };
  }

  // 1. BEFORE the fetch: Check whether the credential is configured
  const apiKey = process.env.HDB_RESALE_PRICE_API_KEY;
  const keyConfigured = Boolean(
    apiKey && apiKey !== 'undefined' && apiKey.trim() !== ''
  );

  if (!keyConfigured) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({
      keyConfigured: false,
      upstreamAnswered: false,
      upstreamStatus: null,
      variable: 'HDB_RESALE_PRICE_API_KEY',
      reason:
        'The environment variable HDB_RESALE_PRICE_API_KEY is missing or empty. Upstream check was not performed.',
    });
  }

  // 2. Credential is present, check if upstream answers
  const probeUrl =
    'https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=1';

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(probeUrl, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        Accept: 'application/json',
      },
    });
  } catch (networkErr) {
    return res.status(502).json({
      keyConfigured: true,
      upstreamAnswered: false,
      upstreamStatus: null,
      error: 'Upstream unreachable',
      reason:
        networkErr?.message ||
        'Unable to reach data.gov.sg API. Network or connection error.',
    });
  }

  // Upstream answered
  const upstreamStatus = upstreamResponse.status;

  // 3. AFTER the fetch: Check response.ok before reading body
  if (!upstreamResponse.ok) {
    let upstreamReason = upstreamResponse.statusText || 'Upstream request refused';
    try {
      const errText = await upstreamResponse.text();
      if (errText) {
        try {
          const parsed = JSON.parse(errText);
          upstreamReason =
            parsed.message || parsed.error?.message || errText.slice(0, 120);
        } catch {
          upstreamReason = errText.slice(0, 120);
        }
      }
    } catch {
      // Body empty or unreadable
    }

    return res.status(upstreamStatus).json({
      keyConfigured: true,
      upstreamAnswered: true,
      upstreamStatus,
      error: 'Upstream refused request',
      reason: `Upstream returned status ${upstreamStatus}: ${upstreamReason}`,
    });
  }

  // Read response body safely
  try {
    await upstreamResponse.json();
  } catch {
    // Upstream replied 200 with non-JSON
  }

  // Upstream answered successfully
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');
  return res.status(200).json({
    keyConfigured: true,
    upstreamAnswered: true,
    upstreamStatus,
    status: 'healthy',
  });
}
