import { MethodConfig } from "@/types/method";

interface RequestPreviewProps {
  config: MethodConfig;
}

// TODO: реализовать отображение endpoint / headers / body как code blocks
export function RequestPreview({ config }: RequestPreviewProps) {
  return (
    <pre className="text-sm opacity-80">
      {JSON.stringify(config, null, 2)}
    </pre>
  );
}
