"use client";

import { useEffect, useRef, useState } from "react";
import { MethodConfig } from "@/types/method";
import { SNIPPETS, SnippetLang } from "@/lib/snippets";

interface CodeSnippetProps {
  config: MethodConfig;
}

export function CodeSnippet({ config }: CodeSnippetProps) {
  const [lang, setLang] = useState<SnippetLang>("curl");
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const code = SNIPPETS[lang].build(config);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return; // Clipboard unavailable (e.g. insecure context) — leave the button as-is.
    }
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded border border-neutral-800 bg-neutral-900 overflow-hidden">
      <div className="px-4 py-2 border-b border-neutral-800 flex items-center gap-1">
        <span className="text-xs text-neutral-600 uppercase tracking-wide mr-2">
          Try it yourself
        </span>
        {(Object.keys(SNIPPETS) as SnippetLang[]).map((key) => (
          <button
            key={key}
            onClick={() => setLang(key)}
            className={`text-xs px-2 py-0.5 rounded transition-colors ${
              lang === key
                ? "bg-neutral-800 text-neutral-200"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {SNIPPETS[key].label}
          </button>
        ))}
        <button
          onClick={handleCopy}
          className="ml-auto text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 bg-neutral-950 text-sm text-neutral-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
