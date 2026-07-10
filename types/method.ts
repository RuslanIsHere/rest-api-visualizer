export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Step = "preview" | "flow" | "response";

export interface MethodConfig {
  method: HttpMethod;
  description: string;
  exampleEndpoint: string;
  exampleHeaders: Record<string, string>;
  exampleBody?: Record<string, unknown>;
}
