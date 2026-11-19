import React from "react";
import { AbsoluteFill } from "remotion";
import { compileCode } from "./compiler";

// Helper to create a component from code string
function createComponentFromCode(code: string): React.ComponentType {
  const result = compileCode(code);
  if (result.error || !result.Component) {
    return () => (
      <AbsoluteFill
        style={{
          backgroundColor: "#1a1a2e",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            color: "#ff6b6b",
            fontSize: 42,
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          Compilation Error
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 24,
            fontFamily: "monospace",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          {result.error || "Unknown error"}
        </div>
      </AbsoluteFill>
    );
  }
  return result.Component;
}

// Pre-compile all examples for CLI rendering
export const {
  animatedShapesExample: AnimatedShapes,
  aiAgents101Example: AiAgents101,
  fallingSpheresExample: FallingSpheres,
  goldPriceChartExample: GoldPriceChart,
  histogramExample: Histogram,
  lottieAnimationExample: LottieAnimation,
  myCustomAnimationExample: MyCustomAnimation,
  progressBarExample: ProgressBar,
  textRotationExample: TextRotation,
  typewriterHighlightExample: TypewriterHighlight,
  wordCarouselExample: WordCarousel,
} = (() => {
  const {
    animatedShapesExample,
    aiAgents101Example,
    fallingSpheresExample,
    goldPriceChartExample,
    histogramExample,
    lottieAnimationExample,
    myCustomAnimationExample,
    progressBarExample,
    textRotationExample,
    typewriterHighlightExample,
    wordCarouselExample,
  } = require("../examples/code");

  return {
    animatedShapesExample: createComponentFromCode(animatedShapesExample.code),
    aiAgents101Example: createComponentFromCode(aiAgents101Example.code),
    fallingSpheresExample: createComponentFromCode(fallingSpheresExample.code),
    goldPriceChartExample: createComponentFromCode(goldPriceChartExample.code),
    histogramExample: createComponentFromCode(histogramExample.code),
    lottieAnimationExample: createComponentFromCode(lottieAnimationExample.code),
    myCustomAnimationExample: createComponentFromCode(myCustomAnimationExample.code),
    progressBarExample: createComponentFromCode(progressBarExample.code),
    textRotationExample: createComponentFromCode(textRotationExample.code),
    typewriterHighlightExample: createComponentFromCode(typewriterHighlightExample.code),
    wordCarouselExample: createComponentFromCode(wordCarouselExample.code),
  };
})();
