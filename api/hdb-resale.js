/**
 * Serverless function: /api/hdb-resale
 * Calls data.gov.sg CKAN datastore_search endpoint for HDB resale flat prices.
 * Returns only the fields needed by the application:
 * month, town, flat_type, resale_price, floor_area_sqm.
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

  // Only allow GET requests
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      reason: 'Only GET requests are supported.',
    });
  }

  // 1. BEFORE the fetch: Verify credential exists and is non-empty
  const apiKey = process.env.HDB_RESALE_PRICE_API_KEY;
  if (!apiKey || apiKey === 'undefined' || apiKey.trim() === '') {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({
      error: 'Service Unavailable: Missing credential',
      variable: 'HDB_RESALE_PRICE_API_KEY',
      reason:
        'The environment variable HDB_RESALE_PRICE_API_KEY is missing or empty. Please configure HDB_RESALE_PRICE_API_KEY in your environment.',
    });
  }

  // Set HTTP caching headers matching data update frequency (daily)
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');

  // Extract query parameters
  let queryParams = {};
  try {
    if (req.query && typeof req.query === 'object') {
      queryParams = req.query;
    } else if (req.url) {
      const parsedUrl = new URL(req.url, 'http://localhost');
      queryParams = Object.fromEntries(parsedUrl.searchParams.entries());
    }
  } catch {
    queryParams = {};
  }

  const { town, flat_type, limit } = queryParams;

  // Construct upstream URL with required dataset ID
  const upstreamUrl = new URL('https://data.gov.sg/api/action/datastore_search');
  upstreamUrl.searchParams.set('resource_id', 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc');
  upstreamUrl.searchParams.set(
    'fields',
    'month,town,flat_type,resale_price,floor_area_sqm'
  );
  upstreamUrl.searchParams.set('sort', 'month desc');

  const recordLimit = Math.min(Math.max(parseInt(limit, 10) || 15000, 1), 20000);
  upstreamUrl.searchParams.set('limit', String(recordLimit));

  // Build filter object for CKAN datastore_search if town or flat_type is specified
  const filters = {};
  if (town && typeof town === 'string' && town.trim() !== '') {
    filters.town = town.trim().toUpperCase();
  }
  if (flat_type && typeof flat_type === 'string' && flat_type.trim() !== '') {
    // Normalise '4-ROOM' to '4 ROOM' format used by data.gov.sg
    filters.flat_type = flat_type.trim().replace('-', ' ').toUpperCase();
  }

  if (Object.keys(filters).length > 0) {
    upstreamUrl.searchParams.set('filters', JSON.stringify(filters));
  }

  // 2. Fetch from upstream data.gov.sg
  let upstreamResponse;
  try {
    upstreamResponse = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        Accept: 'application/json',
      },
    });
  } catch (networkErr) {
    return res.status(502).json({
      error: 'Upstream unreachable',
      reason:
        networkErr?.message ||
        'Unable to connect to data.gov.sg API. The upstream service is unreachable.',
    });
  }

  // 3. AFTER the fetch: Check response.ok before attempting to read body
  if (!upstreamResponse.ok) {
    let upstreamReason = upstreamResponse.statusText || 'Upstream request refused';
    try {
      const errorText = await upstreamResponse.text();
      if (errorText) {
        try {
          const parsed = JSON.parse(errorText);
          upstreamReason =
            parsed.message || parsed.error?.message || errorText.slice(0, 120);
        } catch {
          upstreamReason = errorText.slice(0, 120);
        }
      }
    } catch {
      // Body empty or unreadable
    }

    return res.status(upstreamResponse.status).json({
      error: 'Upstream refused request',
      upstreamStatus: upstreamResponse.status,
      reason: `Upstream returned status ${upstreamResponse.status}: ${upstreamReason}`,
    });
  }

  // Parse JSON body safely
  let payload;
  try {
    payload = await upstreamResponse.json();
  } catch (jsonErr) {
    return res.status(502).json({
      error: 'Invalid upstream JSON',
      reason:
        jsonErr?.message ||
        'Failed to parse JSON response payload from data.gov.sg.',
    });
  }

  const rawRecords = payload?.result?.records || [];

  // Return ONLY the fields needed by the screen:
  // month, town, flat_type, resale_price, floor_area_sqm
  const records = rawRecords.map((item) => ({
    month: String(item.month || ''),
    town: String(item.town || ''),
    flat_type: String(item.flat_type || ''),
    resale_price: Number(item.resale_price) || 0,
    floor_area_sqm: Number(item.floor_area_sqm) || 0,
  }));

  return res.status(200).json({
    success: true,
    total: payload?.result?.total ?? records.length,
    records,
  });
}
