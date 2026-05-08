import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables.
   * These are NOT exposed to the browser.
   * Add server-only secrets here (e.g. database URLs, API keys).
   */
  server: {
    // placeholder — add server-only variables here as the project grows
    // e.g. DATABASE_URL: z.string().url(),
  },

  /**
   * Client-side environment variables.
   * Must be prefixed with NEXT_PUBLIC_ to be exposed to the browser.
   */
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },

  /**
   * Map each variable to its runtime value.
   * For client vars, Next.js statically replaces process.env.NEXT_PUBLIC_*
   * so they must be listed explicitly here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  /**
   * Skip validation in CI if SKIP_ENV_VALIDATION is set.
   * Useful for build steps that don't need all env vars available.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
