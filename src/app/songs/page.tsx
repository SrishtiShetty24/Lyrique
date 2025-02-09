'use client';  // Ensure this file is client-side rendered

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SongsPage = () => {
  const searchParams = useSearchParams();
  const lyrics = searchParams.get('lyrics'); // Retrieve the lyrics query param

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
      <h1 className="text-4xl font-bold mb-6">Page 2 - Song Details</h1>

      {/* Song 1 with Lyrics */}
      <div className="mb-6 w-3/4">
        <h2 className="text-2xl font-bold">Lyrics 1</h2>
        <p className="text-lg">{lyrics}</p>
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
        <p className="text-lg">{lyrics}</p>
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


// Wrap the page in Suspense
export default function SongsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongsPage />
    </Suspense>
  );
}
