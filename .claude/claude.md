# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation Convention

**Always generate documentation in the `ai_docs/` folder.**

When creating any documentation files (guides, tutorials, references, etc.), place them in the `ai_docs/` directory at the project root. This keeps all AI-generated documentation organized and separate from source code.

### Example
- Instead of: `/README.md`, `/GUIDE.md` at root
- Use: `/ai_docs/my-guide.md`, `/ai_docs/component-reference.md`

---

## Project Overview

A simple animation gallery and editor built with Remotion and Next.js. **No AI/OpenAI dependencies** - users create and edit animations directly in code with live preview in the browser.

### Tech Stack
- **Remotion** - Programmatic video creation framework
- **Next.js** - React web framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Monaco Editor** - In-browser code editing

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Gallery landing page
│   └── code-examples/page.tsx      # Animation editor
├── components/
│   ├── AnimationGallery.tsx        # Gallery component
│   ├── AnimationPlayer.tsx         # Video preview player
│   └── CodeEditor/                 # Monaco code editor wrapper
├── examples/
│   └── code/                       # Animation examples
│       ├── index.ts                # Registry (add animations here)
│       ├── my-custom-animation.ts  # Template for new animations
│       └── *.ts                    # Other example animations
├── hooks/
│   └── useAnimationState.ts        # Client-side compilation state
└── remotion/
    ├── Root.tsx                    # Remotion compositions
    ├── DynamicComp.tsx             # Dynamic composition wrapper
    └── compiler.ts                 # In-browser Babel compilation

ai_docs/                            # All AI-generated documentation
.claude/                             # Claude configuration
```

---

## Commands

```bash
bun run dev          # Start development server (localhost:3000)
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run remotion     # Open Remotion Studio
bun run render       # Render video via CLI
bun run deploy       # Deploy to Remotion Lambda
```

### Remotion CLI

This project uses `bun` as the package manager. Remotion CLI commands are accessed via:
- `bun run remotion` (configured as `remotionb studio` in package.json)
- `bunx remotion <command>` (for one-off commands like `render`, `upgrade`, `compositions`)

---

## Architecture

### Animation Compilation Flow

```
User Code String
    ↓
extractComponentBody() - Strip imports, extract function body
    ↓
Babel.transform() - Transpile TypeScript/JSX to JavaScript
    ↓
new Function() - Create component with injected Remotion APIs
    ↓
React Component - Render in Remotion Player/Preview
```

**Key Files:**
- `src/remotion/compiler.ts` - Dynamic code compilation pipeline using Babel standalone
- `src/remotion/DynamicComp.tsx` - Remotion composition wrapper for dynamic code
- `src/hooks/useAnimationState.ts` - Client-side compilation state management

### Code Compilation System

Animations are compiled **in-browser** using Babel standalone. The compiler:

1. Strips all import statements from user code
2. Extracts the component function body
3. Transpiles TypeScript/JSX with presets: `["react", "typescript"]`
4. Creates a sandboxed Function with Remotion APIs injected as parameters

**Available injected APIs (no imports needed):**
- **Remotion core:** `AbsoluteFill`, `interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`, `Sequence`, `Img`
- **Remotion shapes:** `Rect`, `Circle`, `Triangle`, `Star`, `Polygon`, `Ellipse`, `Heart`, `Pie`, `make*` functions
- **Transitions:** `TransitionSeries`, `linearTiming`, `springTiming`, `fade`, `slide`, `wipe`, `flip`, `clockWipe`
- **React hooks:** `useState`, `useEffect`, `useMemo`, `useRef`
- **3D:** `ThreeCanvas`, `THREE` (full three.js)
- **Lottie:** `Lottie` component

### Dual Composition System

The app uses two approaches for rendering animations:

1. **Dynamic Composition** (`DynamicComp`) - Used for the web editor (`/code-examples`)
   - Single composition that accepts code as a prop
   - Compiles code at runtime using the compiler
   - Supports live editing with instant preview

2. **Static Compositions** - Used in Remotion Studio
   - Individual `<Composition>` entries in `Root.tsx`
   - Each example gets its own composition ID (e.g., `histogram`, `text-rotation`)
   - Better for rendering finished videos via CLI

---

## Key Concepts

### Animation Examples

Each animation is a TypeScript file with:
- **Code string** - The actual Remotion component code
- **Metadata** - id, name, description, category, duration, fps

The code is compiled in-browser using Babel, so no build step is required when editing.

### Categories

- `Text` - Typography animations (typewriter, rotation, word carousel)
- `Charts` - Data visualizations (histogram, line charts)
- `Animation` - Motion graphics (shapes, progress bars, particles)
- `3D` - Three.js scenes
- `Other` - Everything else

### Registry System

**`src/examples/code/index.ts`** is the central registry for all animation examples.

Each example exports a `RemotionExample` object:
```typescript
{
  id: string;
  name: string;
  description: string;
  code: string;
  durationInFrames: number;
  fps: number;
  category: "Text" | "Charts" | "Animation" | "3D" | "Other";
}
```

---

## Adding a New Animation

1. **Copy the template:** `src/examples/code/my-custom-animation.ts`
2. **Rename and edit the animation code:**
   ```typescript
   // Change the configuration constants
   const COLOR_BG = "#1a1a2e";
   const COLOR_PRIMARY = "#4f46e5";
   const FONT_SIZE = 80;

   // Edit the return JSX to create your animation
   return (
     <AbsoluteFill style={{ backgroundColor: COLOR_BG }}>
       {/* Your animation here */}
     </AbsoluteFill>
   );
   ```
3. **Update the metadata:**
   ```typescript
   export const myAwesomeAnimationExample: RemotionExample = {
     id: "my-awesome-animation",        // Unique ID (kebab-case)
     name: "My Awesome Animation",      // Display name
     description: "A short description", // What it does
     category: "Other",                 // Text | Charts | Animation | 3D | Other
     durationInFrames: 90,              // Animation length in frames
     fps: 30,                           // Frames per second
     code: myAwesomeAnimationCode,      // The code string
   };
   ```
4. **Import and add to `src/examples/code/index.ts`:**
   ```typescript
   // Add import at the top
   import { myAwesomeAnimationExample } from "./my-awesome-animation";

   // Add to the examples array (organized by category)
   export const examples: RemotionExample[] = [
     // ... existing examples
     myAwesomeAnimationExample,
   ];

   // Export for use in Root.tsx
   export { myAwesomeAnimationExample };
   ```
5. **Optionally add to `src/remotion/Root.tsx`:** If you want to access it directly in Remotion Studio, add a new `<Composition>` entry.

**See `ai_docs/MY_ANIMATIONS.md` for detailed step-by-step instructions.**

### Code Example Template

```typescript
export const myAnimationExample: RemotionExample = {
  id: "my-animation",
  name: "My Animation",
  description: "Description here",
  category: "Animation",
  durationInFrames: 180,
  fps: 30,
  code: `
export const MyAnimation = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* animation code */}
    </AbsoluteFill>
  );
};
  `,
};
```

**Important:** The `code` string should NOT include imports - they are injected automatically by the compiler.

---

## State Management

The editor uses URL-based state for example selection:
- URL param `?example=histogram` determines which example is loaded
- `useAnimationState` hook manages compilation state (code, Component, error, isCompiling)
- Code changes trigger immediate re-compilation via `compileCode()` function

---

## Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `AnimationGallery` | `src/components/AnimationGallery.tsx` | Landing page gallery grid with category filtering |
| `AnimationPlayer` | `src/components/AnimationPlayer.tsx` | Remotion Player wrapper with playback controls |
| `CodeEditor` | `src/components/CodeEditor/` | Monaco editor instance with JSX/TSX support |
| `Header` | `src/components/Header.tsx` | Site branding and navigation |

---

## Important Notes

- **No API keys required** - This is a code-first animation editor
- All animations compile in-browser
- Code changes reflect instantly in preview
- Users can edit any example animation directly
- The editor uses `remotionb` alias for the Remotion CLI (configured in package.json)

---

## Remotion Basics

### Key Hooks
- `useCurrentFrame()` - Get current frame number (0-indexed)
- `useVideoConfig()` - Get video config (fps, width, height, durationInFrames)

### Key Components
- `<AbsoluteFill>` - Full-screen container (equivalent to `position: fixed; inset: 0`)
- `<Sequence>` - Time-based sequencing (show content for specific frame range)
- `<Series>` - Sequential animations (automatically stacks sequences)

### Animation Functions
- `interpolate(frame, [inputRange], [outputRange])` - Linear interpolation between values
- `spring({ frame, fps, config })` - Spring physics animation (natural, bouncy motion)

### Common Spring Configs
```typescript
// Gentle, no bounce
spring({ frame, fps, config: { damping: 100 } })

// Bouncy
spring({ frame, fps, config: { damping: 10, stiffness: 100 } })

// Quick
spring({ frame, fps, config: { stiffness: 200 } })
```

---

## Common Patterns

### Adding a Shape Animation

Use `@remotion/shapes` which are already injected in the compiler:

```typescript
code: `
export const MyShapeAnim = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e", justifyContent: "center", alignItems: "center" }}>
      <Circle
        length={1}
        fill="hotpink"
        radius={200 * scale}
      />
    </AbsoluteFill>
  );
};
  `,
};
```

### Adding a Transition

Use `@remotion/transitions` for scene changes:

```typescript
code: `
export const MyTransition = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <AbsoluteFill style={{ backgroundColor: "red" }} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        timing={springTiming({ frame: 0, fps: 30 })}
        {...fade()}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <AbsoluteFill style={{ backgroundColor: "blue" }} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
  `,
};
```

### Text Animation

```typescript
code: `
export const MyTextAnim = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill style={{
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <h1 style={{
        fontSize: 80,
        color: "white",
        opacity,
        transform: \`scale(\${spring({ frame, fps: 30, config: { damping: 10 } })})\`
      }}>
        Hello World
      </h1>
    </AbsoluteFill>
  );
};
  `,
};
```

---

## Available Examples

| Category | Examples |
|----------|----------|
| **Text** | Text Rotation, Typewriter Highlight, Word Carousel |
| **Charts** | Histogram, Gold Price Chart |
| **Animation** | Progress Bar, Animated Shapes, Lottie Animation, Falling Spheres |
| **Custom** | My Custom Animation (template) |

---

## Resources

- [Remotion Documentation](https://www.remotion.dev/docs/the-fundamentals)
- [Remotion Best Practices](https://www.remotion.dev/docs/best-practices)
- [Remotion Transitions](https://www.remotion.dev/docs/transitions)
- [@remotion/shapes](https://www.remotion.dev/docs/shapes)
