import { RemotionExample } from "./index";

export const aiAgents101Code = `import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  AbsoluteFill,
  interpolate,
  spring,
  Sequence,
} from "remotion";

export const MyAnimation = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // === PROFESSIONAL COLOR PALETTE ===
  const COLORS = {
    background: "#0B0F19", // Deep navy - almost black
    surface: "#151B2D", // Card surface
    primary: "#3B82F6", // Professional blue
    secondary: "#8B5CF6", // Soft purple
    accent: "#06B6D4", // Cyan
    text: "#F8FAFC", // Off-white
    textMuted: "#94A3B8", // Muted gray
    success: "#10B981", // Green
    warning: "#F59E0B", // Amber
    danger: "#EF4444", // Red
  };

  // === EASING FUNCTIONS ===
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const easeOutBack = (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  // === SPRING CONFIGURATIONS ===
  const springSmooth = { damping: 20, stiffness: 100, mass: 1 };
  const springBouncy = { damping: 10, stiffness: 120, mass: 0.8 };
  const springSharp = { damping: 25, stiffness: 200, mass: 0.5 };

  // === TIMING ===
  const INTRO_END = 120;
  const LOOP_START = 130;
  const LOOP_END = 330;
  const CAPABILITIES_START = 340;
  const CAPABILITIES_END = 510;
  const TYPES_START = 520;
  const TYPES_END = 660;
  const OUTRO_START = 670;
  const TOTAL = 720;

  // === TYPOGRAPHY ===
  const typography = {
    title: {
      fontSize: Math.round(width * 0.08), // Responsive
      fontWeight: 800,
      letterSpacing: -0.02,
    },
    subtitle: {
      fontSize: Math.round(width * 0.025),
      fontWeight: 400,
      letterSpacing: 0.01,
    },
    sectionTitle: {
      fontSize: Math.round(width * 0.035),
      fontWeight: 700,
      letterSpacing: -0.01,
    },
    body: {
      fontSize: Math.round(width * 0.018),
      fontWeight: 400,
      lineHeight: 1.6,
    },
    label: {
      fontSize: Math.round(width * 0.014),
      fontWeight: 600,
      letterSpacing: 0.05,
      textTransform: "uppercase" as const,
    },
  };

  // === TITLE SEQUENCE ===
  const titleOpacity = spring({
    frame,
    fps,
    config: springSharp,
    durationInFrames: 60,
    frameOffset: 0,
  });
  const titleY = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
    durationInFrames: 70,
    frameOffset: 0,
  });

  const subtitleOpacity = spring({
    frame,
    fps,
    config: springSmooth,
    durationInFrames: 50,
    frameOffset: 40,
  });

  // === AGENT LOOP ===
  const loopProgress = (frame - LOOP_START) / (LOOP_END - LOOP_START);
  const stages = [
    { name: "PERCEIVE", icon: "👁️", color: COLORS.accent, desc: "Gather data from environment" },
    { name: "REASON", icon: "🧠", color: COLORS.primary, desc: "Process and decide" },
    { name: "ACT", icon: "⚡", color: COLORS.secondary, desc: "Execute actions" },
    { name: "LEARN", icon: "🔄", color: COLORS.success, desc: "Improve continuously" }
  ];
  const currentStage = Math.floor(loopProgress * stages.length) % stages.length;
  const stageProgress = (loopProgress * stages.length) % 1;
  const loopOpacity = spring({
    frame,
    fps,
    config: springSmooth,
    durationInFrames: 40,
    frameOffset: LOOP_START,
  });

  // === OUTRO SEQUENCE ===
  const outroOpacity = spring({
    frame,
    fps,
    config: springSmooth,
    durationInFrames: 40,
    frameOffset: OUTRO_START,
  });
  const outroY = spring({
    frame,
    fps,
    config: springSharp,
    durationInFrames: 50,
    frameOffset: OUTRO_START,
  });

  // === CAPABILITIES ===
  const capabilities = [
    {
      icon: "🎯",
      title: "Goal-Oriented",
      description: "Autonomous decision-making to achieve objectives",
      color: COLORS.primary
    },
    {
      icon: "📊",
      title: "Learning",
      description: "Adapt and improve from experience",
      color: COLORS.secondary
    },
    {
      icon: "🔄",
      title: "Autonomous",
      description: "Work without constant supervision",
      color: COLORS.success
    }
  ];

  // === TYPES GRID ===
  const types = [
    { name: "Simple Reflex", desc: "Rule-based responses", category: "Basic" },
    { name: "Model-Based", desc: "Internal world models", category: "Intermediate" },
    { name: "Utility-Based", desc: "Maximize outcomes", category: "Advanced" },
    { name: "Learning", desc: "Improve over time", category: "Advanced" }
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(59, 130, 246, 0.08), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* INTRO SEQUENCE */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: width * 0.1,
      }}>
        {/* Main title */}
        <div
          style={{
            transform: \`translateY(\${interpolate(titleY, [0, 1], [60, 0], { extrapolateRight: "clamp" })}px)\`,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              ...typography.title,
              color: COLORS.text,
              margin: "0 0 " + typography.subtitle.fontSize + "px",
              background: "linear-gradient(135deg, " + COLORS.primary + " 0%, " + COLORS.secondary + " 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI AGENTS
          </h1>
          <div
            style={{
              ...typography.subtitle,
              color: COLORS.textMuted,
              fontWeight: 500,
              marginTop: "16px",
            }}
          >
            101: Understanding Autonomous Intelligence
          </div>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: interpolate(frame, [0, INTRO_END], [0, 120], { extrapolateRight: "clamp" }),
            height: 2,
            background: "linear-gradient(90deg, transparent, " + COLORS.primary + ", " + COLORS.secondary + ", transparent)",
            opacity: 0.6,
            marginTop: "40px",
          }}
        />
      </div>

      {/* AGENT LOOP VISUALIZATION */}
      <Sequence from={LOOP_START} durationInFrames={LOOP_END - LOOP_START}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: loopOpacity,
          }}
        >
          <h2
            style={{
              ...typography.sectionTitle,
              color: COLORS.text,
              margin: "0 0 50px 0",
              textAlign: "center",
            }}
          >
            The Agent Loop
          </h2>

          {/* Stage circles */}
          <div
            style={{
              display: "flex",
              gap: 40,
              alignItems: "center",
              marginBottom: "60px",
            }}
          >
            {stages.map((stage, i) => {
              const stageDelay = i * 5;
              const scale = spring({
                frame,
                fps,
                config: springBouncy,
                durationInFrames: 35,
                frameOffset: LOOP_START + stageDelay,
              });
              const isActive = i === currentStage;
              const pulse = isActive ? Math.sin((frame - LOOP_START) * 0.1) * 0.1 : 0;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: isActive
                        ? stage.color
                        : "rgba(255, 255, 255, 0.03)",
                      border: "2px solid " + stage.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                      transform: \`scale(\${scale + pulse})\`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {stage.icon}
                  </div>

                  {/* Stage name */}
                  <div
                    style={{
                      ...typography.label,
                      color: isActive ? stage.color : COLORS.textMuted,
                      textAlign: "center",
                      opacity: isActive ? 1 : 0.5,
                    }}
                  >
                    {stage.name}
                  </div>

                  {/* Description */}
                  {isActive && (
                    <div
                      style={{
                        ...typography.body,
                        color: COLORS.textMuted,
                        textAlign: "center",
                        maxWidth: 120,
                        marginTop: 8,
                        opacity: spring({
                          frame,
                          fps,
                          config: springSmooth,
                          durationInFrames: 30,
                          frameOffset: LOOP_START + i * 5,
                        }),
                      }}
                    >
                      {stage.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connection line */}
          <div
            style={{
              width: 300,
              height: 2,
              background: \`linear-gradient(90deg, \${COLORS.primary}40, \${COLORS.secondary}40, \${COLORS.accent}40)\`,
              borderRadius: 1,
            }}
          />

          {/* Progress indicator */}
          <div
            style={{
              marginTop: 40,
              width: 200,
              height: 4,
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: stageProgress * 100 + "%",
                height: "100%",
                background: \`linear-gradient(90deg, \${COLORS.primary}, \${COLORS.accent})\`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      </Sequence>

      {/* CAPABILITIES */}
      <Sequence from={CAPABILITIES_START} durationInFrames={CAPABILITIES_END - CAPABILITIES_START}>
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: 0,
            right: 0,
            padding: "0 " + width * 0.12 + "px",
          }}
        >
          <h2
            style={{
              ...typography.sectionTitle,
              color: COLORS.text,
              margin: "0 0 40px 0",
              textAlign: "center",
            }}
          >
            Core Capabilities
          </h2>

          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {capabilities.map((cap, i) => {
              const cardDelay = i * 8;
              const cardY = spring({
                frame,
                fps,
                config: { damping: 25, stiffness: 120, mass: 0.8 },
                durationInFrames: 50,
                frameOffset: CAPABILITIES_START + cardDelay,
              });
              const cardOpacity = spring({
                frame,
                fps,
                config: springSmooth,
                durationInFrames: 40,
                frameOffset: CAPABILITIES_START + cardDelay,
              });

              return (
                <div
                  key={i}
                  style={{
                    background: COLORS.surface,
                    borderLeft: "3px solid " + cap.color,
                    borderRadius: 8,
                    padding: 24,
                    minWidth: 260,
                    transform: \`translateY(\${cardY}px)\`,
                    opacity: cardOpacity,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      marginBottom: 12,
                    }}
                  >
                    {cap.icon}
                  </div>
                  <h3
                    style={{
                      ...typography.label,
                      color: cap.color,
                      margin: "0 0 8px 0",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    style={{
                      ...typography.body,
                      color: COLORS.textMuted,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* TYPES GRID */}
      <Sequence from={TYPES_START} durationInFrames={TYPES_END - TYPES_START}>
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: 0,
            right: 0,
            padding: "0 " + width * 0.1 + "px",
          }}
        >
          <h2
            style={{
              ...typography.sectionTitle,
              color: COLORS.text,
              margin: "0 0 35px 0",
              textAlign: "center",
            }}
          >
            Types of AI Agents
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
          >
            {types.map((type, i) => {
              const cardDelay = i * 6;
              const cardY = spring({
                frame,
                fps,
                config: { damping: 22, stiffness: 130, mass: 0.7 },
                durationInFrames: 45,
                frameOffset: TYPES_START + cardDelay,
              });
              const cardOpacity = spring({
                frame,
                fps,
                config: springSmooth,
                durationInFrames: 35,
                frameOffset: TYPES_START + cardDelay,
              });

              const categoryColors = {
                Basic: COLORS.textMuted,
                Intermediate: COLORS.primary,
                Advanced: COLORS.secondary,
              };

              return (
                <div
                  key={i}
                  style={{
                    background: COLORS.surface,
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: 28,
                    transform: \`translateY(\${cardY}px)\`,
                    opacity: cardOpacity,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 16,
                    }}
                  >
                    <h3
                      style={{
                        ...typography.sectionTitle,
                        color: COLORS.text,
                        margin: 0,
                        fontSize: Math.round(width * 0.025),
                      }}
                    >
                      {type.name}
                    </h3>
                    <span
                      style={{
                        ...typography.label,
                        color: categoryColors[type.category as keyof typeof categoryColors],
                        fontSize: Math.round(width * 0.012),
                        padding: "4px 10px",
                        background: "rgba(255, 255, 255, 0.05)",
                        borderRadius: 4,
                      }}
                    >
                      {type.category}
                    </span>
                  </div>
                  <p
                    style={{
                      ...typography.body,
                      color: COLORS.textMuted,
                      margin: 0,
                    }}
                  >
                    {type.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Sequence>

      {/* OUTRO */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: width * 0.1,
        }}
      >
        <div
          style={{
            transform: \`translateY(\${interpolate(outroY, [0, 1], [30, 0], { extrapolateRight: "clamp" })}px)\`,
            opacity: outroOpacity,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              ...typography.title,
              color: COLORS.text,
              margin: "0 0 " + typography.subtitle.fontSize + "px",
            }}
          >
            The Future is Agentic
          </h2>
          <p
            style={{
              ...typography.subtitle,
              color: COLORS.textMuted,
              fontWeight: 500,
              marginTop: "16px",
            }}
          >
            AI Agents: Your Digital Coworkers of 2025
          </p>

          {/* CTA Button style */}
          <div
            style={{
              marginTop: "32px",
              display: "inline-block",
              padding: "16px 32px",
              background: "linear-gradient(135deg, " + COLORS.primary + ", " + COLORS.secondary + ")",
              borderRadius: 8,
              color: "white",
              fontWeight: 600,
              fontSize: Math.round(width * 0.018),
              transform: \`scale(\${spring({ frame, fps, config: springBouncy, durationInFrames: 40, frameOffset: OUTRO_START + 30 })})\`,
            }}
          >
            Learn More
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      {/* Top left accent */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          width: 40,
          height: 40,
          borderRadius: "8",
          borderLeft: "3px solid " + COLORS.primary,
          borderTop: "3px solid " + COLORS.primary,
          opacity: interpolate(frame, [0, INTRO_END], [0, 0.2], { extrapolateRight: "clamp" }),
        }}
      />

      {/* Bottom right accent */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          width: 40,
          height: 40,
          borderRadius: "8",
          borderRight: "3px solid " + COLORS.secondary,
          borderBottom: "3px solid " + COLORS.secondary,
          opacity: interpolate(frame, [OUTRO_START, TOTAL], [0, 0.2], { extrapolateLeft: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};`;

export const aiAgents101Example: RemotionExample = {
  id: "ai-agents-101",
  name: "AI Agents 101",
  description: "Professional explainer of AI agents with refined typography and smooth transitions",
  category: "Animation",
  durationInFrames: 720,
  fps: 30,
  code: aiAgents101Code,
};
