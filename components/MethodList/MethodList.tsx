"use client";

import { MethodConfig, HttpMethod } from "@/types/method";
import { METHOD_STYLES } from "@/lib/method-styles";

interface MethodListProps {
  methods: MethodConfig[];
  selectedMethod: HttpMethod;
  onSelect: (method: HttpMethod) => void;
}

export function MethodList({ methods, selectedMethod, onSelect }: MethodListProps) {
  return (
    <nav className="flex flex-row md:flex-col gap-1 p-4 overflow-x-auto">
      <div className="hidden md:block text-xs uppercase tracking-wide text-neutral-600 px-3 mb-2">
        HTTP Methods
      </div>
      {methods.map((config) => {
        const styles = METHOD_STYLES[config.method];
        const isSelected = selectedMethod === config.method;
        return (
          <button
            key={config.method}
            onClick={() => onSelect(config.method)}
            aria-current={isSelected ? "page" : undefined}
            className={`flex flex-shrink-0 items-start gap-3 text-left px-3 py-2.5 rounded text-sm border transition-colors ${
              isSelected
                ? `${styles.active} border`
                : `text-neutral-400 border-transparent ${styles.hover}`
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                isSelected ? styles.dot : "bg-neutral-700"
              }`}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-mono">{config.method}</span>
              <span
                className={`hidden md:block text-xs leading-snug ${
                  isSelected ? "opacity-60" : "text-neutral-600"
                }`}
              >
                {config.description}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
