import os
import asyncio
import re
import edge_tts

# Lista de vozes disponíveis em PT-PT: "pt-PT-DuarteNeural" ou "pt-PT-RaquelNeural"
VOICE = "pt-PT-RaquelNeural"

def extrair_artigos_jovens():
    with open('src/data/content.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    jovens_match = re.search(r'// --- SECÇÃO JOVENS ---(.*?)(?:// --- SECÇÃO ADULTOS ---)', content, re.DOTALL)
    if not jovens_match: return []
    artigos_texto = jovens_match.group(1)
    artigos = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",.*?content:\s*`([^`]+)`', artigos_texto, re.DOTALL)
    return [{"id": a[0], "title": a[1], "content": a[2].strip()} for a in artigos]

async def gerar():
    os.makedirs("public/audio", exist_ok=True)
    artigos = extrair_artigos_jovens()
    
    for artigo in artigos:
        file_path = f"public/audio/{artigo['id']}.mp3"
        if os.path.exists(file_path):
            continue
            
        print(f"Gerando: {artigo['title']}...")
        try:
            # Cria o texto completo
            text = f"{artigo['title']}. {artigo['content']}"
            
            # Gera o áudio
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(file_path)
            
            print(f"✅ Guardado: {file_path}")
            # Pausa curta para não sobrecarregar o disco
            await asyncio.sleep(1)
            
        except Exception as e:
            print(f"Erro no {artigo['id']}: {e}")

if __name__ == "__main__":
    asyncio.run(gerar())