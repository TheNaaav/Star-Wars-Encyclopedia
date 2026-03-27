import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import ResourceLinks from "../../components/ResourceLinks/ResourceLinks";
import { getByUrl } from "../../services/swapi.service";
import type { Film } from "../../types/resources";
import "./films.scss";

const BASE = "https://swapi.thehiveresistance.com/api";

export default function FilmDetailsPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const film = await getByUrl<Film>(`${BASE}/films/${id}/`);
        if (alive) setData(film);
      } catch {
        if (alive) setError("Could not load film.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="No data." />;

  return (
    <div className="details">
      <div className="details__card">
        <div className="filmHero">
          <img className="filmHero__img" src={data.image_url || "/vite.svg"} alt={data.title} />
          <div className="filmHero__text">
            <h2 className="filmHero__title">{data.title}</h2>
            <pre className="filmHero__crawl">{data.opening_crawl}</pre>
          </div>
        </div>

        <h3 className="sectionTitle">Attributes</h3>
        <div className="kv">
          <div className="kv__row"><div className="kv__key">Episode</div><div className="kv__val">{data.episode_id}</div></div>
          <div className="kv__row"><div className="kv__key">Director</div><div className="kv__val">{data.director}</div></div>
          <div className="kv__row"><div className="kv__key">Producer</div><div className="kv__val">{data.producer}</div></div>
          <div className="kv__row"><div className="kv__key">Release Date</div><div className="kv__val">{data.release_date}</div></div>
        </div>

        <h3 className="sectionTitle">Links</h3>
        <ResourceLinks title="Characters" items={data.characters} resourceKind="people" icon="🧑‍🤝‍🧑" />
        <ResourceLinks title="Planets" items={data.planets} resourceKind="planets" icon="🪐" />
        <ResourceLinks title="Species" items={data.species} resourceKind="species" icon="🧬" />
        <ResourceLinks title="Starships" items={data.starships} resourceKind="starships" icon="🚀" />
        <ResourceLinks title="Vehicles" items={data.vehicles} resourceKind="vehicles" icon="🚗" />

        <button className="backBtn" onClick={() => nav(-1)}>« Back</button>
      </div>
    </div>
  );
}
