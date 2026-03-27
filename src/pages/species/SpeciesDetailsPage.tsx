import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ErrorState from "../../components/ErrorState/ErrorState";
import ResourceLinks from "../../components/ResourceLinks/ResourceLinks";
import { getByUrl } from "../../services/swapi.service";
import type { Species, LinkedResource } from "../../types/resources";

const BASE = "https://swapi.thehiveresistance.com/api";

export default function SpeciesDetailsPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Species | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const species = await getByUrl<Species>(`${BASE}/species/${id}/`);
        if (alive) setData(species);
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
          <div className="kv__row">
            <div className="kv__key">Classification</div>
            <div className="kv__val">{data.classification}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Designation</div>
            <div className="kv__val">{data.designation}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Average Height</div>
            <div className="kv__val">{data.average_height} cm</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Average Lifespan</div>
            <div className="kv__val">{data.average_lifespan}</div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Eye Colors</div>
            <div className="kv__val">
              {data.eye_colors.split(", ").map((c) => (
                <span key={c} className="pill">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Hair Colors</div>
            <div className="kv__val">
              {data.hair_colors.split(", ").map((c) => (
                <span key={c} className="pill">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Skin Colors</div>
            <div className="kv__val">
              {data.skin_colors.split(", ").map((c) => (
                <span key={c} className="pill">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="kv__row">
            <div className="kv__key">Language</div>
            <div className="kv__val">{data.language}</div>
          </div>
        </div>

        <h3 className="sectionTitle">Links</h3>

        <div className="singleLink">
          <div className="singleLink__key">Homeworld</div>
          <div className="singleLink__val">
            <span className="ico">🪐</span> {homeworldName}
          </div>
        </div>

        <ResourceLinks title="People" items={data.people as LinkedResource[]} resourceKind="people" icon="🧑‍🤝‍🧑" />
        <ResourceLinks title="Films" items={data.films as LinkedResource[]} resourceKind="films" icon="🎬" />

        <button className="backBtn" onClick={() => nav(-1)}>
          « Back
        </button>
      </div>
    </div>
  );
}
