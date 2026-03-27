import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import ResourceLinks from "../../components/ResourceLinks/ResourceLinks";
import { getByUrl } from "../../services/swapi.service";
import type { Person, LinkedResource } from "../../types/resources";
import "./people.scss";

const BASE = "https://swapi.thehiveresistance.com/api";

export default function PersonDetailsPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const person = await getByUrl<Person>(`${BASE}/people/${id}/`);
        if (alive) setData(person);
      } catch {
        if (alive) setError("Could not load person.");
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

  const homeworldName = typeof data.homeworld === "string" ? data.homeworld : (data.homeworld as LinkedResource)?.name || "Unknown";

  return (
    <div className="details">
      <div className="details__card">
        <div className="details__header">{data.name}</div>

        <h3 className="sectionTitle">Attributes</h3>
        <div className="kv">
          <div className="kv__row"><div className="kv__key">Birth year</div><div className="kv__val">{data.birth_year}</div></div>
          <div className="kv__row"><div className="kv__key">Eye color</div><div className="kv__val"><span className="pill">{data.eye_color}</span></div></div>
          <div className="kv__row"><div className="kv__key">Hair color</div><div className="kv__val"><span className="pill">{data.hair_color}</span></div></div>
          <div className="kv__row"><div className="kv__key">Height</div><div className="kv__val">{data.height} cm</div></div>
          <div className="kv__row"><div className="kv__key">Mass</div><div className="kv__val">{data.mass} kg</div></div>
          <div className="kv__row"><div className="kv__key">Skin color</div><div className="kv__val"><span className="pill">{data.skin_color}</span></div></div>
        </div>

        <h3 className="sectionTitle">Links</h3>

        <div className="singleLink">
          <div className="singleLink__key">Homeworld</div>
          <div className="singleLink__val">
            <span className="ico">🪐</span> {homeworldName} »
          </div>
        </div>

        <ResourceLinks title="Films" items={data.films as LinkedResource[]} resourceKind="films" icon="🎬" />
        <ResourceLinks title="Species" items={data.species as LinkedResource[]} resourceKind="species" icon="🧬" />
        <ResourceLinks title="Starships" items={data.starships as LinkedResource[]} resourceKind="starships" icon="🚀" />
        <ResourceLinks title="Vehicles" items={data.vehicles as LinkedResource[]} resourceKind="vehicles" icon="🚗" />

        <button className="backBtn" onClick={() => nav(-1)}>« Back</button>
      </div>
    </div>
  );
}
