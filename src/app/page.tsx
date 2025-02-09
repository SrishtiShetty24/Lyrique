'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

const moods = ['Happy', 'Sad', 'Energetic', 'Relaxed'];
const genres = ['Rock', 'Pop', 'Jazz', 'Hip-Hop'];

const Page = () => {
  const router = useRouter();
  const [lyrics, setLyrics] = useState<string>('');
  const [mood, setMood] = useState<string>(moods[0]); // Default to first mood
  const [genre, setGenre] = useState<string>(genres[0]); // Default to first genre
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);



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
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    console.log('Submitting:', { prompt: lyrics, mood, genre }); // Debug log


    
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: lyrics, mood, genre }),
      });

      const data = await response.json();
      console.log('API Response:', data); // Debug log

      if (!data.lyrics || !data.songFileUrl) {
        throw new Error('Failed to generate song. Try again.');
      }

      router.push(`/songs/result?data=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Generate Your Song</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Enter Lyrics</label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
            placeholder="Enter your lyrics here"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {moods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Song'}
        </button>
        
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
      </form>
    </div>
  );
};

export default Page;
