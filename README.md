# REST API Visualizer

When I was learning REST APIs, I kept confusing myself: why does PUT need all fields but PATCH only some? What actually travels over the wire? What does an empty response body from DELETE mean — is it an error?

It's a pet project — small scope, focused purpose: make HTTP methods click.

> Live requests go to [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free public REST API.

---

## What it does

Pick any HTTP method from the sidebar (GET, POST, PUT, PATCH, DELETE) and step through three stages:

**1 — Preview**
Shows the complete request: endpoint with context (`collection` vs `resource by ID`), headers with inline explanations, and a body annotated field by field. The annotations make the critical differences visible — for example, PUT marks every field as "required — omit and this field gets erased", while PATCH marks only the changed field as "only this changes — the rest stays as-is". Below it, a copyable cURL / `fetch` snippet generated from the same config lets you replay the exact request in your terminal or browser console.

**2 — Sending**
An animated visualization: a colored dot travels from CLIENT to SERVER along a method-colored trail, the server node pulses while processing, then a dot returns with the response.

**3 — Response**
The real JSON response, with status code (color-coded by range), response time in ms, the response headers the browser exposes (with a note on why CORS hides the rest), and a contextual note — including an explanation for DELETE's empty `{}` body (and the `204 No Content` you'll see in many real APIs) so it doesn't look like an error.

---

## Stack

| Tech | Role |
|---|---|
| **Next.js 15** | App Router, server/client component model |
| **React 19** | `useState`, `useEffect`, `useRef` for state and side effects |
| **TypeScript** | Typed end-to-end, including the data layer |
| **Tailwind CSS 3** | Utility-first styling |
| **JSONPlaceholder** | Public REST API for live examples |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Architecture

The app follows a **data-over-code** principle: a single `MethodConfig` object per HTTP method drives all rendering — descriptions, tags, endpoint context, header explanations, body field annotations, and the expected response note. Changing a method's content means editing one object in `lib/api-methods.ts` — no component changes needed. Adding a new method takes three typed edits: the `HttpMethod` union, a `MethodConfig` entry, and its color classes in `lib/method-styles.ts` (TypeScript flags the missing entry).

```
types/method.ts           ← shared TypeScript contracts
lib/
  api-methods.ts          ← one MethodConfig object per HTTP method
  fetch-demo.ts           ← fetch wrapper returning a typed FetchResult
  method-styles.ts        ← per-method Tailwind color classes, single source
  snippets.ts             ← cURL / fetch code generated from a MethodConfig
components/
  MethodList/             ← method selector sidebar
  RequestVisualizer/      ← 3-step state machine (preview → flow → response)
    StepIndicator         ← progress dots
    RequestPreview        ← annotated request structure + send button
    CodeSnippet           ← cURL / fetch tabs with copy button
    RequestFlow           ← CSS-animated client ↔ server visualization
    ResponseView          ← status code, body, contextual note
app/                      ← Next.js layout, Geist Mono font, global styles
```

**Two things worth noting in the implementation:**

- `RequestVisualizer` is a state machine: `step` moves strictly `preview → flow → response`. The fetch and the animation run in parallel — a cancellation token (`useRef<symbol>`) ensures that if the user switches methods while a request is in flight, the stale response is silently dropped and doesn't overwrite the new state.

- The CSS animation uses `transform: scaleX(0 → 1)` with `transform-origin: left / right` for the growing trail bars, plus custom `@keyframes` for the traveling dot. No animation library needed.

---

## Possible next steps

- Syntax highlighting for JSON bodies
- Side-by-side PUT vs PATCH comparison
