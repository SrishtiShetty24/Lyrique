'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const moods = ['Happy', 'Sad', 'Energetic', 'Calm'];
const genres = ['Rock', 'Pop', 'Jazz', 'Classical'];

const Page = () => {
  const router = useRouter();
  const [lyrics, setLyrics] = useState<string>('');
  const [mood, setMood] = useState<string>(moods[0]); // Default to first mood
  const [genre, setGenre] = useState<string>(genres[0]); // Default to first genre

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: lyrics, mood, genre }),
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
          <label className="block text-lg font-semibold mb-2">Enter Lyrics</label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
            placeholder="Enter your lyrics here"
          />
        </div>

        {/* Mood Dropdown */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {moods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Dropdown */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
          Generate Song
        </button>
      </form>
    </div>
  );
};

export default Page;
