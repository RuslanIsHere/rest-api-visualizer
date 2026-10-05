import { HttpMethod } from "@/types/method";

export interface FetchResult {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  duration: number;
}

export async function performRequest(
  method: HttpMethod,
  endpoint: string,
  // Sent as-is, so the preview shows exactly what goes over the wire.
  headers: Record<string, string>,
  body?: Record<string, unknown>
): Promise<FetchResult> {
  const start = Date.now();

  const init: RequestInit = { method, headers };

  if (body && method !== "GET" && method !== "DELETE") {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, init);
  const duration = Date.now() - start;

  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  const contentType = response.headers.get("content-type") ?? "";
  const responseBody = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  return {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
    body: responseBody,
    duration,
  };
}
