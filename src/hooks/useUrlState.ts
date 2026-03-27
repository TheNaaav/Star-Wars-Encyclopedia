import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlState() {
  const [params, setParams] = useSearchParams();

  const page = useMemo(() => {
    const raw = params.get("page");
    const n = raw ? Number(raw) : 1;
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
  }, [params]);

  const query = useMemo(() => params.get("query") ?? "", [params]);

  function setPage(nextPage: number) {
    const p = new URLSearchParams(params);
    p.set("page", String(nextPage));
    setParams(p);
  }

  function setQuery(nextQuery: string) {
    const p = new URLSearchParams(params);
    p.set("query", nextQuery);
    p.set("page", "1"); // alltid reset när man söker
    setParams(p);
  }

  return { page, query, setPage, setQuery };
}
