import { HttpMethod } from "@/types/method";

export interface FetchResult {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}

// TODO: реализовать реальный fetch к exampleEndpoint с нужным методом/телом
export async function performRequest(
  method: HttpMethod,
  endpoint: string,
  body?: Record<string, unknown>
): Promise<FetchResult> {
  throw new Error("Not implemented yet");
}
