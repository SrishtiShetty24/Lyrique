'use client'; // Mark this as a Client Component

import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [songURL, setSongURL] = useState('');

  const handleGenerateLyrics = async () => {
    const response = await fetch('/api/generate-lyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setLyrics(data.lyrics);
  };

  const handleGenerateSong = async () => {
    const response = await fetch('/api/generate-song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyrics }),
    });
    const data = await response.json();
    setSongURL(data.songURL);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">AI Song Generator</h1>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for the lyrics"
        className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleGenerateLyrics}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Lyrics
      </button>
      
      {lyrics && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Generated Lyrics</h2>
          <pre className="bg-white p-4 border border-gray-300 rounded">{lyrics}</pre>
          <button
            onClick={handleGenerateSong}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate Song
          </button>
        </div>
      )}

      {songURL && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Generated Song</h2>
          <audio controls src={songURL} className="w-full max-w-md"></audio>
        </div>
      )}
    </div>
  );
}
