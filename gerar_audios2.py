import os
import asyncio
import re
import edge_tts

VOICE = "pt-PT-RaquelNeural"

def extrair_artigos_jovens():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    content_path = os.path.join(script_dir, 'edusexual-pt/src/data/content-topics.ts')
    with open(content_path, 'r', encoding='utf-8') as f:
        content = f.read()
    jovens_match = re.search(r'// --- SECÇÃO JOVENS ---(.*?)(?:// --- SECÇÃO ADULTOS ---)', content, re.DOTALL)
    if not jovens_match: return []
    artigos_texto = jovens_match.group(1)

    # Isola cada bloco de artigo pelo seu `id:` e extrai título + conteúdo
    # de forma independente, evitando falsos negativos do regex global.
    id_positions = [(m.start(), m.group(1)) for m in re.finditer(r'id:\s*"([^"]+)"', artigos_texto)]
    artigos = []
    for idx, (pos, art_id) in enumerate(id_positions):
        chunk = artigos_texto[pos: id_positions[idx + 1][0] if idx + 1 < len(id_positions) else len(artigos_texto)]
        title_m = re.search(r'title:\s*"([^"]+)"', chunk)
        content_m = re.search(r'content:\s*`([^`]+)`', chunk, re.DOTALL)
        if title_m and content_m:
            artigos.append({"id": art_id, "title": title_m.group(1), "content": content_m.group(1).strip()})
    return artigos

async def gerar():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, 'edusexual-pt/public/audio/MP3')
    os.makedirs(output_dir, exist_ok=True)
    artigos = extrair_artigos_jovens()
    
    for artigo in artigos:
        file_path = os.path.join(output_dir, f"{artigo['id']}.mp3")
        if os.path.exists(file_path):
            continue
            
        print(f"Gerando: {artigo['title']}...")
        try:
            text = f"{artigo['title']}. {artigo['content']}"
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(file_path)
            print(f"Guardado: {file_path}")
            await asyncio.sleep(1)
        except Exception as e:
            print(f"Erro no {artigo['id']}: {e}")

if __name__ == "__main__":
    asyncio.run(gerar())