import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'No lyrics provided' }, { status: 400 });
    }

    // Placeholder: Call your backend to generate lyrics and song
    const generatedLyrics = `Generated lyrics based on: ${prompt}`;
    const songFileUrl = '/songs/generated_song.mp3'; // Placeholder file URL

    return NextResponse.json({ lyrics: generatedLyrics, songFileUrl });
  } catch (error) {
    console.error('Error generating song:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
