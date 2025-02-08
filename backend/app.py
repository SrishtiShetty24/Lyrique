from flask import Flask, request, jsonify
import openai
import magenta
from magenta.models.shared import sequence_generator
from magenta.music import midi_io
import soundfile as sf
import os

app = Flask(__name__)

openai.api_key = "your_openai_api_key"  # Add your OpenAI API key here

# 1. GPT-3 Lyrics Generator
@app.route('/generate-lyrics', methods=['POST'])
def generate_lyrics():
    data = request.json
    prompt = data['prompt']
    
    # Call GPT-3 API to generate lyrics based on user prompt
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Write song lyrics about: {prompt}",
        max_tokens=150
    )
    lyrics = response.choices[0].text.strip()
    
    return jsonify({'lyrics': lyrics})

# 2. Magenta Melody Generator
@app.route('/generate-song', methods=['POST'])
def generate_song():
    data = request.json
    lyrics = data['lyrics']
    
    # Call Magenta to generate a melody
    def generate_melody():
        bundle = magenta.music.read_bundle_file('attention_rnn.mag')
        melody_rnn = sequence_generator.get_generator_map()['attention_rnn'](checkpoint=None)
        melody_rnn.initialize(bundle)
        generator_options = magenta.protobuf.generator_pb2.GeneratorOptions()
        generator_options.args['temperature'].float_value = 1.0
        generator_options.generate_sections.add(start_time=0, end_time=32)
        sequence = melody_rnn.generate(magenta.music.NoteSequence(), generator_options)
        midi_io.sequence_proto_to_midi_file(sequence, 'output_melody.mid')
        return 'output_melody.mid'
    
    melody_file = generate_melody()

    # Voice synthesis placeholder (this is where voice would be added)
    voice_file = "path_to_pre_synthesized_voice.wav"  # Dummy file, you can extend this to synthesize
    
    # Combine Melody and Voice (currently simple overlay)
    voice_audio, voice_sr = sf.read(voice_file)
    melody_audio, melody_sr = sf.read(melody_file)
    if voice_sr != melody_sr:
        raise ValueError("Sample rates do not match!")
    combined_audio = voice_audio + melody_audio
    combined_song_path = 'combined_song.wav'
    sf.write(combined_song_path, combined_audio, voice_sr)

    return jsonify({'songURL': combined_song_path})

if __name__ == '__main__':
    app.run(debug=True)