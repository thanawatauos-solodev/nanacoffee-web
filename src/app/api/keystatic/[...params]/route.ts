import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

/**
 * Admin API: GitHub sign-in and saving content (or, in `npm run dev`, reading and writing local files).
 *
 * Built on first request rather than at import: in GitHub mode Keystatic throws when its
 * KEYSTATIC_* env vars are missing, and that must not break the public site's build before
 * the admin has been set up.
 */
let handlers: ReturnType<typeof makeRouteHandler> | undefined;
const getHandlers = () => (handlers ??= makeRouteHandler({ config }));

export function GET(request: Request) {
  return getHandlers().GET(request);
}

export function POST(request: Request) {
  return getHandlers().POST(request);
}
