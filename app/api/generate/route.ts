import { NextResponse, NextRequest } from 'next/server';

const LOGO_AI_URL = 'https://www.logoai.com/api/getAllInfo';

async function postToLogoAI(payload: Record<string, unknown>) {
  let response: Response;

  try {
    response = await fetch(LOGO_AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://www.logoai.com',
        'Referer': 'https://www.logoai.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown fetch error';
    return { response: null, parsed: null, raw: '', networkError: message };
  }

  let parsed: unknown = null;
  let raw = '';

  try {
    parsed = await response.json();
  } catch {
    try {
      raw = await response.text();
    } catch {
      raw = '';
    }
  }

  return { response, parsed, raw, networkError: null as string | null };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Redux se aane wale dynamic values ko extract karna
    const { 
      name = "BRAND", 
      slogan = "", 
      industryId,
      fontId,
      colorId,
      industry,
      font,
      color,
    } = body;

    const finalIndustry = industryId ?? industry ?? 23;
    const finalFont = fontId ?? font ?? "1";
    const rawColor = String(colorId ?? color ?? "1").trim();
    const allowedColors = new Set(['1', '2', '3', '4', '5', '6']);
    const finalColor = allowedColors.has(rawColor) ? rawColor : '1';

    const basePayload = {
      name,
      slogan,
      industry: finalIndustry,
      font: finalFont,
      color: finalColor,
      icon_lists: [],
      vDesigners: [1],
      gtoken: "",
      data: [],
      dataPage: 0,
      flippedTplIds: [],
      icon_page: 1,
      industryIconIds: [],
      matchedIconHash: "d41d8cd98f00b204e9800998ecf8427e",
      matchedIconIds: [0],
      miniopenid: "",
      p: 2,
      precomNum: 0,
      predouNum: 91,
      select: "55540,55014,54795,54792,54558,54559,54553,54484,54467,50422",
      selecthash: "17a53c0794d9bcd3ddd8c382fccabb58",
      selectlog: "55540,55014,54795,54792,54558,54559,54553,54484",
      vDesignerTpls: null,
      wechatMiniAppId: "",
    };

    const firstTry = await postToLogoAI(basePayload);
    if (firstTry.response?.ok) {
      return NextResponse.json(firstTry.parsed);
    }

    const retryPayload = {
      ...basePayload,
      matchedIconIds: [],
      selectlog: "",
    };

    // Network failure case: one more retry with same payload before fallback payload
    const secondTry = firstTry.networkError
      ? await postToLogoAI(basePayload)
      : await postToLogoAI(retryPayload);

    if (secondTry.response?.ok) {
      return NextResponse.json(secondTry.parsed);
    }

    const thirdTry = await postToLogoAI(retryPayload);
    if (thirdTry.response?.ok) {
      return NextResponse.json(thirdTry.parsed);
    }

    const statusCode = thirdTry.response?.status ?? secondTry.response?.status ?? 500;
    const details = thirdTry.networkError ?? secondTry.networkError ?? `LogoAI responded with ${statusCode}`;

    return NextResponse.json(
      {
        error: 'API call failed',
        details,
        upstream: thirdTry.parsed ?? thirdTry.raw ?? secondTry.parsed ?? secondTry.raw ?? null,
      },
      { status: statusCode }
    );

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error("Fetch Error:", message);
    return NextResponse.json({ error: "API call failed", details: message }, { status: 500 });
  }
}