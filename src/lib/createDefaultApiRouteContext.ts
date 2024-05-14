import { headers } from "next/headers";

export const createDefaultApiRouteContext = (
  request: Request,
): Record<string, unknown> => {
  return {
    route: new URL(request.url).pathname,
    method: request.method,
    headers: headers(),
  };
};
