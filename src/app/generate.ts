import generateSong from './generate'; // Assuming generate.ts has a function

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Song Generator</h1>
      <button
        onClick={generateSong}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate Song
      </button>
    </div>
  );
}

/* import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  // Here you would call ChatGPT API (use your key and endpoint)
  const generatedLyrics = `Generated lyrics based on the prompt: ${prompt}`;

  res.status(200).json({ lyrics: generatedLyrics });
}
*/
