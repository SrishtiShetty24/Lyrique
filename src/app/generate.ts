import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  // Here you would call ChatGPT API (use your key and endpoint)
  const generatedLyrics = `Generated lyrics based on the prompt: ${prompt}`;

  res.status(200).json({ lyrics: generatedLyrics });
}
