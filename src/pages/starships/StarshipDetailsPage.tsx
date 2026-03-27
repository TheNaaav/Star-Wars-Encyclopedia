import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import ResourceLinks from "../../components/ResourceLinks/ResourceLinks";
import { getByUrl } from "../../services/swapi.service";
import type { Starship, LinkedResource } from "../../types/resources";

const BASE = "https://swapi.thehiveresistance.com/api";

export default function StarshipDetailsPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Starship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const starship = await getByUrl<Starship>(`${BASE}/starships/${id}/`);
        if (alive) setData(starship);
      } catch {
        if (alive) setError("Could not load starship.");
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
        <div className="details__header">{data.name}</div>

        <h3 className="sectionTitle">Attributes</h3>
        <div className="kv">
          <div className="kv__row">
            <div className="kv__key">Model</div>
            <div className="kv__val">{data.model}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Manufacturer</div>
            <div className="kv__val">{data.manufacturer}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Cost in Credits</div>
            <div className="kv__val">{data.cost_in_credits}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Length</div>
            <div className="kv__val">{data.length} m</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Crew</div>
            <div className="kv__val">{data.crew}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Passengers</div>
            <div className="kv__val">{data.passengers}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Class</div>
            <div className="kv__val">{data.starship_class}</div>
          </div>
        </div>

        <h3 className="sectionTitle">Links</h3>
        <ResourceLinks title="Films" items={data.films as LinkedResource[]} resourceKind="films" icon="🎬" />
        <ResourceLinks title="Pilots" items={data.pilots as LinkedResource[]} resourceKind="people" icon="🧑‍✈️" />

        <button className="backBtn" onClick={() => nav(-1)}>
          « Back
        </button>
      </div>
    </div>
  );
}
