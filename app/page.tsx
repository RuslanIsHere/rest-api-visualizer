"use client";

import { useState } from "react";
import { HttpMethod } from "@/types/method";
import { methodConfigs } from "@/lib/api-methods";
import { MethodList } from "@/components/MethodList/MethodList";
import { RequestVisualizer } from "@/components/RequestVisualizer/RequestVisualizer";

export default function Home() {
  const [selectedMethod, setSelectedMethod] = useState<HttpMethod>("GET");

  return (
    <main className="grid grid-cols-[240px_1fr] min-h-screen">
      <aside className="border-r border-neutral-800">
        <MethodList
          methods={methodConfigs}
          selectedMethod={selectedMethod}
          onSelect={setSelectedMethod}
        />
      </aside>
      <section>
        <RequestVisualizer selectedMethod={selectedMethod} />
      </section>
    </main>
  );
}
