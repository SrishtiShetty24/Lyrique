'use client'; 

import React, { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [songURL, setSongURL] = useState('');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');

  const handleGenerateLyrics = async () => {
    const response = await fetch('/api/generate-lyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, mood, genre }),
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

      {/* Melody Selection */}
      <div className="w-full max-w-md bg-white p-4 border border-gray-300 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Melody Selection</h2>
        
        {/* Mood Selection */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Mood:</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Energetic">Energetic</option>
            <option value="Calm">Calm</option>
          </select>
        </div>

        {/* Genre Selection */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Genre:</label>
          <select 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a genre</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
            <option value="Classical">Classical</option>
          </select>
        </div>
      </div>

      {/* Prompt Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for the lyrics"
        className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
      />
      
      {/* Generate Lyrics Button */}
      <button
        onClick={handleGenerateLyrics}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Lyrics
      </button>

      {/* Generated Lyrics Display */}
      {lyrics && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Generated Lyrics</h2>
          <pre className="bg-white p-4 border border-gray-300 rounded">{lyrics}</pre>
          
          {/* Generate Song Button */}
          <button
            onClick={handleGenerateSong}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate Song
          </button>
        </div>
      )}

      {/* Audio Player for Generated Song */}
      {songURL && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Generated Song</h2>
          <audio controls src={songURL} className="w-full max-w-md"></audio>
        </div>
      )}
    </div>
  );
}
