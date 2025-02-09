'use client';  // Ensure this file is client-side rendered

import React, { useState } from 'react';

export default function Page2() {
  //const [song1, setSong1] = useState<string | null>(null);
  //const [song2, setSong2] = useState<string | null>(null);

  const handleDownload = (songId: number) => {
    console.log(`Downloading song ${songId}`);
    // Add logic to download the song
  };

  const handleRefresh = (songId: number) => {
    console.log(`Refreshing song ${songId}`);
    // Add logic to refresh the song
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Page 2 - Song Details</h1>

      {/* Song 1 with Lyrics */}
      <div className="mb-6 w-3/4">
        <h2 className="text-2xl font-bold">Lyrics 1</h2>
        <p className="text-lg">Here are the lyrics for song 1.</p>
        <div className="mt-4">
          <button onClick={() => handleDownload(1)} className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md mr-4">
            Download Song 1
          </button>
          <button onClick={() => handleRefresh(1)} className="px-6 py-3 bg-yellow-500 text-white text-lg rounded-lg shadow-md">
            Refresh Song 1
          </button>
        </div>
      </div>

      {/* Song 2 with Lyrics */}
      <div className="mb-6 w-3/4">
        <h2 className="text-2xl font-bold">Lyrics 2</h2>
        <p className="text-lg">Here are the lyrics for song 2.</p>
        <div className="mt-4">
          <button onClick={() => handleDownload(2)} className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md mr-4">
            Download Song 2
          </button>
          <button onClick={() => handleRefresh(2)} className="px-6 py-3 bg-yellow-500 text-white text-lg rounded-lg shadow-md">
            Refresh Song 2
          </button>
        </div>
      </div>
    </div>
  );
}
