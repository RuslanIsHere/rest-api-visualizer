"use client";

import { useState } from "react";
import { HttpMethod } from "@/types/method";
import { methodConfigs } from "@/lib/api-methods";
import { MethodList } from "@/components/MethodList/MethodList";
import { RequestVisualizer } from "@/components/RequestVisualizer/RequestVisualizer";

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<HttpMethod>("GET");

  return (
    <main className="grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-screen">
      <aside className="border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col min-w-0">
        <div className="px-4 py-5 border-b border-neutral-800">
          <div className="text-sm font-bold text-neutral-200">
            REST API Visualizer
          </div>
          <div className="text-xs text-neutral-500 mt-0.5">
            HTTP methods explorer
          </div>
        </div>
        <MethodList
          methods={methodConfigs}
          selectedMethod={selectedMethod}
          onSelect={setSelectedMethod}
        />
      </aside>
      <section className="min-w-0">
        <RequestVisualizer selectedMethod={selectedMethod} />
      </section>
    </main>
  );
}
