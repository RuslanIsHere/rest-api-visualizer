# REST API Visualizer

An educational tool that visualizes how HTTP requests work, step by step —
built while learning REST API fundamentals in depth.

## Status

🚧 Work in progress. Initial project scaffold — components are stubbed with
`TODO` markers, logic not yet implemented.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Public open API for live examples ([JSONPlaceholder](https://jsonplaceholder.typicode.com))

## Structure

```
app/                       # routes, layout, global styles
components/
  MethodList/               # sidebar with HTTP methods
  RequestVisualizer/         # orchestrator + 3-step flow
    RequestPreview.tsx        # step 1: request structure
    RequestFlow.tsx           # step 2: client <-> server animation
    ResponseView.tsx          # step 3: real response
    StepIndicator.tsx
lib/
  api-methods.ts            # example configs per method
  fetch-demo.ts              # fetch wrapper
types/
  method.ts
```

## Getting started

```bash
npm install
npm run dev
```

## Roadmap

- [ ] Implement request preview (headers/body code blocks)
- [ ] Implement flow animation
- [ ] Implement real fetch + response rendering
- [ ] Add code examples in additional languages (Python, cURL)
- [ ] Optional: UI language switch (EN/FR/RU)
