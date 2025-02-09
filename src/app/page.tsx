'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [lyrics, setLyrics] = useState<string>('');

  const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: lyrics }),
    });

    const data = await response.json();

    if (data.lyrics) {
      setLyrics(data.lyrics);
    }

    router.push(`/songs/result?data=${encodeURIComponent(JSON.stringify(data))}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Generate Your Song</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <label htmlFor="lyrics" className="block text-lg font-semibold mb-2">
            Enter Lyrics
          </label>
          <textarea
            id="lyrics"
            value={lyrics}
            onChange={handleLyricsChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
            placeholder="Enter your lyrics here"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
        >
          Generate Song
        </button>
      </form>
    </div>
  );
};

export default Page;
