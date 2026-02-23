"use client";

import { Button } from "@/components/ui/button";
import { Download, Cloud, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRendering } from "../../../helpers/use-rendering";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { ProgressBar } from "./ProgressBar";

type RenderMode = "local" | "cloud";

export const RenderControls: React.FC<{
  code: string;
  durationInFrames: number;
  fps: number;
  compositionId?: string;
}> = ({ code, durationInFrames, fps, compositionId = "my-custom-animation" }) => {
  const [mode, setMode] = useState<RenderMode>("local");
  const previousPropsRef = useRef({ code, durationInFrames, fps });

  // Cloud rendering (Lambda)
  const cloudRender = useRendering({
    code,
    durationInFrames,
    fps,
  });

  // Use cloud renderer (local mode shows instructions instead)
  const { renderMedia, state, undo } = cloudRender;

  // Reset rendering state when code, duration, or fps changes
  useEffect(() => {
    const prev = previousPropsRef.current;
    const hasChanged =
      prev.code !== code ||
      prev.durationInFrames !== durationInFrames ||
      prev.fps !== fps;

    if (hasChanged && state.status !== "init") {
      undo();
    }
    previousPropsRef.current = { code, durationInFrames, fps };
  }, [code, durationInFrames, fps, state.status, undo]);

  if (
    state.status === "init" ||
    state.status === "invoking" ||
    state.status === "error"
  ) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/* Mode toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setMode("local")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === "local"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Render on your computer (free)"
            >
              <Terminal className="w-3.5 h-3.5" />
              Local (CLI)
            </button>
            <button
              onClick={() => setMode("cloud")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === "cloud"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Render in the cloud (requires AWS setup)"
            >
              <Cloud className="w-3.5 h-3.5" />
              Cloud
            </button>
          </div>

          {/* Render button for cloud mode */}
          {mode === "cloud" && (
            <Button
              disabled={state.status === "invoking" || !code}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              <Download className="w-4 h-4 mr-2" />
              {state.status === "invoking"
                ? "Starting render..."
                : "Render & Download"}
            </Button>
          )}
        </div>

        {/* Error message */}
        {state.status === "error" && mode === "cloud" && (
          <ErrorComp message={state.error.message} />
        )}

        {/* Local mode instructions */}
        {mode === "local" && (
          <div className="bg-muted rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Local Rendering Instructions</span>
            </div>
            <p className="text-muted-foreground mb-3">
              Render this animation using the Remotion CLI:
            </p>
            <div className="bg-background rounded p-3 font-mono text-xs overflow-x-auto">
              <div className="text-muted-foreground-dim"># List all compositions</div>
              <div className="text-foreground">bunx remotionb compositions</div>
              <div className="mt-2 text-muted-foreground-dim"># Render this animation</div>
              <div className="text-foreground">
                bunx remotionb render {compositionId} output/video.mp4
              </div>
              <div className="mt-2 text-muted-foreground-dim"># Quick preview (faster)</div>
              <div className="text-foreground">
                bunx remotionb render {compositionId} output/preview.mp4 --scale=0.5
              </div>
            </div>
            <p className="text-muted-foreground-dim text-xs mt-3">
              See <code className="bg-muted px-1 rounded">ai_docs/EXPORTING_VIDEOS.md</code> for more options.
            </p>
          </div>
        )}

        {/* Cloud helper text */}
        {mode === "cloud" && state.status === "init" && (
          <span className="text-xs text-muted-foreground-dim">
            Requires AWS Lambda setup (.env file)
          </span>
        )}
      </div>
    );
  }

  if (state.status === "rendering") {
    return <ProgressBar progress={state.progress || 0} />;
  }

  if (state.status === "done") {
    return <DownloadButton state={state} undo={undo} />;
  }

  return null;
};
