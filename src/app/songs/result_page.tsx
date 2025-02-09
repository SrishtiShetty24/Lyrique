'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';  // Updated import

const ResultPage = () => {
  const searchParams = useSearchParams();  // Accessing search params
  const [songData, setSongData] = useState<any>(null);

  useEffect(() => {
    const data = searchParams.get('data');  // Using get to retrieve the query param
    if (data) {
      setSongData(JSON.parse(data));
    }
  }, [searchParams]);

  if (!songData) return <div>Loading...</div>;

  const { lyrics, songFileUrl } = songData;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Your Generated Song</h1>

      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Lyrics:</h2>
        <p className="text-lg">{lyrics}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Song File:</h2>
        {songFileUrl ? (
          <div>
            <audio controls className="mb-4">
              <source src={songFileUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <div className="text-center">
              <a
                href={songFileUrl}
                download="generated_song.mp3"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
              >
                Download Song
              </a>
            </div>
          </div>
        ) : (
          <p>No song file generated.</p>
        )}
      </div>
    </div>
  );
};

export default ResultPage;