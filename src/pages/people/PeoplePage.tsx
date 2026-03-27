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
import type { Person } from "../../types/resources";
import "./people.scss";

const PAGE_SIZE = 10;

export default function PeoplePage() {
  const { page, query, setPage, setQuery } = useUrlState();
  const [data, setData] = useState<PaginatedResponse<Person> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await getList<Person>("people", page, query);
        if (alive) setData(res);
      } catch {
        if (alive) setError("Could not load people.");
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
      <h1 className="pageTitle">People</h1>

      <SearchBar value={query} onChange={setQuery} />

      <p className="hint">
        {query.trim()
          ? `Showing ${data.total} results for "${query.trim()}"`
          : `Showing all ${data.total} people`}
      </p>

      <ResourceGrid>
        {(data.data || []).map((p) => (
          <PersonCard key={p.url || p.id} person={p} />
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

function PersonCard({ person }: { person: Person }) {
  const homeworld = typeof person.homeworld === "object" ? person.homeworld : null;
  const homeworldName = homeworld?.name || "Unknown";

  const id = person.id || extractIdFromUrl(person.url || "");

return (
  <article className="card">
    <div className="card__header">{person.name}</div>

    <div className="card__body">
      <div className="card__row">
        <span className="ico">👶</span>
        <strong>Born</strong>
        <span className="card__value">{person.birth_year}</span>
      </div>

      <div className="card__row">
        <span className="ico">🪐</span>
        <strong>Homeworld</strong>
        <span className="card__value">
          {homeworld?.id ? (
            <Link to={`/planets/${homeworld.id}`}>{homeworldName}</Link>
          ) : (
            homeworldName
          )}
        </span>
      </div>

      <div className="card__row">
        <span className="ico">🎬</span>
        <strong>In</strong>
        <span className="card__value">
          {person.films_count || 0} {person.films_count === 1 ? "film" : "films"}
        </span>
      </div>

      <Link className="card__btn" to={`/people/${id}`}>
        Read more
      </Link>
    </div>
  </article>
);

}
