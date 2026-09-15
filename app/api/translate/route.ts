import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/translate  — server-side translation proxy.
 *
 * Uses MyMemory (api.mymemory.translated.net) — free, no API key, CORS-safe.
 * By running the call server-side we bypass all browser CORS restrictions,
 * making it work identically in Chrome, Safari, Firefox and all mobile browsers.
 *
 * POST body: { texts: string[], lang: string }
 * Response:  { translated: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { texts, lang } = body as { texts: string[]; lang: string };

    if (!texts?.length || !lang) {
      return NextResponse.json({ error: 'Missing texts or lang' }, { status: 400 });
    }

    // Translate each text; cap individual text at 300 chars to stay within MyMemory limits
    const results = await Promise.allSettled(
      texts.map(async (text) => {
        const t = (text ?? '').trim();
        if (!t) return text;

        // Truncate overly long strings (MyMemory limit ~500 chars)
        const chunk = t.length > 300 ? t.slice(0, 300) : t;

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|${encodeURIComponent(lang)}`;
        const res = await fetch(url, { cache: 'force-cache' });
        if (!res.ok) return text;

        const data = await res.json() as {
          responseStatus: number;
          responseData: { translatedText: string };
        };

        if (data.responseStatus !== 200) return text;
        return data.responseData.translatedText || text;
      })
    );

    const translated = results.map((r, i) =>
      r.status === 'fulfilled' ? r.value : texts[i]
    );

    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
