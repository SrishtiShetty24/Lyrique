'use client';

import React, { useState, useRef } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [songURL, setSongURL] = useState('');
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleGenerateLyrics = async () => {
    const response = await fetch('/api/generate-lyrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, mood, genre }),
    });
    const data = await response.json();
    setLyrics(data.lyrics);
  };

  const handleGenerateSong = async () => {
    const response = await fetch('/api/generate-song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lyrics }),
    });
    const data = await response.json();
    setSongURL(data.songURL);
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (stream) {
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
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedAudio(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">AI Song Generator</h1>

      <div className="w-full max-w-md bg-white p-4 border border-gray-300 rounded shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Melody Selection</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Mood:</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select a mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Energetic">Energetic</option>
            <option value="Calm">Calm</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Genre:</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select a genre</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            <option value="Jazz">Jazz</option>
            <option value="Classical">Classical</option>
          </select>
        </div>
      </div>

      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter a prompt for the lyrics" className="w-full max-w-md p-2 border border-gray-300 rounded mb-4" />
      
      <button onClick={handleGenerateLyrics} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Generate Lyrics</button>
      
      {lyrics && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Generated Lyrics</h2>
          <pre className="bg-white p-4 border border-gray-300 rounded">{lyrics}</pre>
          <button onClick={handleGenerateSong} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Generate Song</button>
        </div>
      )}

      {songURL && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Generated Song</h2>
          <audio controls src={songURL} className="w-full max-w-md"></audio>
        </div>
      )}

      {/* Voice Recording */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Record Your Voice</h2>
        <button 
          onClick={recording ? handleStopRecording : handleStartRecording} 
          className={`px-4 py-2 rounded ${recording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        {audioURL && (
          <div className="mt-4">
            <audio controls src={audioURL} className="w-full"></audio>
          </div>
        )}
      </div>

      {/* Audio Upload */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Upload an Audio File</h2>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} className="mb-4" />
        {uploadedAudio && (
          <div className="mt-4">
            <audio controls src={uploadedAudio} className="w-full"></audio>
          </div>
        )}
      </div>
    </div>
  );
}
