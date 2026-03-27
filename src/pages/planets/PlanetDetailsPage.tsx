import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import ResourceLinks from "../../components/ResourceLinks/ResourceLinks";
import { getByUrl } from "../../services/swapi.service";
import type { Planet, LinkedResource } from "../../types/resources";
import "./planets.scss";

const BASE = "https://swapi.thehiveresistance.com/api";

export default function PlanetDetailsPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const planet = await getByUrl<Planet>(`${BASE}/planets/${id}/`);
        if (alive) setData(planet);
      } catch {
        if (alive) setError("Could not load planet.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => { alive = false; };
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!data) return <ErrorState message="No data." />;

  return (
    <div className="details">
      <div className="details__card">
        <div className="details__header">{data.name}</div>

        <h3 className="sectionTitle">Attributes</h3>
        <div className="kv">
          <div className="kv__row"><div className="kv__key">Climate</div><div className="kv__val">{data.climate}</div></div>
          <div className="kv__row"><div className="kv__key">Terrain</div><div className="kv__val">{data.terrain}</div></div>
          <div className="kv__row"><div className="kv__key">Population</div><div className="kv__val">{data.population}</div></div>
          <div className="kv__row"><div className="kv__key">Diameter</div><div className="kv__val">{data.diameter}</div></div>
          <div className="kv__row"><div className="kv__key">Gravity</div><div className="kv__val">{data.gravity}</div></div>
          <div className="kv__row"><div className="kv__key">Surface water</div><div className="kv__val">{data.surface_water}</div></div>
        </div>

        <h3 className="sectionTitle">Links</h3>
        <ResourceLinks title="Residents" items={data.residents as LinkedResource[]} resourceKind="people" icon="🧑‍🤝‍🧑" />
        <ResourceLinks title="Films" items={data.films as LinkedResource[]} resourceKind="films" icon="🎬" />

        <button className="backBtn" onClick={() => nav(-1)}>« Back</button>
      </div>
    </div>
  );
}
