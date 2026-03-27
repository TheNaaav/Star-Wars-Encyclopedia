import type { ResourceKind } from "../types/resources";

export function extractIdFromUrl(url: string): string {
  // ex: https://.../people/13/ => "13"
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function extractKindFromUrl(url: string): ResourceKind {
  // ex: .../api/people/13/
  const parts = url.split("/").filter(Boolean);
  const apiIndex = parts.findIndex((p) => p === "api");
  const kind = parts[apiIndex + 1] as ResourceKind;
  return kind;
}

export function toAppPathFromSwapiUrl(url: string): string {
  const kind = extractKindFromUrl(url);
  const id = extractIdFromUrl(url);
  return `/${kind}/${id}`;
}
