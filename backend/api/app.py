from flask import Flask, request, jsonify, send_from_directory
import openai
import soundfile as sf
import numpy as np
import os
import shutil

# Initialize Flask app
app = Flask(__name__)

# Set the OpenAI API key (Ensure this is properly set in your environment variables)
openai.api_key = os.getenv("OPENAI_API_KEY")  # Use environment variable for security

# Directories for saving the files (Vercel uses /tmp for temporary storage)
TEMP_FOLDER = '/tmp/temp_audio'
PERMANENT_FOLDER = '/tmp/static/songs'

# Create directories if they don't exist
os.makedirs(TEMP_FOLDER, exist_ok=True)
os.makedirs(PERMANENT_FOLDER, exist_ok=True)

# Home route to test server
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Hello from Flask!"})

# 1. GPT-3 Lyrics Generator
@app.route('/generate-lyrics', methods=['POST'])
def generate_lyrics():
    data = request.json
    prompt = data.get('prompt')
    mood = data.get('mood')
    genre = data.get('genre')
    
    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    # Call GPT-3 API to generate lyrics based on user prompt
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"""Write song lyrics about: {prompt} and only return the Lyrics. 
            Split the paragraphs into verses. Utilize the {mood} mood provided.
            And for every prompt, follow the provided genre {genre}""",
            max_tokens=150
        )
        lyrics = response.choices[0].text.strip()
        return jsonify({'lyrics': lyrics})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 2. Simplified Melody Generator (Mock function)
@app.route('/generate-song', methods=['POST'])
def generate_song():
    data = request.json
    lyrics = data.get('lyrics')
    
    if not lyrics:
        return jsonify({'error': 'Lyrics are required'}), 400

    # Mock melody generation - create a simple sine wave melody for demonstration
    def generate_melody():
        sample_rate = 44100  # 44.1kHz sample rate
        duration = 30  # 30 seconds of audio
        frequency = 440  # Frequency in Hz (A4 note)

        t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
        melody_audio = 0.5 * np.sin(2 * np.pi * frequency * t)
        melody_file = os.path.join(TEMP_FOLDER, 'output_melody.wav')
        sf.write(melody_file, melody_audio, sample_rate)
        
        return melody_file
    
    melody_file = generate_melody()

    # Voice synthesis placeholder (this is where voice would be added)
    try:
        voice_file = "path_to_pre_synthesized_voice.wav"  # Dummy file, you can extend this to synthesize dynamically
        voice_audio, voice_sr = sf.read(voice_file)
        melody_audio, melody_sr = sf.read(melody_file)
        
        if voice_sr != melody_sr:
            raise ValueError("Sample rates do not match!")
        
        # Ensure that both audio tracks are the same length
        min_len = min(len(voice_audio), len(melody_audio))
        voice_audio = voice_audio[:min_len]
        melody_audio = melody_audio[:min_len]
        
        combined_audio = voice_audio + melody_audio
        combined_song_path = os.path.join(PERMANENT_FOLDER, 'combined_song.wav')
        sf.write(combined_song_path, combined_audio, voice_sr)

        # Move the file to the permanent folder
        shutil.move(combined_song_path, os.path.join(PERMANENT_FOLDER, 'final_song.wav'))

        return jsonify({'songURL': f'/download/{os.path.basename(combined_song_path)}'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to download the final song
@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    return send_from_directory(PERMANENT_FOLDER, filename)

# Vercel uses serverless functions, so there's no need for app.run(), Vercel handles the routing automatically
