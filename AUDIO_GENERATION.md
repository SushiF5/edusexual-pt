# Audio Generation with Gemini 3.1 Flash TTS

## Overview

The project includes a modern audio generation script using Google's Gemini 3.1 Flash TTS API (`gerar-audio-gemini.py`). This provides higher quality, more natural-sounding Portuguese voices compared to the legacy edge-tts approach.

## Quick Start

### 1. Get a Gemini API Key
- Visit [Google AI Studio](https://aistudio.google.com/)
- Create a new project or select existing
- Generate an API key

### 2. Set Environment Variable
```bash
export GEMINI_API_KEY="your-api-key-here"
```

### 3. Generate Audio
```bash
# Generate all audio for all audiences
python gerar-audio-gemini.py

# Generate only for specific audience
python gerar-audio-gemini.py --audiences jovens,criancas

# Use custom API key (alternative to env var)
python gerar-audio-gemini.py --gemini-api-key "your-key"
```

## Features

- **Multiple professional Portuguese voices** (Fenrir, Umbriel, Despina, Leda, Charon)
- **Audience-specific voice selection**:
  - **Jovens**: Fenrir (calm/engaging), Umbriel (conversational), Charon (emotional)
  - **Crianças**: Leda (friendly), Fenrir (instructional)
  - **Adultos**: Despina (professional), Fenrir (clear/frank)
- **Emotion markers** automatically inserted for expressive delivery
- **Batch processing** with progress tracking
- **MP3 output** directly to `public/audio/MP3/`

## Current Audio Status

✅ **44 MP3 files already exist** in `public/audio/MP3/` covering all topics from `content.ts`

✅ **11 youth topics** have `audioUrl` configured in content.ts

### Topic-to-Audio Mapping
| Topic ID | Audio File |
|----------|------------|
| orientacao-jovens | orientacao-jovens.mp3 |
| gravidez-jovens | gravidez-jovens.mp3 |
| corpo-imagem-jovens | corpo-imagem-jovens.mp3 |
| saude-higiene-jovens | saude-higiene-jovens.mp3 |
| sexualidade-prazer | sexualidade-prazer.mp3 |
| recursos-portugal | recursos-portugal.mp3 |
| corpo-resposta-sexual | corpo-resposta-sexual.mp3 |
| espetro-sexualidade | espetro-sexualidade.mp3 |
| amor-vs-atracao | amor-vs-atracao.mp3 |
| pornografia-vs-realidade | pornografia-vs-realidade.mp3 |
| comunicacao-relacoes | comunicacao-relacoes.mp3 |

## Voice Quality Comparison

| Feature | edge-tts (legacy) | Gemini 3.1 Flash TTS |
|---------|-------------------|---------------------|
| Naturalness | Good | Excellent |
| Portuguese accents | Limited | Native pt-PT |
| Emotional expression | Basic | Rich (tags) |
| Multi-speaker | No | Yes |
| Latency | Low | Very low |

## Integration

The generated MP3 files are automatically served via Next.js static file serving at `/audio/MP3/{id}.mp3` and referenced in `content.ts` via the `audioUrl` field.

The `AudioPlayer` component detects MIME type from file extension and handles playback with proper controls.
