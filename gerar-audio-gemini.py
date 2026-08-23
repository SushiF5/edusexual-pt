#!/usr/bin/env python3
"""
Gera áudios educativos usando a API Gemini 3.1 Flash TTS

Este script lê os tópicos de conteúdo do EduSexual PT e gera
transmissões de áudio profissionais usando a API Gemini TTS.

Funcionalidades:
- Usa múltiplas vozes profissionais pt-PT
- Adiciona marcadores de emoção para expressividade
- Gera arquivos MP3 prontos para embed
- Processamento em lotes para grandes volumes
- Resumo para monitorar o progresso
"""

import asyncio
import json
import re
import os
import argparse
from pathlib import Path
from google import genai
from google.genai import types

# --- CONFIGURAÇÃO PRINCIPAL ---
VOICE_MAP = {
    "jovens": {
        "principal": "Fenrir",  # Narrador calmo e envolvente
        "ensaio": "Umbriel",   # Entrevista/conversa
        "dramatico": "Charon",  # Emoção intensa
    },
    "criancas": {
        "principal": "Leda",  # Voz amigável
        "ensino": "Fenrir",  # Explicativo
    },
    "adultos": {
        "principal": "Despina",  # Profissional
        "claro": "Fenrir",       # Calmo e franco
    }
}

# Tendências emocionais por audiência
EMOTION_MAPS = {
    "jovens": {
        "introductory": "[enthusiasm]",
        "educational": "[interest]",
        "sensitive": "[compassion]",
        "conclusion": "[confidence]",
    },
    "criancas": {
        "introductory": "[joy]",
        "educational": "[curiosity]",
        "friendly": "[affection]",
        "conclusion": "[understanding]",
    },
    "adultos": {
        "introductory": "[professional]",
        "educational": "[focus]",
        "clarifying": "[understanding]",
        "conclusion": "[confidence]",
    }
}

def extrair_artigos_por_audiencia(content, audiencia):
    """Extrai artigos para uma audiência específica do content.ts"""
    # Define os marcadores de seção corretos no content.ts
    section_markers = {
        "jovens": '// --- SECÇÃO JOVENS ---',
        "criancas": '// --- SECÇÃO CRIANÇAS ---',
        "adultos": '// --- SECÇÃO ADULTOS ---'
    }

    marker = section_markers.get(audiencia)
    if not marker:
        raise ValueError(f"Audiência '{audiencia}' não reconhecida")

    # Encontra a seção usando regex com contornos precisos
    section_match = re.search(
        rf'{re.escape(marker)}(.*?)(?:// --- (?:SECÇÃO (?:JOVENS|CRIANÇAS|ADULTOS) ---|\Z)',
        content,
        re.DOTALL
    )

    if not section_match:
        raise ValueError(f"Seção de audiência '{audiencia}' não encontrada")

    section_content = section_match.group(1)

    # Extrai artigos do formato TypeScript
    artigos = re.findall(
        r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*content:\s*`([^`]+)`',
        section_content,
        re.DOTALL
    )

    return [
        {
            "id": artigo[0],
            "title": artigo[1],
            "category": artigo[2],
            "content": artigo[3].strip()
        }
        for artigo in artigos
    ]

async def gerar_audio_com_gemini(
    client,
    text,
    voice_name,
    audience,
    emotions=None
):
    """Gera áudio usando a API Gemini 3.1 Flash TTS"""
    try:
        # Ensina o modelo sobre o contexto
        initial_prompt = f"""
Você é um apresentador de educação sexual profissional para o público '{audience}' do EduSexual PT.

Diretrizes:
- Fala clara e envolvente, como um educador experto
- Pausa breve entre as ideas para digestão
- Ajusta o tom à sensibilidade do tópico
- Mantém uma confiança acolhedora
- Evita jargões desnecessários

Por favor, apresente o seguinte conteúdo:

"""

        # Adiciona marcadores de emoção
        emotion_text = text
        if emotions and emotions in EMOTION_MAPS.get(audience, {}):
            emotional_marker = EMOTION_MAPS[audience][emotions]
            # Insere marcador no meio do texto
            sentences = re.split(r'([.!?]\s*)', text)
            if len(sentences) > 2:
                mid_idx = len(sentences) // 2
                sentences.insert(mid_idx, f" {emotional_marker} ")
                emotion_text = ''.join(sentences)

        full_prompt = initial_prompt + emotion_text

        # Chama a API Gemini
        response = await asyncio.to_thread(
            client.models.generate_content,
            model="gemini-3.1-flash-tts-preview",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=voice_name)
                    )
                ),
                temperature=0.6
            )
        )

        if response.candidates and response.candidates[0].content.parts:
            audio_bytes = response.candidates[0].content.parts[0].inline_data.data
            return audio_bytes
        return None

    except Exception as e:
        print(f"Erro ao gerar áudio para '{text[:50]}...': {str(e)[:100]}")
        return None

async def processar_audiencia(
    client,
    content,
    audiencia,
    output_dir
):
    """Processa todos os artigos para uma audiência"""
    print(f"\n🎙️  Processando audiência '{audiencia}'...")

    try:
        artigos = extrair_artigos_por_audiencia(content, audiencia)
        print(f"   → Encontrados {len(artigos)} artigos")

        voice_config = VOICE_MAP.get(audiencia, VOICE_MAP["jovens"])

        for i, artigo in enumerate(artigos, 1):
            print(f"   {i}/{len(artigos)}: {artigo['title']}")

            # Escolhe voz com base no padrão do artigo
            voice = escolher_voz(artigo, voice_config)

            # Gera áudio
            audio_data = await gerar_audio_com_gemini(
                client,
                artigo["content"],
                voice,
                audiencia
            )

            if audio_data:
                file_path = Path(output_dir) / f"{artigo['id']}.mp3"

                with open(file_path, "wb") as f:
                    f.write(audio_data)

                print(f"      ✅ Gerado: {file_path.name}")
            else:
                print(f"      ⚠️ Falhou: {artigo['id']}")

    except Exception as e:
        print(f"   ❌ Erro na audiência '{audiencia}': {str(e)}")

async def main():
    parser = argparse.ArgumentParser(
        description="Gera áudios educativos com Gemini 3.1 Flash TTS"
    )
    parser.add_argument(
        "--content-file",
        default="edusexual-pt/src/data/content.ts",
        help="Caminho para o arquivo content.ts"
    )
    parser.add_argument(
        "--output-dir",
        default="edusexual-pt/public/audio/MP3",
        help="Diretório para salvar os arquivos MP3"
    )
    parser.add_argument(
        "--audiences",
        default="jovens,criancas,adultos",
        help="Lista de audiências separadas por vírgula (ex: jovens,criancas,adultos)"
    )
    parser.add_argument(
        "--gemini-api-key",
        help="Chave da API Gemini (ou defina GEMINI_API_KEY env var)"
    )

    args = parser.parse_args()

    # Configura o cliente Gemini
    api_key = args.gemini_api_key or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("❌ GEMINI_API_KEY não definido")
        print("   Exporte: export GEMINI_API_KEY='sua-chave-aqui'")
        return

    client = genai.Client(api_key=api_key)

    # Carrega o content
    with open(args.content_file, "r", encoding="utf-8") as f:
        content = f.read()

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    audiences = [a.strip() for a in args.audiences.split(",")]

    print("🚀 Iniciando geração de áudios com Gemini 3.1 Flash TTS")
    print(f"   Conteúdo: {args.content_file}")
    print(f"   Saída: {output_dir}")
    print(f"   Audiências: {', '.join(audiences)}")
    print("=" * 60)

    for audiencia in audiences:
        await processar_audiencia(
            client,
            content,
            audiencia,
            output_dir
        )

    print("\n🎉 Geração concluída!")

def escolher_voz(artigo, voice_config):
    """Escolhe voz baseada no padrão do artigo"""
    texto = (artigo["title"] + " " + artigo["content"]).lower()

    # Detector de padrões
    if any(p in texto for p in ["mitos", "convencido", "erro", "incorreto"]):
        return voice_config.get("dramatico", list(voice_config.values())[0])
    elif any(p in texto for p in ["como", "passo a passo", "tutorial"]):
        return voice_config.get("ensino", list(voice_config.values())[0])
    elif any(p in texto for p in ["história", "contar", "exemplo"]):
        return voice_config.get("principal", list(voice_config.values())[0])
    elif any(p in texto for p in ["conclusão", "resumo", "finalmente"]):
        return voice_config.get("clarifying", list(voice_config.values())[0])
    else:
        return list(voice_config.values())[0]

if __name__ == "__main__":
    asyncio.run(main())
