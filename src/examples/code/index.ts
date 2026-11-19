// ============================================================
// ANIMATION EXAMPLES REGISTRY
// ============================================================
// To add a new animation:
// 1. Copy my-custom-animation.ts and rename it
// 2. Edit the animation code and metadata
// 3. Import it below
// 4. Add it to the examples array
// ============================================================

import { animatedShapesExample } from "./animated-shapes";
import { aiAgents101Example } from "./ai-agents-101";
import { fallingSpheresExample } from "./falling-spheres";
import { goldPriceChartExample } from "./gold-price-chart";
import { histogramExample } from "./histogram";
import { lottieAnimationExample } from "./lottie-animation";
import { myCustomAnimationExample } from "./my-custom-animation";
import { progressBarExample } from "./progress-bar";
import { textRotationExample } from "./text-rotation";
import { typewriterHighlightExample } from "./typewriter-highlight";
import { wordCarouselExample } from "./word-carousel";

export interface RemotionExample {
  id: string;
  name: string;
  description: string;
  code: string;
  durationInFrames: number;
  fps: number;
  category: "Text" | "Charts" | "Animation" | "3D" | "Other";
}

// ============================================================
// ANIMATION GALLERY - Add your examples here
// ============================================================
export const examples: RemotionExample[] = [
  // Text Animations
  textRotationExample,
  typewriterHighlightExample,
  wordCarouselExample,

  // Charts
  histogramExample,
  goldPriceChartExample,

  // Animation
  progressBarExample,
  animatedShapesExample,
  lottieAnimationExample,
  fallingSpheresExample,

  // Your Custom Animations (add new ones here)
  myCustomAnimationExample,
  aiAgents101Example,
];

// Export individual examples for use in Root.tsx
export {
  aiAgents101Example,
  animatedShapesExample,
  fallingSpheresExample,
  goldPriceChartExample,
  histogramExample,
  lottieAnimationExample,
  myCustomAnimationExample,
  progressBarExample,
  textRotationExample,
  typewriterHighlightExample,
  wordCarouselExample,
};

export function getExampleById(id: string): RemotionExample | undefined {
  return examples.find((e) => e.id === id);
}

export function getExamplesByCategory(
  category: RemotionExample["category"],
): RemotionExample[] {
  return examples.filter((e) => e.category === category);
}
