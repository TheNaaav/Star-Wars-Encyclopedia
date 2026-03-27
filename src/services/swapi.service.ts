import { httpGet } from "./http";
import type { PaginatedResponse } from "../types/api";
import type { ResourceKind } from "../types/resources";

const BASE = "https://swapi.thehiveresistance.com/api";

export function buildListUrl(kind: ResourceKind, page: number, query: string) {
  const url = new URL(`${BASE}/${kind}/`);
  if (page > 1) url.searchParams.set("page", String(page));
  if (query.trim().length > 0) url.searchParams.set("search", query.trim());
  return url.toString();
}

export function getList<T>(kind: ResourceKind, page: number, query: string) {
  return httpGet<PaginatedResponse<T>>(buildListUrl(kind, page, query));
}

export function getByUrl<T>(url: string) {
  return httpGet<T>(url);
}
