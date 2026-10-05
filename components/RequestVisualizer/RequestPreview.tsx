import { MethodConfig } from "@/types/method";
import { METHOD_STYLES } from "@/lib/method-styles";

interface RequestPreviewProps {
  config: MethodConfig;
  onSend: () => void;
}

export function RequestPreview({ config, onSend }: RequestPreviewProps) {
  const url = new URL(config.exampleEndpoint);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-neutral-300 leading-relaxed">
          {config.semantics}
        </p>
        <div className="flex gap-2 flex-wrap">
          {config.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded border border-neutral-800 bg-neutral-900 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-3 flex-wrap">
          <span className={`font-bold text-sm ${METHOD_STYLES[config.method].text}`}>
            {config.method}
          </span>
          <span className="text-neutral-500 text-sm">{url.host}</span>
          <span className="text-neutral-200 text-sm break-all">{url.pathname}</span>
          <span className="ml-auto text-xs text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded">
            {config.endpointContext}
          </span>
        </div>

        <div className="p-4 flex flex-col gap-5">
          <div>
            <div className="text-xs text-neutral-600 uppercase tracking-wide mb-2">
              Headers
            </div>
            <div className="flex flex-col gap-2">
              {Object.entries(config.exampleHeaders).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-0.5">
                  <div className="text-sm break-all">
                    <span className="text-neutral-400">{key}:</span>{" "}
                    <span className="text-neutral-200">{value}</span>
                  </div>
                  {config.headerNotes[key] && (
                    <div className="text-xs text-neutral-600 pl-2">
                      ↳ {config.headerNotes[key]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {config.exampleBody && (
            <div>
              <div className="text-xs text-neutral-600 uppercase tracking-wide mb-2">
                Body
              </div>
              <div className="bg-neutral-950 rounded p-3 font-mono text-sm">
                <div className="text-neutral-700">{"{"}</div>
                {Object.entries(config.exampleBody).map(([key, value], i, arr) => (
                  <div key={key} className="flex flex-wrap items-start gap-x-3 pl-4 py-0.5">
                    <span className="text-neutral-400 flex-shrink-0">
                      &quot;{key}&quot;
                    </span>
                    <span className="text-neutral-600 flex-shrink-0">:</span>
                    <span className="text-neutral-200 flex-shrink-0">
                      {JSON.stringify(value)}
                      {i < arr.length - 1 ? "," : ""}
                    </span>
                    {config.bodyNotes?.[key] && (
                      <span className="basis-full sm:basis-auto sm:flex-1 text-xs text-neutral-600 mt-0.5 leading-snug">
                        {"// "}{config.bodyNotes[key]}
                      </span>
                    )}
                  </div>
                ))}
                <div className="text-neutral-700">{"}"}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onSend}
        className="self-start px-4 py-2 rounded bg-white text-black text-sm font-medium hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
      >
        Send Request
      </button>
    </div>
  );
}
