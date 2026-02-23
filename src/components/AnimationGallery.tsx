"use client";

import { examples } from "@/examples/code";
import { Play, Type, BarChart3, Disc, Box } from "lucide-react";
import Link from "next/link";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Text: Type,
  Charts: BarChart3,
  Animation: Disc,
  "3D": Box,
  Other: Box,
};

const categoryColors: Record<string, string> = {
  Text: "#fdba74",
  Charts: "#a5b4fc",
  Animation: "#86efac",
  "3D": "#f9a8d4",
  Other: "#fde047",
};

export function AnimationGallery() {
  const categories = Array.from(new Set(examples.map((e) => e.category)));

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4">
      <h1 className="text-5xl font-bold text-white mb-4 text-center">
        Animation Gallery
      </h1>
      <p className="text-muted-foreground mb-12 text-center">
        Select an animation to preview and edit the code
      </p>

      <div className="w-full max-w-5xl grid gap-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || Box;
          const color = categoryColors[category] || "#fde047";
          const categoryExamples = examples.filter((e) => e.category === category);

          return (
            <div key={category}>
              <h2
                className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color }}
              >
                <Icon className="w-4 h-4" />
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryExamples.map((example) => (
                  <Link
                    key={example.id}
                    href={`/code-examples?example=${example.id}`}
                    className="group"
                  >
                    <div
                      className="bg-background-elevated border border-border hover:border-primary/50 rounded-xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground text-sm">
                          {example.name}
                        </h3>
                        <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground-dim line-clamp-2">
                        {example.description}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground-dim">
                        <span>{example.durationInFrames} frames</span>
                        <span>•</span>
                        <span>{example.fps} fps</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground-dim text-center">
          Want to add your own animation?
        </div>
        <div className="text-xs text-muted-foreground-dim text-center max-w-md">
          Create a new file in <code className="bg-muted px-1.5 py-0.5 rounded">src/examples/code/</code> and
          export it from <code className="bg-muted px-1.5 py-0.5 rounded">index.ts</code>
        </div>
      </div>
    </div>
  );
}
