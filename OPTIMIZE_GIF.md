# Optimización de GIF a Video

El archivo `hunt-tickets-app.gif` pesa 15MB y necesita ser optimizado.

## Opción 1: Convertir a MP4 (Recomendado)

Usa ffmpeg para convertir el GIF a MP4:

```bash
# Instalar ffmpeg si no lo tienes
brew install ffmpeg

# Convertir GIF a MP4 optimizado
cd public/images
ffmpeg -i hunt-tickets-app.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -movflags +faststart hunt-tickets-app.mp4

# Crear versión WebM también (mejor compresión)
ffmpeg -i hunt-tickets-app.gif -c:v libvpx-vp9 -b:v 0 -crf 41 hunt-tickets-app.webm
```

Reducción esperada: 15MB → ~1-2MB

## Opción 2: Optimizar GIF

Si prefieres mantener GIF:

```bash
# Usando gifsicle
brew install gifsicle
gifsicle -O3 --lossy=80 -o hunt-tickets-app-optimized.gif hunt-tickets-app.gif
```

## Después de convertir

El código ya está preparado para usar video. Solo necesitas ejecutar los comandos arriba.
