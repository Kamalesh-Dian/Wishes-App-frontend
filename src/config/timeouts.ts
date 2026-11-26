function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/**
 * Direct video synthesis request timeout (ms).
 * Configurable via VITE_VIDEO_TIMEOUT_MS in frontend/.env.
 * Default: 360000 ms (6 minutes).
 */
export const VIDEO_GENERATION_TIMEOUT_MS = parsePositiveInt(
  import.meta.env.VITE_VIDEO_TIMEOUT_MS,
  360_000
);

/**
 * Total async wish polling timeout (ms) covering image + video pipeline.
 * Configurable via VITE_GENERATION_POLL_TIMEOUT_MS in frontend/.env.
 * Default: 600000 ms (10 minutes).
 */
export const GENERATION_POLL_TIMEOUT_MS = parsePositiveInt(
  import.meta.env.VITE_GENERATION_POLL_TIMEOUT_MS,
  600_000
);

/**
 * Async wish status poll interval (ms).
 * Configurable via VITE_GENERATION_POLL_INTERVAL_MS in frontend/.env.
 * Default: 3000 ms (3 seconds).
 */
export const GENERATION_POLL_INTERVAL_MS = parsePositiveInt(
  import.meta.env.VITE_GENERATION_POLL_INTERVAL_MS,
  3_000
);
