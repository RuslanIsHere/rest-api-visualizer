import { HttpMethod } from "@/types/method";

// Full class names (not built dynamically) so Tailwind can detect them.
export const METHOD_STYLES: Record<
  HttpMethod,
  { text: string; dot: string; trail: string; active: string; hover: string }
> = {
  GET: {
    text: "text-green-500",
    dot: "bg-green-500",
    trail: "bg-green-500/40",
    active: "text-green-400 bg-green-500/10 border-green-500/30",
    hover: "hover:text-green-400/70",
  },
  POST: {
    text: "text-amber-500",
    dot: "bg-amber-500",
    trail: "bg-amber-500/40",
    active: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    hover: "hover:text-amber-400/70",
  },
  PUT: {
    text: "text-blue-500",
    dot: "bg-blue-500",
    trail: "bg-blue-500/40",
    active: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    hover: "hover:text-blue-400/70",
  },
  PATCH: {
    text: "text-purple-500",
    dot: "bg-purple-500",
    trail: "bg-purple-500/40",
    active: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    hover: "hover:text-purple-400/70",
  },
  DELETE: {
    text: "text-red-500",
    dot: "bg-red-500",
    trail: "bg-red-500/40",
    active: "text-red-400 bg-red-500/10 border-red-500/30",
    hover: "hover:text-red-400/70",
  },
};
