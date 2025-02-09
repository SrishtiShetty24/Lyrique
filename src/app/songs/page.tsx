'use client'; // Ensure this file is client-side rendered

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type LyricsData = {
  lyrics: string;
  mood: string;
  genre: string;
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
    let songFileURL: string;
    let songFileName: string;

    // Define the hardcoded song URL based on the song number
    if (songNumber === 1) {
      // Hardcoded audio file URL for song 1 (you can use any valid URL or base64-encoded audio data)
      songFileURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Example audio file
      songFileName = 'song1_sample.mp3'; // Set the file name for download
    } else if (songNumber === 2) {
      // Hardcoded audio file URL for song 2
      songFileURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'; // Example audio file
      songFileName = 'song2_sample.mp3'; // Set the file name for download
    } else {
      return;
    }

    // Create a link to download the audio file
    const link = document.createElement('a');
    link.href = songFileURL;
    link.download = songFileName;

    document.body.appendChild(link);
    
    // Programmatically click the anchor tag to start the download
    link.click();

    document.body.removeChild(link);
    
    // Set the download state to indicate the song has been downloaded
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
          <p className="text-lg">{data ? data.genre : "Loading genre..."}</p>
          <p className="text-lg">{data ? data.mood : "Loading mood..."}</p>
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
