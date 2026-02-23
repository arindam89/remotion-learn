import { RemotionExample } from "./index";

// ============ ANIMATION CODE ============
// Edit this code to create your custom animation
export const myCustomAnimationCode = `import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
  spring,
} from "remotion";

export const MyAnimation = () => {
  // === CONFIGURATION ===
  // Edit these constants to customize your animation

  const COLOR_BG = "#1a1a2e";
  const COLOR_PRIMARY = "#4f46e5";
  const COLOR_TEXT = "#ffffff";

  const FONT_SIZE = 80;
  const FONT_WEIGHT = 700;

  // === ANIMATION LOGIC ===
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Example: Fade in animation
  const opacity = spring({
    fps,
    frame,
    config: { damping: 15, stiffness: 100 },
    durationInFrames: 30,
  });

  // Example: Scale animation
  const scale = spring({
    fps,
    frame,
    config: { damping: 10, stiffness: 80 },
    durationInFrames: 40,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR_BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity,
          transform: \`scale(\${scale})\`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            color: COLOR_TEXT,
            margin: 0,
          }}
        >
          Hello Remotion!
        </h1>
        <p
          style={{
            fontSize: FONT_SIZE / 2,
            color: COLOR_PRIMARY,
            marginTop: 20,
          }}
        >
          Edit this code to create your animation
        </p>
      </div>
    </AbsoluteFill>
  );
};`;

// ============ METADATA ============
// Edit these values to change how your animation appears in the gallery
export const myCustomAnimationExample: RemotionExample = {
  id: "my-custom-animation", // Unique ID (must match filename)
  name: "My Custom Animation", // Display name in gallery
  description: "A template for creating your own animations", // Short description
  category: "Other", // Text | Charts | Animation | 3D | Other
  durationInFrames: 90, // Total animation length
  fps: 30, // Frames per second
  code: myCustomAnimationCode,
};
