import os
import re
import asyncio
import edge_tts

VOICE = "pt-PT-RaquelNeural"

def extrair_artigos_de_ficheiro(filepath):
    """Extrai artigos com audioUrl de um ficheiro TypeScript."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    artigos = []
    
    # Encontra todos os artigos no formato:
    # {id: "...", title: "...", category: "...", audioUrl: "...", content: `...`}
    # Usa regex para capturar id, title, audioUrl, content
    pattern = r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*audioUrl:\s*"([^"]+)",\s*content:\s*`([^`]+)`'
    
    matches = re.findall(pattern, content, re.DOTALL)
    
    for match in matches:
        artigo = {
            "id": match[0],
            "title": match[1],
            "category": match[2],
            "audioUrl": match[3],
            "content": match[4].strip()
        }
        artigos.append(artigo)
    
    return artigos

async def gerar():
    os.makedirs("public/audio/MP3", exist_ok=True)
    
    # Ficheiros a processar
    topic_files = [
        "src/data/content-topics-jovens.ts",
        "src/data/content-topics-criancas.ts",
        "src/data/content-topics-adultos.ts",
    ]
    
    todos_artigos = []
    for tf in topic_files:
        if os.path.exists(tf):
            artigos = extrair_artigos_de_ficheiro(tf)
            print(f"Encontrados {len(artigos)} artigos em {tf}")
            todos_artigos.extend(artigos)
        else:
            print(f"AVISO: {tf} não encontrado")
    
    print(f"Total de artigos para processar: {len(todos_artigos)}")
    
    for artigo in todos_artigos:
        # Extrai o nome do ficheiro do audioUrl (ex: /audio/MP3/puberdade.mp3 -> puberdade.mp3)
        filename = os.path.basename(artigo['audioUrl'])
        file_path = f"public/audio/MP3/{filename}"
        
        if os.path.exists(file_path):
            print(f"⏭️  Pulando {artigo['title']} ({filename}) - já existe")
            continue
            
        print(f"🎙️  Gerando: {artigo['title']} -> {filename}")
        try:
            text = f"{artigo['title']}. {artigo['content']}"
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(file_path)
            print(f"✅ Guardado: {file_path}")
            await asyncio.sleep(1)
        except Exception as e:
            print(f"❌ Erro no {artigo['id']}: {e}")

if __name__ == "__main__":
    asyncio.run(gerar())