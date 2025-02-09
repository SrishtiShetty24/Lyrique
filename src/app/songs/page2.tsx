'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Page2() {
  const [song1Downloaded, setSong1Downloaded] = useState(false);
  const [song2Downloaded, setSong2Downloaded] = useState(false);
  
  const handleDownloadSong = (songNumber: number) => {
    if (songNumber === 1) {
      setSong1Downloaded(true);
      // You can add the logic to download Song 1 here
      console.log('Downloading Song 1...');
    } else {
      setSong2Downloaded(true);
      // You can add the logic to download Song 2 here
      console.log('Downloading Song 2...');
    }
  };

  const handleRefresh = () => {
    // Reset download states
    setSong1Downloaded(false);
    setSong2Downloaded(false);
    console.log('Page refreshed');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Page 2: Lyrics & Songs</h1>

      {/* Lyrics Section */}
      <div className="mb-8 w-3/4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Lyrics 1</h2>
          <p className="text-lg">These are the lyrics for Song 1...</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Lyrics 2</h2>
          <p className="text-lg">These are the lyrics for Song 2...</p>
        </div>
      </div>

      {/* Song Section */}
      <div className="mb-8 w-3/4">
        <div className="mb-6">
          <h3 className="text-xl font-bold">Song 1</h3>
          <button
            onClick={() => handleDownloadSong(1)}
            className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md mb-4"
          >
            {song1Downloaded ? 'Song 1 Downloaded' : 'Download Song 1'}
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold">Song 2</h3>
          <button
            onClick={() => handleDownloadSong(2)}
            className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md mb-4"
          >
            {song2Downloaded ? 'Song 2 Downloaded' : 'Download Song 2'}
          </button>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md mt-12"
      >
        Refresh
      </button>

      {/* Link back to Home */}
      <Link href="/" className="mt-4 text-blue-600">Go back to Home</Link>
    </div>
  );
}

