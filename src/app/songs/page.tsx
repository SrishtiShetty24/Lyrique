'use client'; // Ensure this file is client-side rendered

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type LyricsData = {
  lyrics: string;
};

const SongsPage = () => {
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data'); // Retrieve the lyrics query param
  const [data, setData] = useState<LyricsData | null>(null);
  
  useEffect(() => {
    if (dataString) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataString));
        setData(parsedData); // Set the parsed data to state
      } catch (error) {
        console.error('Error parsing data:', error);
      }
    }
  }, [dataString]);
  
  // State to track song download status
  const [song1Downloaded, setSong1Downloaded] = useState(false);
  const [song2Downloaded, setSong2Downloaded] = useState(false);

  const handleDownloadSong = (songNumber: number) => {
    if (songNumber === 1) {
      setSong1Downloaded(true);
    } else if (songNumber === 2) {
      setSong2Downloaded(true);
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
          <p className="text-lg">{data ? data.lyrics : "Loading lyrics..."}</p>
          <p className="text-lg">{data ? data.genre : "Loading lyrics..."}</p>
          <p className="text-lg">{data ? data.mood : "Loading lyrics..."}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Lyrics 2</h2>
          <p className="text-lg">{data ? data.lyrics : "Loading lyrics..."}</p>
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
