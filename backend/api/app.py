from flask import Flask, request, jsonify
import openai
import soundfile as sf
import numpy as np
import os

app = Flask(__name__)

openai.api_key = "your_openai_api_key"  # Add your OpenAI API key here

# 1. GPT-3 Lyrics Generator
@app.route('/generate-lyrics', methods=['POST'])
def generate_lyrics():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    # Call GPT-3 API to generate lyrics based on user prompt
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Write song lyrics about: {prompt}",
        max_tokens=150
    )
    lyrics = response.choices[0].text.strip()
    
    return jsonify({'lyrics': lyrics})

# 2. Simplified Melody Generator (Mock function)
@app.route('/generate-song', methods=['POST'])
def generate_song():
    data = request.json
    lyrics = data.get('lyrics')
    
    if not lyrics:
        return jsonify({'error': 'Lyrics are required'}), 400

    # Mock melody generation - create a simple sine wave melody for demonstration
    def generate_melody():
        # Generate a simple sine wave melody
        sample_rate = 44100  # 44.1kHz sample rate
        duration = 30  # 30 seconds of audio
        frequency = 440  # Frequency in Hz (A4 note)

        t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
        melody_audio = 0.5 * np.sin(2 * np.pi * frequency * t)
        melody_file = 'output_melody.wav'
        sf.write(melody_file, melody_audio, sample_rate)
        
        return melody_file
    
    melody_file = generate_melody()

    # Voice synthesis placeholder (this is where voice would be added)
    voice_file = "path_to_pre_synthesized_voice.wav"  # Dummy file, you can extend this to synthesize dynamically
    
    # Combine Melody and Voice (currently simple overlay)
    voice_audio, voice_sr = sf.read(voice_file)
    melody_audio, melody_sr = sf.read(melody_file)
    
    if voice_sr != melody_sr:
        raise ValueError("Sample rates do not match!")
    
    # Ensure that both audio tracks are the same length
    min_len = min(len(voice_audio), len(melody_audio))
    voice_audio = voice_audio[:min_len]
    melody_audio = melody_audio[:min_len]
    
    combined_audio = voice_audio + melody_audio
    combined_song_path = 'combined_song.wav'
    sf.write(combined_song_path, combined_audio, voice_sr)

    return jsonify({'songURL': combined_song_path})

if __name__ == '__main__':
    app.run(debug=True)