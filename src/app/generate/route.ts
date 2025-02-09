// src/app/api/generate/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const apiKey = process.env.OPENAI_API_KEY; // Access the API key from environment variables

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // Use the appropriate model
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates song lyrics.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150, // Adjust as needed
    }),
  });

  const data = await response.json();
  const generatedLyrics = data.choices[0].message.content; // Extract the generated lyrics

  // Call a separate function to generate the song file if required
  const songFileUrl = await generateSongFile(generatedLyrics);  // hypothetical function to generate song file

  return NextResponse.json({
    lyrics: generatedLyrics,
    songFileUrl: songFileUrl,
  });
}

// Placeholder function for generating a song file (implement your song generation logic)
async function generateSongFile(lyrics: string) {
  // Simulating song file generation (you can integrate a service like Magenta here)
  const songFilePath = '/path/to/generated/song.mp3';  // Path to where your generated file will be saved

  // Logic to generate song from lyrics
  // For example, use an external API or library to synthesize a song
  // Return the URL path where the file can be accessed
  return `/songs/generated_song.mp3`;
}
