import os
import re
import struct
import time
from google import genai
from google.genai import types

# Configuração da API
# Certifica-te de que definiste a variável no terminal: $env:GOOGLE_API_KEY="A_TUA_CHAVE"
client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

def create_wav_header(data_size):
    # Cabeçalho padrão para áudio PCM 24kHz, 1 canal, 16 bits
    sample_rate, num_channels, bits_per_sample = 24000, 1, 16
    byte_rate = sample_rate * num_channels * bits_per_sample // 8
    block_align = num_channels * bits_per_sample // 8
    chunk_size = 36 + data_size
    return struct.pack('<4sI4s4sIHHIIHH4sI', b'RIFF', chunk_size, b'WAVE', b'fmt ', 16, 1, num_channels, 
                       sample_rate, byte_rate, block_align, bits_per_sample, b'data', data_size)

def extrair_artigos_jovens():
    # Lê o ficheiro original
    with open('src/data/content.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Isola a secção de jovens
    jovens_match = re.search(r'// --- SECÇÃO JOVENS ---(.*?)(?:// --- SECÇÃO ADULTOS ---)', content, re.DOTALL)
    if not jovens_match: return []
    
    artigos_texto = jovens_match.group(1)
    # Extrai cada artigo (id, title, content)
    artigos = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",.*?content:\s*`([^`]+)`', artigos_texto, re.DOTALL)
    
    return [{"id": a[0], "title": a[1], "content": a[2].strip()} for a in artigos]

def gerar():
    os.makedirs("public/audio", exist_ok=True)
    artigos = extrair_artigos_jovens()
    
    for artigo in artigos:
        file_path = f"public/audio/{artigo['id']}.wav"
        
        # Verifica se já existe para não repetir
        if os.path.exists(file_path):
            print(f"Skipping {artigo['id']} (já existe)")
            continue
            
        print(f"Gerando: {artigo['title']}...")
        try:
            # Envia o texto completo
            prompt = f"(fala em pt pt) [friendly] {artigo['title']}. [calm] {artigo['content']}"
            
            response = client.models.generate_content(
                model='gemini-3.1-flash-tts-preview',
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["audio"],
                    speech_config=types.SpeechConfig(
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Achernar")
                        )
                    )
                )
            )
            
            # Guardar o ficheiro
            for part in response.candidates[0].content.parts:
                if part.inline_data:
                    with open(file_path, "wb") as f:
                        f.write(create_wav_header(len(part.inline_data.data)) + part.inline_data.data)
                    print(f"✅ Guardado: {file_path}")
            
            # Espera 20 segundos para respeitar a quota gratuita
            print("Esperando 20 segundos para evitar limites...")
            time.sleep(20)
            
        except Exception as e:
            print(f"Erro no {artigo['id']}: {e}")
            # Se der erro, espera um pouco mais antes de tentar o próximo
            time.sleep(60)

if __name__ == "__main__":
    gerar()
