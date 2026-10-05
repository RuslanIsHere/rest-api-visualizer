import { MethodConfig } from "@/types/method";

export type SnippetLang = "curl" | "fetch";

// Wraps a value in single quotes for a POSIX shell, escaping embedded quotes.
function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function indent(text: string, spaces: number): string {
  const pad = " ".repeat(spaces);
  return text.replace(/\n/g, `\n${pad}`);
}

export function toCurl(config: MethodConfig): string {
  // GET is curl's default; spelling it out with -X is redundant.
  const lines = [
    config.method === "GET"
      ? `curl ${shellQuote(config.exampleEndpoint)}`
      : `curl -X ${config.method} ${shellQuote(config.exampleEndpoint)}`,
  ];

  for (const [key, value] of Object.entries(config.exampleHeaders)) {
    lines.push(`-H ${shellQuote(`${key}: ${value}`)}`);
  }

  if (config.exampleBody) {
    lines.push(`-d ${shellQuote(JSON.stringify(config.exampleBody))}`);
  }

  return lines.join(" \\\n  ");
}

export function toFetch(config: MethodConfig): string {
  const options = [`method: "${config.method}",`];

  const headers = Object.entries(config.exampleHeaders)
    .map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)},`)
    .join("\n");
  options.push(`headers: {\n${headers}\n},`);

  if (config.exampleBody) {
    const body = JSON.stringify(config.exampleBody, null, 2);
    options.push(`body: JSON.stringify(${body}),`);
  }

  return [
    `const response = await fetch(${JSON.stringify(config.exampleEndpoint)}, {`,
    ...options.map((option) => `  ${indent(option, 2)}`),
    `});`,
    `const data = await response.json();`,
  ].join("\n");
}

export const SNIPPETS: Record<SnippetLang, { label: string; build: (config: MethodConfig) => string }> = {
  curl: { label: "cURL", build: toCurl },
  fetch: { label: "fetch", build: toFetch },
};
