import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  // Call the ChatGPT API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates song lyrics.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  const lyrics = data.choices[0].message.content;

  return NextResponse.json({ lyrics });
}
