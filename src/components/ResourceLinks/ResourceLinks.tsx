import { Link } from "react-router-dom";
import type { LinkedResource } from "../../types/resources";
import "./ResourceLinks.scss";

type Props = {
  title: string;
  items?: LinkedResource[];
  resourceKind: "films" | "people" | "planets" | "species" | "starships" | "vehicles";
  icon?: string;
};

export default function ResourceLinks({ title, items = [], resourceKind, icon }: Props) {
  const sorted = [...items].sort((a, b) => {
    const aName = a.name || a.title || "";
    const bName = b.name || b.title || "";
    return aName.localeCompare(bName);
  });

  return (
    <section className="links">
      <h3 className="links__title">{title}</h3>

      <div className="links__box">
        {sorted.map((item) => (
          <div className="links__row" key={item.id}>
            <span className="links__icon">{icon ?? "🔗"}</span>
            <Link to={`/${resourceKind}/${item.id}`}>
              {item.name || item.title || "Unknown"} »
            </Link>
          </div>
        ))}

        {sorted.length === 0 && <div className="links__row links__muted">No links</div>}
      </div>
    </section>
  );
}
