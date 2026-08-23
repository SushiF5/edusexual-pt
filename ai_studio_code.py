# To run this code you need to install the following dependencies:
# pip install google-genai

import mimetypes
import os
import re
import struct
from google import genai
from google.genai import types


def save_binary_file(file_name, data):
    f = open(file_name, "wb")
    f.write(data)
    f.close()
    print(f"File saved to to: {file_name}")


def generate():
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-3.1-flash-tts-preview"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""Read the following transcript based on the audio profile.

# Audio Profile
For Speaker 1: Uma voz feminina clara, calma e profissional. É a mentora que traz segurança e informação científica.
For Speaker 2: Uma voz masculina jovem, dinâmica e entusiasmada. Representa o jovem que tem curiosidade e faz as perguntas que todos querem saber.

## Scene:
Podcast \"Descomplicando\". Um episódio dedicado às mudanças físicas durante a puberdade masculina, num tom aberto e sem tabus.

## Sample Context:
Sofia (a mentora) e André (o amigo curioso) discutem as transformações rápidas do corpo masculino na adolescência, desmistificando medos comuns como as mudanças na voz e as ejaculações involuntárias.

## Transcript:
Speaker 1: [friendly] Olá a todos! Bem-vindos a mais um episódio do nosso podcast \"Descomplicando\". Eu sou a Sofia e comigo está o André. Hoje, vamos falar de um tema que pode causar muita confusão e até alguma vergonha: as mudanças no corpo masculino durante a puberdade.

Speaker 2: [curioso] Pois é, Sofia! Quando comecei a notar que estava a mudar, senti-me completamente perdido. É como se o corpo tivesse vontade própria. É normal sentir que perdemos o controlo nesta fase?

Speaker 1: [firme] [reassuring] Completamente normal, André. É o teu corpo a passar por uma renovação total, uma espécie de obra num edifício que nunca para. As hormonas estão a dar ordens novas. Não é defeito de fabrico, é a biologia a trabalhar para te tornar um adulto! É natural sentires-te estranho, irritado ou, de repente, super feliz. [pause] O teu cérebro está a adaptar-se a novos níveis de testosterona.

Speaker 2: [pensativo] E aquelas diferenças? Uns crescem cedo, outros tarde... Às vezes sinto que estou a ficar para trás. As redes sociais não ajudam nada, pois não?

Speaker 1: [amigável] [tranquilizador] [pause] Nem um pouco! Filtros e Photoshop criam padrões de perfeição que não existem. Isso é o que eu chamo de 'o relógio de cada um'. Não existe 'atrasado' ou 'adiantado'. O teu corpo sabe exatamente o tempo que precisa. Compararmo-nos com os outros é o maior erro, porque cada percurso é único e tem a sua própria beleza. Foca-te em cuidar de ti: alimentação, sono e respeito pelo teu próprio ritmo.

Speaker 2: [curioso] E aquelas mudanças que ninguém quer falar? A voz a falhar a meio de uma frase ou os pelos em zonas novas? É um bocado constrangedor...

Speaker 1: [firme] [pause] Eu sei que pode parecer embaraçoso, mas a tua laringe está a crescer e a adaptar-se. Faz parte do processo de a voz ficar mais grave e madura. É temporário. Todos os grandes oradores e cantores que admiras passaram exatamente por essas 'falhas'. Em relação aos pelos, é só um sinal claro de que o sistema reprodutor está a acordar.

Speaker 2: [curioso] E as poluções noturnas? Isso assusta muito mais gente do que parece...

Speaker 1: [firme] [tranquilizador] [pause] As poluções noturnas, ou ejaculações involuntárias durante o sono, são absolutamente normais. Fazem parte do amadurecimento do sistema reprodutor masculino. É apenas o corpo a libertar espermatozoides que já estão a ser produzidos. Não tens controlo sobre isso, não fizeste nada de errado, e é um sinal claro de que o teu sistema reprodutor está a funcionar como deve ser.

Speaker 2: [animado] Isso deixa-me muito mais descansado! É bom saber que não sou o único.

Speaker 1: [reassuring] [amigável] [pause] Tu nunca estás sozinho nisto. A puberdade é um processo individual, mas coletivo no sentido em que todos passam por ela. O meu conselho? Cuida da higiene, veste-te como te sentes bem, e tem paciência. O teu corpo está a fazer um trabalho incrível de adaptação. Se tiveres dúvidas ou te sentires desconfortável com alguma coisa, fala com um médico ou um adulto de confiança. Crescer é um desafio, mas também é uma aventura fantástica.

Speaker 2: [animado] Obrigado, Sofia! Depois destas dicas, já vejo estas mudanças como algo mais natural. Até à próxima, pessoal!"""),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=1,
        response_modalities=[
            "audio",
        ],
        speech_config=types.SpeechConfig(
            multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
                speaker_voice_configs=[
                    types.SpeakerVoiceConfig(
                        speaker="Speaker 1",
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                voice_name="Aoede"
                            )
                        ),
                    ),
                    types.SpeakerVoiceConfig(
                        speaker="Speaker 2",
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(
                                voice_name="Puck"
                            )
                        ),
                    ),
                ]
            ),
        ),
    )

    file_index = 0
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if (
            chunk.parts is None
        ):
            continue
        if chunk.parts[0].inline_data and chunk.parts[0].inline_data.data:
            file_name = f"ENTER_FILE_NAME_{file_index}"
            file_index += 1
            inline_data = chunk.parts[0].inline_data
            data_buffer = inline_data.data
            file_extension = mimetypes.guess_extension(inline_data.mime_type)
            if file_extension is None:
                file_extension = ".wav"
                data_buffer = convert_to_wav(inline_data.data, inline_data.mime_type)
            save_binary_file(f"{file_name}{file_extension}", data_buffer)
        else:
            if text := chunk.text:
                print(text)

def convert_to_wav(audio_data: bytes, mime_type: str) -> bytes:
    """Generates a WAV file header for the given audio data and parameters.

    Args:
        audio_data: The raw audio data as a bytes object.
        mime_type: Mime type of the audio data.

    Returns:
        A bytes object representing the WAV file header.
    """
    parameters = parse_audio_mime_type(mime_type)
    bits_per_sample = parameters["bits_per_sample"]
    sample_rate = parameters["rate"]
    num_channels = 1
    data_size = len(audio_data)
    bytes_per_sample = bits_per_sample // 8
    block_align = num_channels * bytes_per_sample
    byte_rate = sample_rate * block_align
    chunk_size = 36 + data_size  # 36 bytes for header fields before data chunk size

    # http://soundfile.sapp.org/doc/WaveFormat/

    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",          # ChunkID
        chunk_size,       # ChunkSize (total file size - 8 bytes)
        b"WAVE",          # Format
        b"fmt ",          # Subchunk1ID
        16,               # Subchunk1Size (16 for PCM)
        1,                # AudioFormat (1 for PCM)
        num_channels,     # NumChannels
        sample_rate,      # SampleRate
        byte_rate,        # ByteRate
        block_align,      # BlockAlign
        bits_per_sample,  # BitsPerSample
        b"data",          # Subchunk2ID
        data_size         # Subchunk2Size (size of audio data)
    )
    return header + audio_data

def parse_audio_mime_type(mime_type: str) -> dict[str, int | None]:
    """Parses bits per sample and rate from an audio MIME type string.

    Assumes bits per sample is encoded like "L16" and rate as "rate=xxxxx".

    Args:
        mime_type: The audio MIME type string (e.g., "audio/L16;rate=24000").

    Returns:
        A dictionary with "bits_per_sample" and "rate" keys. Values will be
        integers if found, otherwise None.
    """
    bits_per_sample = 16
    rate = 24000

    # Extract rate from parameters
    parts = mime_type.split(";")
    for param in parts: # Skip the main type part
        param = param.strip()
        if param.lower().startswith("rate="):
            try:
                rate_str = param.split("=", 1)[1]
                rate = int(rate_str)
            except (ValueError, IndexError):
                # Handle cases like "rate=" with no value or non-integer value
                pass # Keep rate as default
        elif param.startswith("audio/L"):
            try:
                bits_per_sample = int(param.split("L", 1)[1])
            except (ValueError, IndexError):
                pass # Keep bits_per_sample as default if conversion fails

    return {"bits_per_sample": bits_per_sample, "rate": rate}


if __name__ == "__main__":
    generate()


