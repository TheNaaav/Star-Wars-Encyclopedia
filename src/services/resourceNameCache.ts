import { getByUrl } from "./swapi.service";
import type { ResourceTitle } from "../types/resources";

type NameLike = { name?: string; title?: string };

const cache = new Map<string, string>();

export async function getResourceLabel(url: string): Promise<string> {
  const cached = cache.get(url);
  if (cached) return cached;

  const data = await getByUrl<NameLike>(url);
  const label = data.title ?? data.name ?? "Unknown";
  cache.set(url, label);
  return label;
}

export async function getResourceTitles(urls: string[]): Promise<ResourceTitle[]> {
  const unique = Array.from(new Set(urls));
  const titles = await Promise.all(
    unique.map(async (u) => ({ value: u, label: await getResourceLabel(u) }))
  );
  // sort alphabetically for nicer UI
  return titles.sort((a, b) => a.label.localeCompare(b.label));
}
