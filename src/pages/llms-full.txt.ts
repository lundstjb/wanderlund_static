import type { APIRoute } from "astro";
import { properties } from "../data/properties";
import { llmsFull } from "../lib/llms";

/** Full-text site content for AI agents, generated from property data. */
export const GET: APIRoute = () =>
  new Response(llmsFull(properties), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
