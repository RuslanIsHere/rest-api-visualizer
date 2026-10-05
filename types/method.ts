export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Step = "preview" | "flow" | "response";

export interface MethodConfig {
  method: HttpMethod;
  description: string;
  semantics: string;
  tags: string[];
  exampleEndpoint: string;
  endpointContext: string;
  exampleHeaders: Record<string, string>;
  headerNotes: Record<string, string>;
  exampleBody?: Record<string, unknown>;
  bodyNotes?: Record<string, string>;
  responseNote: string;
}
