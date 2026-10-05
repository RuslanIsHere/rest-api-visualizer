import { FetchResult } from "@/lib/fetch-demo";

interface ResponseViewProps {
  result: FetchResult | null;
  loading: boolean;
  error: string | null;
  responseNote: string;
  onReset: () => void;
}

function statusColor(status: number): string {
  if (status >= 500) return "text-red-500";
  if (status >= 400) return "text-amber-500";
  if (status >= 300) return "text-sky-500";
  return "text-green-500";
}

export function ResponseView({
  result,
  loading,
  error,
  responseNote,
  onReset,
}: ResponseViewProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-sm text-neutral-400 animate-pulse">
          Waiting for response...
        </div>
        <BackLink onReset={onReset} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <div className="rounded border border-red-900 bg-red-950/30 p-4 text-sm text-red-400">
          {error}
        </div>
        <BackLink onReset={onReset} />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-sm text-neutral-600">No response.</div>
        <BackLink onReset={onReset} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className={`text-3xl font-bold ${statusColor(result.status)}`}>
          {result.status}
        </span>
        {result.statusText && (
          <span className="text-neutral-400 text-sm">{result.statusText}</span>
        )}
        <span className="text-neutral-600 text-xs ml-auto">{result.duration}ms</span>
      </div>

      <div className="rounded border border-neutral-800 bg-neutral-900 overflow-hidden">
        <div className="px-4 py-2 border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-600">
          Body
        </div>
        <pre className="p-4 text-sm text-neutral-200 overflow-auto max-h-96">
          {JSON.stringify(result.body, null, 2)}
        </pre>
      </div>

      <details className="rounded border border-neutral-800 bg-neutral-900 overflow-hidden">
        <summary className="px-4 py-2 cursor-pointer text-xs uppercase tracking-wide text-neutral-600 hover:text-neutral-400">
          Headers ({Object.keys(result.headers).length})
        </summary>
        <div className="px-4 pb-4 flex flex-col gap-1 text-sm">
          {Object.entries(result.headers).map(([key, value]) => (
            <div key={key} className="break-all">
              <span className="text-neutral-400">{key}:</span>{" "}
              <span className="text-neutral-200">{value}</span>
            </div>
          ))}
          <div className="text-xs text-neutral-600 mt-2">
            ↳ The server sends more than this — browsers only expose
            CORS-safelisted headers to JavaScript unless the server lists others
            in Access-Control-Expose-Headers.
          </div>
        </div>
      </details>

      <div className="text-xs text-neutral-500 border-l-2 border-neutral-700 pl-3 leading-relaxed">
        {responseNote}
      </div>

      <BackLink onReset={onReset} />
    </div>
  );
}

function BackLink({ onReset }: { onReset: () => void }) {
  return (
    <button
      onClick={onReset}
      className="self-start text-xs text-neutral-600 hover:text-neutral-300 transition-colors"
    >
      ← Back to preview
    </button>
  );
}
