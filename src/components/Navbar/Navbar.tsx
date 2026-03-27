import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <NavLink to="/">
          <span className="nav__logo">🤖</span>
          <span>Star Wars Encyclopedia</span>
          </NavLink>
        </div>
        <nav className="nav__links">
          <NavLink to="/films">Films</NavLink>
          <NavLink to="/people">People</NavLink>
          <NavLink to="/planets">Planets</NavLink>
          <NavLink to="/species">Species</NavLink>
          <NavLink to="/starships">Starships</NavLink>
          <NavLink to="/vehicles">Vehicles</NavLink>
        </nav>
      </div>
    </header>
  );
}
