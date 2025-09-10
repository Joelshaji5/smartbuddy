import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  console.log(apiKey , 'apiKey');
  
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    }),
  });

  const data = await res.json(); // ✅ only one `data` variable

  console.log('🧠 OpenAI Response:', JSON.stringify(data, null, 2));

  const reply = data.choices?.[0]?.message?.content || 'Sorry, no response.';
  return NextResponse.json({ reply });
}
