import { FetchResult } from "@/lib/fetch-demo";

interface ResponseViewProps {
  result: FetchResult | null;
}

// TODO: реализовать отображение status / headers / body в стиле code editor
export function ResponseView({ result }: ResponseViewProps) {
  if (!result) return <div className="opacity-60">No response yet.</div>;
  return <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>;
}
