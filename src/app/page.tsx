{3}
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
