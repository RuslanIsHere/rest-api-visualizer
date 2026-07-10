"use client";

import { useState } from "react";
import { HttpMethod, Step } from "@/types/method";
import { methodConfigs } from "@/lib/api-methods";
import { StepIndicator } from "./StepIndicator";
import { RequestPreview } from "./RequestPreview";
import { RequestFlow } from "./RequestFlow";
import { ResponseView } from "./ResponseView";
import { FetchResult } from "@/lib/fetch-demo";

interface RequestVisualizerProps {
  selectedMethod: HttpMethod;
}

// TODO: связать шаги между собой (preview -> flow -> response) и подключить performRequest
export function RequestVisualizer({ selectedMethod }: RequestVisualizerProps) {
  const [step, setStep] = useState<Step>("preview");
  const [result, setResult] = useState<FetchResult | null>(null);

  const config = methodConfigs.find((c) => c.method === selectedMethod)!;

  return (
    <div className="flex flex-col gap-4 p-6">
      <StepIndicator currentStep={step} />
      {step === "preview" && <RequestPreview config={config} />}
      {step === "flow" && (
        <RequestFlow method={selectedMethod} onComplete={() => setStep("response")} />
      )}
      {step === "response" && <ResponseView result={result} />}
    </div>
  );
}
