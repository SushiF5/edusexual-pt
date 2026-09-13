#!/usr/bin/env python3
"""Gera os MP3 em falta (via edge-tts) para os audioUrl referenciados
nos content-topics-{criancas,jovens,adultos}.ts.

Uso:
    python3 scripts/generate-audio.py                 # tudo o que faltar
    python3 scripts/generate-audio.py --limit 3       # só os 3 primeiros em falta
    python3 scripts/generate-audio.py --audience jovens  # só uma audiência

Requires: pip install edge-tts
"""

import argparse
import asyncio
import os
import re
import sys

import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT, "src", "data")
OUTPUT_DIR = os.path.join(ROOT, "public", "audio", "MP3")

VOICES = {
    "criancas": "pt-PT-RaquelNeural",  # voz feminina, tom amigável
    "jovens": "pt-PT-RaquelNeural",
    "adultos": "pt-PT-DuarteNeural",   # voz masculina, registo institucional
}

FILES = {
    "criancas": "content-topics-criancas.ts",
    "jovens": "content-topics-jovens.ts",
    "adultos": "content-topics-adultos.ts",
}

_AUDIO_RE = re.compile(r'audioUrl:\s*"([^"]+\.mp3)"')


def chunks_from_file(path):
    """Devolve pedaços de objeto delimitados por `id:` para associar cada
    audioUrl-holding chunk ao seu título e conteúdo/descrição."""
    with open(path, encoding="utf-8") as f:
        text = f.read()
    all_ids = [(m.start(), m.group(1)) for m in re.finditer(r'\bid:\s*"([^"]+)"', text)]
    chunks = []
    for i, (pos, _id) in enumerate(all_ids):
        end = all_ids[i + 1][0] if i + 1 < len(all_ids) else len(text)
        chunks.append((_id, text[pos:end]))
    return chunks


def build_items(audience):
    path = os.path.join(DATA_DIR, FILES[audience])
    items = []
    for _id, chunk in chunks_from_file(path):
        audio = _AUDIO_RE.search(chunk)
        if not audio:
            continue
        title = re.search(r'title:\s*"([^"]+)"', chunk)
        content = re.search(r'content:\s*`([^`]+)`', chunk, re.DOTALL)
        description = re.search(r'description:\s*"([^"]+)"', chunk)
        if not title:
            continue
        story = title.group(1)
        if content:
            story += ". " + content.group(1).strip()
        elif description:
            story += ". " + description.group(1).strip()
        items.append({"id": _id, "file": os.path.basename(audio.group(1)), "title": title.group(1), "story": story})
    return items


async def gerar(audiences, limit):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    total = to_generate = errored = 0
    for audience in audiences:
        items = build_items(audience)
        voice = VOICES[audience]
        missing = [i for i in items if not os.path.exists(os.path.join(OUTPUT_DIR, i["file"]))]
        print(f"[{audience}] {len(missing)}/{len(items)} MP3 em falta")
        total += len(items)
        to_generate += len(missing)
        for item in missing[:limit] if limit else missing:
            dest = os.path.join(OUTPUT_DIR, item["file"])
            print(f"  gerando: {item['title']} -> {item['file']}")
            try:
                communicate = edge_tts.Communicate(item["story"], voice)
                await communicate.save(dest)
                await asyncio.sleep(1)
            except Exception as e:
                errored += 1
                print(f"  ERRO {item['id']}: {e}")
    print(f"\nTotal: {total} audioUrl detetados, {to_generate} gerados agora, {errored} erros")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--audience", choices=list(FILES), default=None)
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()
    audiences = [args.audience] if args.audience else list(FILES)
    asyncio.run(gerar(audiences, args.limit or None))


if __name__ == "__main__":
    sys.exit(main())