import type { ApiError } from "../types/api";

const TIMEOUT_MS = 15000;

export async function httpGet<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      const err: ApiError = { message: "Request failed", status: res.status };
      throw err;
    }

    return (await res.json()) as T;
  } catch (e) {
    if (typeof e === "object" && e && "message" in e) throw e;
    throw { message: "Network error" } satisfies ApiError;
  } finally {
    clearTimeout(id);
  }
}
