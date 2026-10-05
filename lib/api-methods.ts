import { MethodConfig } from "@/types/method";

export const methodConfigs: MethodConfig[] = [
  {
    method: "GET",
    description: "Read a resource.",
    semantics:
      "Fetches data without modifying anything. No body is sent. Safe to call repeatedly — it never changes server state.",
    tags: ["safe", "idempotent", "cacheable"],
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    endpointContext: "resource by ID",
    exampleHeaders: { Accept: "application/json" },
    headerNotes: {
      Accept: "Tells the server what format you expect back",
    },
    responseNote:
      "Returns the full resource object. Status 200 OK.",
  },
  {
    method: "POST",
    description: "Create a new resource.",
    semantics:
      "Sends data to create a new item in a collection. The server assigns the ID — you don't pick it. Calling it twice creates two separate items.",
    tags: ["has body"],
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts",
    endpointContext: "collection — no ID yet",
    exampleHeaders: { "Content-Type": "application/json" },
    headerNotes: {
      "Content-Type": "Tells the server the format of the request body",
    },
    exampleBody: { title: "foo", body: "bar", userId: 1 },
    bodyNotes: {
      title: "required",
      body: "required",
      userId: "required — links post to a user",
    },
    responseNote:
      "Returns the created resource with a server-assigned ID. Status 201 Created.",
  },
  {
    method: "PUT",
    description: "Replace a resource entirely.",
    semantics:
      "Replaces the entire resource. You must send every field — any field you omit will be erased or reset to default.",
    tags: ["idempotent", "has body"],
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    endpointContext: "resource to fully replace",
    exampleHeaders: { "Content-Type": "application/json" },
    headerNotes: {
      "Content-Type": "Tells the server the format of the request body",
    },
    exampleBody: { id: 1, title: "foo", body: "bar", userId: 1 },
    bodyNotes: {
      id: "identifies the resource being replaced",
      title: "required — omit and this field gets erased",
      body: "required — omit and this field gets erased",
      userId: "required — omit and this field gets erased",
    },
    responseNote:
      "Returns the fully replaced resource. Status 200 OK.",
  },
  {
    method: "PATCH",
    description: "Update specific fields.",
    semantics:
      "Updates only the fields you send. Everything else stays unchanged. Unlike PUT, you only include what you want to change. PATCH is also not guaranteed to be idempotent — a patch like \"increment counter\" gives a different result each time.",
    tags: ["not guaranteed idempotent", "has body"],
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    endpointContext: "resource to partially update",
    exampleHeaders: { "Content-Type": "application/json" },
    headerNotes: {
      "Content-Type": "Tells the server the format of the request body",
    },
    exampleBody: { title: "updated title" },
    bodyNotes: {
      title: "only this field changes — body, userId stay as-is",
    },
    responseNote:
      "Returns the resource with your changes merged in. Status 200 OK.",
  },
  {
    method: "DELETE",
    description: "Remove a resource.",
    semantics:
      "Deletes the specified resource. No request body is sent. The response body is usually empty — that is expected, not an error.",
    tags: ["idempotent"],
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    endpointContext: "resource to remove",
    exampleHeaders: { Accept: "application/json" },
    headerNotes: {
      Accept: "Requested format, though the response body is typically empty",
    },
    responseNote:
      "JSONPlaceholder returns {} with 200 OK. Many real APIs return 204 No Content with no body at all. Either way, an empty body is normal and means success.",
  },
];
