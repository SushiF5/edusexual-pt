import os
import asyncio
import re
import edge_tts

# Vozes por audiência.
# - Crianças / Jovens: voz feminina (Raquel) — tom amigável e positivo.
# - Adultos (pais/educadores): voz masculina (Duarte) — registro mais institucional.
VOICE_JOVENS = "pt-PT-RaquelNeural"
VOICE_CRIANCAS = "pt-PT-RaquelNeural"
VOICE_ADULTOS = "pt-PT-DuarteNeural"

# Marcadores de secção em content-topics.ts → voz a utilizar.
SECTIONS = [
    {
        "start": "// --- SECÇÃO CRIANÇAS ---",
        "end": "// --- SECÇÃO JOVENS ---",
        "voice": VOICE_CRIANCAS,
        "label": "Crianças",
    },
    {
        "start": "// --- SECÇÃO JOVENS ---",
        "end": "// --- SECÇÃO ADULTOS ---",
        "voice": VOICE_JOVENS,
        "label": "Jovens",
    },
    {
        "start": "// --- SECÇÃO ADULTOS ---",
        "end": None,
        "voice": VOICE_ADULTOS,
        "label": "Adultos",
    },
]


def extrair_artigos_seccao(content_text, start_marker, end_marker):
    """Extrai os artigos de uma secção a partir do seu marcador.

    Isola cada bloco de artigo pelo seu `id:` e extrai título + conteúdo de
    forma independente, evitando falsos negativos do regex global (falhava
    em artigos que têm `category` entre `title` e `content`).
    """
    if end_marker:
        m = re.search(
            re.escape(start_marker) + r"(.*?)(?=" + re.escape(end_marker) + r")",
            content_text,
            re.DOTALL,
        )
    else:
        m = re.search(re.escape(start_marker) + r"(.*)", content_text, re.DOTALL)
    if not m:
        return []
    texto = m.group(1)

    id_positions = [
        (match.start(), match.group(1))
        for match in re.finditer(r'id:\s*"([^"]+)"', texto)
    ]
    artigos = []
    for idx, (pos, art_id) in enumerate(id_positions):
        chunk = texto[
            pos : id_positions[idx + 1][0] if idx + 1 < len(id_positions) else len(texto)
        ]
        title_m = re.search(r'title:\s*"([^"]+)"', chunk)
        content_m = re.search(r'content:\s*`([^`]+)`', chunk, re.DOTALL)
        if title_m and content_m:
            artigos.append(
                {"id": art_id, "title": title_m.group(1), "content": content_m.group(1).strip()}
            )
    return artigos


def extrair_todos_artigos():
    """Percorre todas as secções e devolve uma lista plana de artigos."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    content_path = os.path.join(script_dir, "edusexual-pt/src/data/content-topics.ts")
    with open(content_path, "r", encoding="utf-8") as f:
        content_text = f.read()

    todos = []
    for section in SECTIONS:
        artigos = extrair_artigos_seccao(content_text, section["start"], section["end"])
        for artigo in artigos:
            artigo["voice"] = section["voice"]
            artigo["label"] = section["label"]
        todos.extend(artigos)
    return todos


async def gerar():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "edusexual-pt/public/audio/MP3")
    os.makedirs(output_dir, exist_ok=True)
    artigos = extrair_todos_artigos()

    print(f"Total de artigos detetados: {len(artigos)}")

    por_label = {}
    for a in artigos:
        por_label.setdefault(a["label"], []).append(a)
    for label, lista in por_label.items():
        existentes = sum(1 for a in lista if os.path.exists(os.path.join(output_dir, f"{a['id']}.mp3")))
        print(f"  {label}: {len(lista)} artigos ({existentes} já gerados)")

    for artigo in artigos:
        file_path = os.path.join(output_dir, f"{artigo['id']}.mp3")
        if os.path.exists(file_path):
            continue

        print(f"Gerando [{artigo['label']}]: {artigo['title']}...")
        try:
            text = f"{artigo['title']}. {artigo['content']}"
            communicate = edge_tts.Communicate(text, artigo["voice"])
            await communicate.save(file_path)
            print(f"Guardado: {file_path}")
            await asyncio.sleep(1)
        except Exception as e:
            print(f"Erro no {artigo['id']}: {e}")


if __name__ == "__main__":
    asyncio.run(gerar())
