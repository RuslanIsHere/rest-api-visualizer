import { HttpMethod } from "@/types/method";

interface RequestFlowProps {
  method: HttpMethod;
  onComplete: () => void;
}

// TODO: реализовать CSS-анимацию client -> network -> server -> response
export function RequestFlow({ method, onComplete }: RequestFlowProps) {
  return <div className="opacity-60">Flow animation for {method} goes here.</div>;
}
