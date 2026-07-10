import { MethodConfig } from "@/types/method";

// TODO: заполнить реальными примерами (endpoint, headers, body) для JSONPlaceholder или другого open API
export const methodConfigs: MethodConfig[] = [
  {
    method: "GET",
    description: "Retrieve a resource without modifying it.",
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    exampleHeaders: { Accept: "application/json" },
  },
  {
    method: "POST",
    description: "Create a new resource.",
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts",
    exampleHeaders: { "Content-Type": "application/json" },
    exampleBody: { title: "foo", body: "bar", userId: 1 },
  },
  {
    method: "PUT",
    description: "Replace a resource entirely.",
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    exampleHeaders: { "Content-Type": "application/json" },
    exampleBody: { id: 1, title: "foo", body: "bar", userId: 1 },
  },
  {
    method: "PATCH",
    description: "Partially update a resource.",
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    exampleHeaders: { "Content-Type": "application/json" },
    exampleBody: { title: "updated title" },
  },
  {
    method: "DELETE",
    description: "Remove a resource.",
    exampleEndpoint: "https://jsonplaceholder.typicode.com/posts/1",
    exampleHeaders: { Accept: "application/json" },
  },
];
