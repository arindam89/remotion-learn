import React from "react";
import { Composition } from "remotion";
import { DynamicComp } from "./DynamicComp";
import {
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
} from "../examples/code";
import {
  AnimatedShapes,
  AiAgents101,
  FallingSpheres,
  GoldPriceChart,
  Histogram,
  LottieAnimation,
  MyCustomAnimation,
  ProgressBar,
  TextRotation,
  TypewriterHighlight,
  WordCarousel,
} from "./CompiledComponents";

const defaultCode = `import { AbsoluteFill } from "remotion";
export const MyAnimation = () => <AbsoluteFill style={{ backgroundColor: "#000" }} />;`;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Dynamic composition for code editor */}
      <Composition
        id="DynamicComp"
        component={DynamicComp}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ code: defaultCode }}
        calculateMetadata={({ props }) => ({
          durationInFrames: props.durationInFrames as number,
          fps: props.fps as number,
        })}
      />

      {/* Static example compositions - use pre-compiled components for CLI rendering */}
      <Composition
        id="typewriter-highlight"
        component={TypewriterHighlight}
        durationInFrames={typewriterHighlightExample.durationInFrames}
        fps={typewriterHighlightExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="text-rotation"
        component={TextRotation}
        durationInFrames={textRotationExample.durationInFrames}
        fps={textRotationExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="histogram"
        component={Histogram}
        durationInFrames={histogramExample.durationInFrames}
        fps={histogramExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="progress-bar"
        component={ProgressBar}
        durationInFrames={progressBarExample.durationInFrames}
        fps={progressBarExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="animated-shapes"
        component={AnimatedShapes}
        durationInFrames={animatedShapesExample.durationInFrames}
        fps={animatedShapesExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="lottie-animation"
        component={LottieAnimation}
        durationInFrames={lottieAnimationExample.durationInFrames}
        fps={lottieAnimationExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="falling-spheres"
        component={FallingSpheres}
        durationInFrames={fallingSpheresExample.durationInFrames}
        fps={fallingSpheresExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="gold-price-chart"
        component={GoldPriceChart}
        durationInFrames={goldPriceChartExample.durationInFrames}
        fps={goldPriceChartExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="word-carousel"
        component={WordCarousel}
        durationInFrames={wordCarouselExample.durationInFrames}
        fps={wordCarouselExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="my-custom-animation"
        component={MyCustomAnimation}
        durationInFrames={myCustomAnimationExample.durationInFrames}
        fps={myCustomAnimationExample.fps}
        width={1920}
        height={1080}
      />

      <Composition
        id="ai-agents-101"
        component={AiAgents101}
        durationInFrames={aiAgents101Example.durationInFrames}
        fps={aiAgents101Example.fps}
        width={1920}
        height={1080}
      />
    </>
  );
};
