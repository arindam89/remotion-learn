# Exporting Videos

This guide shows you how to export your animations as video files.

## Method 1: CLI (Local Rendering) - Recommended

**Best for:** Free rendering, full control, no cloud dependencies

### List Available Compositions

```bash
bunx remotionb compositions
```

This shows all animations including your custom ones:
- `typewriter-highlight`
- `text-rotation`
- `histogram`
- `my-custom-animation`
- etc.

### Render a Video

```bash
# Basic render
bunx remotionb render my-custom-animation output/video.mp4

# Specify output format (mp4, webm, gif)
bunx remotionb render my-custom-animation output/video.webm

# Render with custom image format
bunx remotionb render my-custom-animation output/video.mp4 --image-format=jpeg

# Render with PNG frames (higher quality)
bunx remotionb render my-custom-animation output/video.mp4 --image-format=png
```

### Render with Custom Settings

```bash
# Override duration
bunx remotionb render my-custom-animation output/video.mp4 --frames=0-90

# Override FPS
bunx remotionb render my-custom-animation output/video.mp4 --fps=60

# Render specific frames
bunx remotionb render my-custom-animation output/video.mp4 --frames=0-30

# Scale down resolution (faster rendering)
bunx remotionb render my-custom-animation output/video.mp4 --scale=0.5

# Muted (no audio)
bunx remotionb render my-custom-animation output/video.mp4 --muted
```

### Render a JPEG Image Sequence

```bash
bunx remotionb render my-custom-animation output/frame_%04d.jpg --sequence
```

This creates individual frames: `frame_0001.jpg`, `frame_0002.jpg`, etc.

### Preview Before Rendering

```bash
# Open Remotion Studio for interactive preview
bun run remotion

# Or use the CLI preview
bunx remotionb preview
```

---

## Method 2: Web Interface - Cloud Rendering

**Best for:** Faster rendering on powerful cloud machines (requires setup)

1. Start the dev server:
   ```bash
   bun run dev
   ```

2. Open http://localhost:3000

3. Click on any animation in the gallery

4. Below the preview, select **"Cloud"** mode

5. Click **"Render & Download"** button

6. Wait for rendering to complete

7. Click **Download** when ready

**Note:** This requires Remotion Lambda setup with AWS credentials in `.env` file.

---

## Method 3: Programmatic Rendering

Create a script like `render.ts`:

```typescript
import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import { webpackOverride } from "./src/remotion/webpack-override.mjs";

async function render() {
  // Bundle the code
  const bundled = await bundle({
    entryPoint: "./src/remotion/index.ts",
    webpackOverride,
  });

  // Render the video
  await renderMedia({
    composition: {
      id: "my-custom-animation",
      defaultProps: {},
      durationInFrames: 90,
      fps: 30,
      height: 1080,
      width: 1920,
    },
    bundled,
    outputLocation: "output/video.mp4",
    inputProps: {},
    codec: "h264",
  });

  console.log("Video rendered!");
}

render();
```

Run with:
```bash
bun run render.ts
```

---

## Comparison

| Method | Pros | Cons |
|--------|------|------|
| **CLI (Local)** | Free, full control, no setup | Requires terminal usage |
| **Web (Cloud)** | Easy to use, fast cloud rendering | Requires AWS setup, costs money |
| **Programmatic** | Automatable, customizable | More complex setup |

---

## Troubleshooting

### "Composition not found"
Make sure you're using the correct ID from `bunx remotionb compositions`

### Slow rendering
- Use `--scale=0.5` for faster previews
- Lower FPS with `--fps=30`
- Reduce frame count with `--frames=0-60`

### Out of memory
- Render shorter segments
- Use JPEG instead of PNG
- Close other applications

---

## Examples

### Render a quick preview
```bash
bunx remotionb render my-custom-animation output/preview.mp4 --scale=0.5 --frames=0-30
```

### Render high quality final video
```bash
bunx remotionb render my-custom-animation output/final.mp4 --image-format=png
```

### Render for social media (vertical)
You'll need to modify the composition dimensions first in your code:
```typescript
// In your animation file
<AbsoluteFill style={{ width: 1080, height: 1920 }}>
```
Then render normally.

---

## Quick Reference

Find the composition ID in the web editor when you select an animation - it shows the CLI command automatically in **Local (CLI)** mode.

Available composition IDs from the registry:
- `text-rotation`
- `typewriter-highlight`
- `word-carousel`
- `histogram`
- `gold-price-chart`
- `progress-bar`
- `animated-shapes`
- `lottie-animation`
- `falling-spheres`
- `my-custom-animation`
