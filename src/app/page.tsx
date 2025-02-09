'use client';

import React, { useState, useRef } from 'react';

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

  const handleGenerateLyrics = () => {
    setGeneratedLyrics(`Generated lyrics based on mood: ${mood}, genre: ${genre}, and prompt: ${lyricsPrompt}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Song Generator</h1>
      
      <div className="mb-4">
        <label className="block mb-1">Mood:</label>
        <select className="p-2 border rounded" value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">Select a mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="excited">Excited</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Genre:</label>
        <select className="p-2 border rounded" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select a genre</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Enter a prompt for the lyrics:</label>
        <input
          type="text"
          className="p-2 border rounded w-full"
          value={lyricsPrompt}
          onChange={(e) => setLyricsPrompt(e.target.value)}
        />
      </div>

      <button onClick={handleGenerateLyrics} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md mb-4">
        Generate Lyrics
      </button>

      {generatedLyrics && (
        <div className="p-4 bg-white rounded shadow-md mb-4">
          <h2 className="text-xl font-bold">Generated Lyrics:</h2>
          <p>{generatedLyrics}</p>
        </div>
      )}

      <button
        onClick={recording ? handleStopRecording : handleStartRecording}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {audioURL && (
        <audio controls className="mt-4">
          <source src={audioURL} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

