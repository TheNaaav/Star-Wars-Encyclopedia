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
import type { Species, LinkedResource } from "../../types/resources";

const PAGE_SIZE = 10;

export default function SpeciesPage() {
  const { page, query, setPage, setQuery } = useUrlState();
  const [data, setData] = useState<PaginatedResponse<Species> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await getList<Species>("species", page, query);
        if (alive) setData(res);
      } catch {
        if (alive) setError("Could not load species.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
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
      <h1 className="pageTitle">Species</h1>
      <SearchBar value={query} onChange={setQuery} />

      <p className="hint">
        {query.trim()
          ? `Showing ${data.total} results for "${query.trim()}"`
          : `Showing all ${data.total} species`}
      </p>

      <ResourceGrid>
        {(data.data || []).map((s) => (
          <SpeciesCard key={s.url || s.id} species={s} />
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

function SpeciesCard({ species }: { species: Species }) {
  const homeworldName = typeof species.homeworld === "string" 
    ? species.homeworld 
    : (species.homeworld as LinkedResource)?.name || "Unknown";

  const id = species.id || extractIdFromUrl(species.url || "");

  return (
    <article className="card">
      <div className="card__header">{species.name}</div>
      <div className="card__body">
        <div className="card__row">
          <span className="ico">🧬</span>
          <strong>Classification</strong> {species.classification}
        </div>
        <div className="card__row">
          <span className="ico">🪐</span>
          <strong>Homeworld</strong> {homeworldName}
        </div>
        <div className="card__row">
          <span className="ico">🧑‍🤝‍🧑</span>
          <strong>People</strong> {species.people_count || 0}
        </div>

        <Link className="card__btn" to={`/species/${id}`}>
          Read more
        </Link>
      </div>
    </article>
  );
}
