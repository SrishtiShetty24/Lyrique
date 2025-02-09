'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [lyricsPrompt, setLyricsPrompt] = useState('');
  const [generatedLyrics, setGeneratedLyrics] = useState('');

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      audioChunksRef.current = [];
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const router = useRouter();
  const handleGenerateLyrics = () => {
    setGeneratedLyrics(`Generated lyrics based on mood: ${mood}, genre: ${genre}, and prompt: ${lyricsPrompt}`);

    const requestData = {
      mood,
      genre,
      lyricsPrompt,
      audioURL,
    };

    // Making the API request to generate lyrics
    try {
      
      const response = await fetch('/api/generate-lyrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data.message = "Lyrics Sample testing"; //await response.json();

      if (response.ok) {
        setGeneratedLyrics(data.message); // Handle response accordingly
        // Navigate to songs page with lyrics as query param
        router.push({
          pathname: '/songs',
          query: { lyrics: data.message },
        });
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">AI Song Generator</h1>
      
      <div className="mb-4 w-3/4">
        <label className="block mb-1 text-lg">Mood:</label>
        <select className="p-3 border rounded w-full" value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">Select a mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="excited">Excited</option>
          <option value="calm">Calm</option>
        </select>
      </div>

      <div className="mb-4 w-3/4">
        <label className="block mb-1 text-lg">Genre:</label>
        <select className="p-3 border rounded w-full" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select a genre</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
        </select>
      </div>

      <div className="mb-4 w-3/4">
        <label className="block mb-1 text-lg">Enter a prompt for the lyrics:</label>
        <textarea
          className="p-3 border rounded w-full bg-gray-200"
          value={lyricsPrompt}
          onChange={(e) => setLyricsPrompt(e.target.value)}
          rows={3}
        />
      </div>
        <button onClick={handleGenerateLyrics} className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md mb-4">
          Generate Lyrics
        </button>
      
      {generatedLyrics && (
        <div className="p-4 bg-white rounded shadow-md mb-4 w-3/4">
          <h2 className="text-2xl font-bold">Generated Lyrics:</h2>
          <p className="text-lg">{generatedLyrics}</p>
        </div>
      )}

      {audioURL && (
        <audio controls className="mt-4">
          <source src={audioURL} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}

      <button
        onClick={recording ? handleStopRecording : handleStartRecording}
        className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md mt-12"
      >
        {recording ? 'Stop Recording' : 'Voice Recording'}
      </button>
    </div>
  );
}

