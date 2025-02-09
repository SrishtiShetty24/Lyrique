'use client'; // Ensure this file is client-side rendered

import { useState } from 'react'; // Import useState from React
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SongsPage = () => {
  const searchParams = useSearchParams();
  const lyrics = searchParams.get('lyrics'); // Retrieve the lyrics query param

  // State to track song download status
  const [song1Downloaded, setSong1Downloaded] = useState(false);
  const [song2Downloaded, setSong2Downloaded] = useState(false);

  const handleDownload = (songNumber: number) => {
    if (songNumber === 1) {
      setSong1Downloaded(true);
    } else if (songNumber === 2) {
      setSong2Downloaded(true);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Generated Lyrics</h1>
      {lyrics ? (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold">Lyrics:</h2>
          <p className="text-lg">{lyrics}</p>
        </div>
      ) : (
        <p className="mt-4">No lyrics found. Please generate lyrics first.</p>
      )}

      <div className="mt-4">
        <h2 className="text-2xl font-bold">Songs:</h2>
        <div className="mt-2">
          <button
            onClick={() => handleDownload(1)}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md mr-4"
          >
            Download Song 1
          </button>
          {song1Downloaded && <p className="text-green-500">Song 1 downloaded</p>}
        </div>
        <div className="mt-2">
          <button
            onClick={() => handleDownload(2)}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md mr-4"
          >
            Download Song 2
          </button>
          {song2Downloaded && <p className="text-green-500">Song 2 downloaded</p>}
        </div>
      </div>
    </div>
  );
};

// Wrap the page in Suspense
export default function SongsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SongsPage />
    </Suspense>
  );
}
