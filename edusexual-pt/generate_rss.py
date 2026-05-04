import json
import os
from datetime import datetime

# URL base do teu site (altera isto quando souberes o domínio final)
BASE_URL = "https://edusexual-pt.vercel.app"

def generate_rss():
    with open('guias_podcast.json', 'r', encoding='utf-8') as f:
        episodios = json.load(f)
    
    rss_items = ""
    for ep in episodios:
        # Extrair título (assumindo a primeira linha do transcript ou o ID)
        title = ep.get('id', 'Episódio').replace('_', ' ').capitalize()
        file_url = f"{BASE_URL}/audio/podcast/{ep['id']}.wav"
        
        rss_items += f"""
    <item>
      <title><![CDATA[{title}]]></title>
      <enclosure url="{file_url}" length="0" type="audio/wav" />
      <pubDate>{datetime.now().strftime('%a, %d %b %Y %H:%M:%S GMT')}</pubDate>
      <itunes:summary><![CDATA[{ep['transcript'][:100]}...]]></itunes:summary>
    </item>"""

    rss_feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Descomplicando - Educação Sexual</title>
    <link>{BASE_URL}</link>
    <description>Um espaço seguro para falar de tudo.</description>
    <language>pt-pt</language>
    {rss_items}
  </channel>
</rss>"""

    with open('public/podcast.xml', 'w', encoding='utf-8') as f:
        f.write(rss_feed)
    print("✅ Ficheiro RSS gerado: public/podcast.xml")

if __name__ == "__main__":
    generate_rss()
