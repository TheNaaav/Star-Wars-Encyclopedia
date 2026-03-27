import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";
import ResourceGrid from "../../components/ResourceGrid/ResourceGrid";
import { useUrlState } from "../../hooks/useUrlState";
import { getList } from "../../services/swapi.service";
import type { PaginatedResponse } from "../../types/api";
import type { Film } from "../../types/resources";
import "./films.scss";

const PAGE_SIZE = 10;

export default function FilmsPage() {
  const { page, query, setPage, setQuery } = useUrlState();
  const [data, setData] = useState<PaginatedResponse<Film> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const res = await getList<Film>("films", page, query);
        if (alive) setData(res);
      } catch {
        if (alive) setError("Could not load films.");
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
      <h1 className="pageTitle">Films</h1>

      <SearchBar value={query} onChange={setQuery} />

      <p className="hint">
        {query.trim()
          ? `Showing ${data.total} results for "${query.trim()}"`
          : `Showing all ${data.total} films`}
      </p>

      <ResourceGrid>
        {(data.data || []).map((f) => (
          <FilmCard key={f.url || f.id} film={f} />
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

function FilmCard({ film }: { film: Film }) {
  const id = film.id || 0;

  return (
    <article className="card card--poster">
      <img className="card__img" src={film.image_url || "/vite.svg"} alt={film.title} loading="lazy" />

      <div className="card__header">{film.title}</div>

      <div className="card__body">
        <div className="card__row">
          <span className="ico">🎬</span>
          <strong>Episode</strong> {film.episode_id}
        </div>

        <div className="card__row">
          <span className="ico">🗓️</span>
          <strong>Released</strong> {film.release_date}
        </div>

        <div className="card__row">
          <span className="ico">🧑‍🤝‍🧑</span>
          <strong>{film.characters_count || 0}</strong> {film.characters_count === 1 ? "character" : "characters"}
        </div>

        <Link className="card__btn" to={`/films/${id}`}>
          Read more
        </Link>
      </div>
    </article>
  );
}
