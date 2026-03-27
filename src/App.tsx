import { useRoutes } from "react-router-dom";
import { routes } from "./app/routes";
import Navbar from "../src/components/Navbar/Navbar";

export default function App() {
  const element = useRoutes(routes);

  return (
    <>
      <Navbar />
      <main className="container">{element}</main>
    </>
  );
}
