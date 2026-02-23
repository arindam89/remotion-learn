# Remotion Animation Gallery

A simple gallery of Remotion animations without any AI/OpenAI dependencies. Edit animations in code and preview them in your browser.

## Getting Started

### Start the development server:
```bash
bun run dev
```

Visit http://localhost:3000 to see the animation gallery.

## How to Add Your Own Animation

1. **Copy the template:**
   Copy `src/examples/code/my-custom-animation.ts` and rename it (e.g., `my-awesome-animation.ts`)

2. **Edit the animation code:**
   ```typescript
   // Change the configuration constants
   const COLOR_BG = "#1a1a2e";
   const COLOR_PRIMARY = "#4f46e5";
   const FONT_SIZE = 80;

   // Edit the return JSX to create your animation
   return (
     <AbsoluteFill>
       {/* Your animation here */}
     </AbsoluteFill>
   );
   ```

3. **Edit the metadata:**
   ```typescript
   export const myAwesomeAnimationExample: RemotionExample = {
     id: "my-awesome-animation", // Unique ID
     name: "My Awesome Animation", // Display name
     description: "A short description", // What it does
     category: "Other", // Text | Charts | Animation | 3D | Other
     durationInFrames: 90, // Animation length
     fps: 30, // Frames per second
     code: myAwesomeAnimationCode,
   };
   ```

4. **Register your animation:**
   In `src/examples/code/index.ts`:
   ```typescript
   // Add import at the top
   import { myAwesomeAnimationExample } from "./my-awesome-animation";

   // Add to the examples array
   export const examples: RemotionExample[] = [
     // ... other examples
     myAwesomeAnimationExample,
   ];

   // Export it
   export { myAwesomeAnimationExample };
   ```

5. **Add to Root.tsx (optional):**
   If you want to render it directly from Remotion Studio, add it to `src/remotion/Root.tsx`.

## Available Examples

| Category | Examples |
|----------|----------|
| **Text** | Typewriter, Text Rotation, Word Carousel |
| **Charts** | Histogram, Gold Price Chart |
| **Animation** | Progress Bar, Animated Shapes, Lottie, Falling Spheres |
| **Custom** | My Custom Animation (template) |

## Editing Animations

1. Go to http://localhost:3000
2. Click on any animation in the gallery
3. Edit the code in the left panel
4. See changes instantly in the preview

## Rendering Video

**Using the web interface:**
- Use the player controls in the editor

**Using Remotion CLI:**
```bash
# List all compositions
bunx remotionb compositions

# Render a specific composition
bunx remotionb render my-custom-animation out/video.mp4

# Render with custom settings
bunx remotionb render my-custom-animation out/video.mp4 --props='{"code":"..."}'
```

**Open Remotion Studio:**
```bash
bun run remotion
```

## File Structure

```
src/
├── app/
│   ├── page.tsx                    # Gallery landing page
│   └── code-examples/page.tsx      # Animation editor
├── components/
│   ├── AnimationGallery.tsx        # Gallery component
│   └── AnimationPlayer.tsx         # Video preview player
├── examples/
│   └── code/                       # Animation examples
│       ├── index.ts                # Registry (add your animations here)
│       ├── my-custom-animation.ts  # Template for new animations
│       └── *.ts                    # Other example animations
└── remotion/
    └── Root.tsx                    # Remotion compositions
```

## Remotion Basics

**Key Hooks:**
- `useCurrentFrame()` - Get current frame number
- `useVideoConfig()` - Get video config (fps, width, height)

**Key Components:**
- `<AbsoluteFill>` - Full-screen container
- `<Sequence>` - Time-based sequencing
- `<Series>` - Sequential animations

**Animation Functions:**
- `interpolate()` - Linear interpolation
- `spring()` - Spring physics animation

## Learn More

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Best Practices](https://www.remotion.dev/docs/best-practices)
