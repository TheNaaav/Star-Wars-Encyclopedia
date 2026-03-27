import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import ResourceGrid from "../../components/ResourceGrid/ResourceGrid";
import { useUrlState } from "../../hooks/useUrlState";
import { getList } from "../../services/swapi.service";
import { extractIdFromUrl } from "../../utils/url";
import type { PaginatedResponse } from "../../types/api";
import type { Planet } from "../../types/resources";
import "./planets.scss";

const PAGE_SIZE = 10;

export default function PlanetsPage() {
  const { page, query, setPage, setQuery } = useUrlState();
  const [data, setData] = useState<PaginatedResponse<Planet> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await getList<Planet>("planets", page, query);
        if (alive) setData(res);
      } catch {
        if (alive) setError("Could not load planets.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => { alive = false; };
  }, [page, query]);

  const totalPages = useMemo(() => {
    const count = data?.total ?? 0;
    return Math.max(1, Math.ceil(count / PAGE_SIZE));
  }, [data]);

  if (loading && !data) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="No data." />;

  return (
    <div>
      <h1 className="pageTitle">Planets</h1>
      <SearchBar value={query} onChange={setQuery} />

      <p className="hint">
        {query.trim()
          ? `Showing ${data.total} results for "${query.trim()}"`
          : `Showing all ${data.total} planets`}
      </p>

      <ResourceGrid>
        {(data.data || []).map((p) => (
          <PlanetCard key={p.url} planet={p} />
        ))}
      </ResourceGrid>

      <Pagination
        page={page}
        hasPrev={Boolean(data.prev_page_url)}
        hasNext={Boolean(data.next_page_url)}
        totalPages={totalPages}
        onPrev={() => setPage(Math.max(1, page - 1))}
        onNext={() => setPage(page + 1)}
      />
    </div>
  );
}

function PlanetCard({ planet }: { planet: Planet }) {
  const id = planet.id || extractIdFromUrl(planet.url || "");

  return (
    <article className="card">
      <div className="card__header">{planet.name}</div>
      <div className="card__body">
        <div className="card__row"><span className="ico">🌦️</span><strong>Climate</strong> {planet.climate}</div>
        <div className="card__row"><span className="ico">🗺️</span><strong>Terrain</strong> {planet.terrain}</div>
        <div className="card__row"><span className="ico">🧑‍🤝‍🧑</span><strong>Residents</strong> {planet.residents_count || 0}</div>

        <Link className="card__btn" to={`/planets/${id}`}>Read more</Link>
      </div>
    </article>
  );
}
