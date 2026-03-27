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
import type { Starship } from "../../types/resources";

const PAGE_SIZE = 10;

export default function StarshipsPage() {
  const { page, query, setPage, setQuery } = useUrlState();
  const [data, setData] = useState<PaginatedResponse<Starship> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await getList<Starship>("starships", page, query);
        if (alive) setData(res);
      } catch {
        if (alive) setError("Could not load starships.");
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
      <h1 className="pageTitle">Starships</h1>
      <SearchBar value={query} onChange={setQuery} />

      <p className="hint">
        {query.trim()
          ? `Showing ${data.total} results for "${query.trim()}"`
          : `Showing all ${data.total} starships`}
      </p>

      <ResourceGrid>
        {(data.data || []).map((s) => (
          <StarshipCard key={s.url} starship={s} />
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

function StarshipCard({ starship }: { starship: Starship }) {
  const id = starship.id || extractIdFromUrl(starship.url || "");

  return (
    <article className="card">
      <div className="card__header">{starship.name}</div>
      <div className="card__body">
        <div className="card__row">
          <span className="ico">🚀</span>
          <strong>Model</strong> {starship.model}
        </div>
        <div className="card__row">
          <span className="ico">🏭</span>
          <strong>Manufacturer</strong> {starship.manufacturer}
        </div>
        <div className="card__row">
          <span className="ico">📏</span>
          <strong>Length</strong> {starship.length} m
        </div>

        <Link className="card__btn" to={`/starships/${id}`}>
          Read more
        </Link>
      </div>
    </article>
  );
}
