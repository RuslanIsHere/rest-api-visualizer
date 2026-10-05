"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HttpMethod, Step } from "@/types/method";
import { methodConfigs } from "@/lib/api-methods";
import { performRequest, FetchResult } from "@/lib/fetch-demo";
import { StepIndicator } from "./StepIndicator";
import { RequestPreview } from "./RequestPreview";
import { RequestFlow } from "./RequestFlow";
import { ResponseView } from "./ResponseView";

interface RequestVisualizerProps {
  selectedMethod: HttpMethod;
}

export function RequestVisualizer({ selectedMethod }: RequestVisualizerProps) {
  const [step, setStep] = useState<Step>("preview");
  const [result, setResult] = useState<FetchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const requestToken = useRef<symbol | undefined>(undefined);

  useEffect(() => {
    requestToken.current = undefined;
    setStep("preview");
    setResult(null);
    setError(null);
    setLoading(false);
  }, [selectedMethod]);

  // Stable reference: RequestFlow restarts its timers whenever onComplete changes,
  // and the parent re-renders mid-animation when the fetch resolves.
  const handleFlowComplete = useCallback(() => setStep("response"), []);

  const config = methodConfigs.find((c) => c.method === selectedMethod)!;

  async function handleSend() {
    const token = Symbol();
    requestToken.current = token;
    setStep("flow");
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const data = await performRequest(
        selectedMethod,
        config.exampleEndpoint,
        config.exampleHeaders,
        config.exampleBody
      );
      if (requestToken.current === token) setResult(data);
    } catch (e) {
      if (requestToken.current === token)
        setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      if (requestToken.current === token) setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-3xl">
      <StepIndicator currentStep={step} />
      {step === "preview" && (
        <RequestPreview config={config} onSend={handleSend} />
      )}
      {step === "flow" && (
        <RequestFlow
          method={selectedMethod}
          onComplete={handleFlowComplete}
        />
      )}
      {step === "response" && (
        <ResponseView
          result={result}
          loading={loading}
          error={error}
          responseNote={config.responseNote}
          onReset={() => {
            setStep("preview");
            setResult(null);
            setError(null);
          }}
        />
      )}
    </div>
  );
}
