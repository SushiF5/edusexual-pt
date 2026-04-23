import os
import json
import struct
import time
from google import genai
from google.genai import types

# --- CONFIGURAÇÃO ---
OUTPUT_DIR = "public/audio/podcast"
SLEEP_TIME = 22
# --------------------

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def save_binary_file(file_name, data):
    with open(file_name, "wb") as f:
        f.write(data)
    print(f"✅ Guardado: {file_name}")

def convert_to_wav(audio_data: bytes, mime_type: str) -> bytes:
    parameters = parse_audio_mime_type(mime_type)
    bits_per_sample = parameters["bits_per_sample"]
    sample_rate = parameters["rate"]
    num_channels = 1
    data_size = len(audio_data)
    bytes_per_sample = bits_per_sample // 8
    block_align = num_channels * bytes_per_sample
    byte_rate = sample_rate * block_align
    chunk_size = 36 + data_size
    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF", chunk_size, b"WAVE", b"fmt ", 16, 1, num_channels, 
        sample_rate, byte_rate, block_align, bits_per_sample, b"data", data_size
    )
    return header + audio_data

def parse_audio_mime_type(mime_type: str) -> dict:
    bits_per_sample = 16
    rate = 24000
    parts = mime_type.split(";")
    for param in parts:
        param = param.strip()
        if param.lower().startswith("rate="):
            rate = int(param.split("=", 1)[1])
        elif param.startswith("audio/L"):
            bits_per_sample = int(param.split("L", 1)[1])
    return {"bits_per_sample": bits_per_sample, "rate": rate}

def gerar_podcast():
    # Carrega os episódios
    with open('guias_podcast.json', 'r', encoding='utf-8') as f:
        episodios = json.load(f)
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    for ep in episodios:
        # Usamos o ID do JSON para o nome do ficheiro
        file_path = os.path.join(OUTPUT_DIR, f"{ep['id']}.wav")
        
        if os.path.exists(file_path):
            print(f"⏩ Pulando {ep['id']} (já existe em {file_path})")
            continue
            
        print(f"🚀 Gerando Podcast: {ep['id']}...")
        
        try:
            contents = [types.Content(role="user", parts=[types.Part.from_text(text=f"Read the following transcript:\n\n{ep['transcript']}")])]
            
            config = types.GenerateContentConfig(
                response_modalities=["audio"],
                speech_config=types.SpeechConfig(
                    multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
                        speaker_voice_configs=[
                            types.SpeakerVoiceConfig(speaker="Speaker 1", voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Aoede"))),
                            types.SpeakerVoiceConfig(speaker="Speaker 2", voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Puck"))),
                        ]
                    ),
                ),
            )
            
            # Gerar e juntar chunks
            full_audio_data = b""
            for chunk in client.models.generate_content_stream(model="gemini-3.1-flash-tts-preview", contents=contents, config=config):
                if chunk.parts and chunk.parts[0].inline_data:
                    full_audio_data += chunk.parts[0].inline_data.data
            
            if full_audio_data:
                final_audio = convert_to_wav(full_audio_data, "audio/L16;rate=24000")
                save_binary_file(file_path, final_audio)
            
            print(f"⏳ Esperando {SLEEP_TIME} segundos...")
            time.sleep(SLEEP_TIME) 
            
        except Exception as e:
            print(f"❌ Erro no episódio {ep['id']}: {e}")
            time.sleep(30)

if __name__ == "__main__":
    gerar_podcast()
