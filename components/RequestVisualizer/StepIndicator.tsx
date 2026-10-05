import { Step } from "@/types/method";

interface StepIndicatorProps {
  currentStep: Step;
}

const STEPS: { key: Step; label: string }[] = [
  { key: "preview", label: "Preview" },
  { key: "flow", label: "Sending" },
  { key: "response", label: "Response" },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center">
      {STEPS.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentIndex
                  ? "bg-green-500"
                  : index === currentIndex
                  ? "bg-white animate-pulse"
                  : "bg-neutral-700"
              }`}
            />
            <span
              className={`text-xs uppercase tracking-wide transition-colors ${
                index <= currentIndex ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`mx-2 sm:mx-3 h-px w-6 sm:w-12 transition-colors ${
                index < currentIndex ? "bg-neutral-600" : "bg-neutral-800"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
