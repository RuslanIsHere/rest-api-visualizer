import { Step } from "@/types/method";

interface StepIndicatorProps {
  currentStep: Step;
}

// TODO: реализовать прогресс-бар (preview -> flow -> response)
export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return <div className="text-xs uppercase tracking-wide opacity-60">{currentStep}</div>;
}
