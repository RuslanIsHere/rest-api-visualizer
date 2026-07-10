"use client";

import { MethodConfig, HttpMethod } from "@/types/method";

interface MethodListProps {
  methods: MethodConfig[];
  selectedMethod: HttpMethod;
  onSelect: (method: HttpMethod) => void;
}

// TODO: реализовать вёрстку (пока .map() без отдельного MethodItem, декомпозируем позже при необходимости)
export function MethodList({ methods, selectedMethod, onSelect }: MethodListProps) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {methods.map((config) => (
        <button
          key={config.method}
          onClick={() => onSelect(config.method)}
          className={`text-left px-3 py-2 rounded ${
            selectedMethod === config.method ? "bg-neutral-800" : ""
          }`}
        >
          {config.method}
        </button>
      ))}
    </nav>
  );
}
