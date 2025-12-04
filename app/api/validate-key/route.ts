import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();   // ✅ FIXED

    console.log(body);

    const apiKey = body.apiKey;

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing apiKey' }, { status: 400 });
    }

    const formData = new FormData()
    formData.append('apiKey', apiKey)
    const externalResponse = await fetch('http://77.104.167.149:43159/api/v1/external-validate-api-key', {
      method: 'POST',
      body: formData,
    });

    let payload: any = null
    try {
      payload = await externalResponse.json()
    } catch {
      // ignore JSON parse errors, handled below
    }

    // Treat any non-2xx or missing/invalid payload as a validation failure
    if (!externalResponse.ok || !payload || payload.error || !payload.id) {
      const message =
        (payload && (payload.error || payload.message)) ||
        'Invalid API key or user not found'

      return NextResponse.json(
        { error: message },
        { status: externalResponse.ok ? 400 : externalResponse.status },
      )
    }

    const validatedUser = {
      id: payload.id,
      email: payload.email,
      subscription_tier: payload.subscription_tier,
      credits: payload.credits,
      credits_per_month: payload.credits_per_month,
      limits: payload.limits,
    }

    return NextResponse.json({ validatedUser });
  } catch (error) {
    console.error('validate route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
