"use client";

import { useEffect, useState } from "react";
import { HttpMethod } from "@/types/method";
import { METHOD_STYLES } from "@/lib/method-styles";

interface RequestFlowProps {
  method: HttpMethod;
  onComplete: () => void;
}

type Phase = "idle" | "request" | "processing" | "response";

const PHASE_LABEL: Record<Phase, string> = {
  idle: "Preparing...",
  request: "Sending request...",
  processing: "Server processing...",
  response: "Response received",
};

export function RequestFlow({ method, onComplete }: RequestFlowProps) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("request"), 100),
      setTimeout(() => setPhase("processing"), 1200),
      setTimeout(() => setPhase("response"), 2300),
      setTimeout(onComplete, 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const clientActive =
    phase === "idle" || phase === "request" || phase === "response";
  const serverActive = phase === "processing";

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex items-center gap-3 sm:gap-6">
        <div
          className={`w-20 sm:w-24 flex-shrink-0 h-16 rounded-lg border flex flex-col items-center justify-center gap-1 transition-colors duration-300 bg-neutral-900 ${
            clientActive ? "border-neutral-400" : "border-neutral-800"
          }`}
        >
          <span className="text-xs text-neutral-300 font-mono uppercase tracking-wider">
            CLIENT
          </span>
          <span className="text-xs text-neutral-600">browser</span>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div>
            <div className="text-xs text-neutral-600 mb-2">{method} →</div>
            <div className="relative h-px bg-neutral-800">
              <div
                className={`absolute inset-0 origin-left transition-transform duration-1000 ease-in-out ${METHOD_STYLES[method].trail}`}
                style={{
                  transform:
                    phase === "request" ||
                    phase === "processing" ||
                    phase === "response"
                      ? "scaleX(1)"
                      : "scaleX(0)",
                }}
              />
              {phase === "request" && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 ${METHOD_STYLES[method].dot}`}
                  style={{ animation: "dot-travel-right 850ms ease-in-out forwards" }}
                />
              )}
            </div>
          </div>

          <div>
            <div className="text-xs text-neutral-600 mb-2 text-right">
              ← response
            </div>
            <div className="relative h-px bg-neutral-800">
              <div
                className="absolute inset-0 origin-right transition-transform duration-1000 ease-in-out bg-neutral-500/40"
                style={{
                  transform: phase === "response" ? "scaleX(1)" : "scaleX(0)",
                }}
              />
              {phase === "response" && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 bg-neutral-400"
                  style={{ animation: "dot-travel-left 850ms ease-in-out forwards" }}
                />
              )}
            </div>
          </div>
        </div>

        <div
          className={`w-20 sm:w-24 flex-shrink-0 h-16 rounded-lg border flex flex-col items-center justify-center gap-1 transition-colors duration-300 bg-neutral-900 ${
            serverActive
              ? "border-neutral-400 animate-pulse"
              : "border-neutral-800"
          }`}
        >
          <span className="text-xs text-neutral-300 font-mono uppercase tracking-wider">
            SERVER
          </span>
          <span className="text-xs text-neutral-600">api</span>
        </div>
      </div>

      <div className="text-xs text-neutral-500 text-center uppercase tracking-wide">
        {PHASE_LABEL[phase]}
      </div>
    </div>
  );
}
