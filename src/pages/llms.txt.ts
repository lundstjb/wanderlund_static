import type { APIRoute } from "astro";
import { properties } from "../data/properties";
import { llmsSummary } from "../lib/llms";

/** Plain-text site summary for AI agents, generated from property data. */
export const GET: APIRoute = () =>
  new Response(llmsSummary(properties), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
