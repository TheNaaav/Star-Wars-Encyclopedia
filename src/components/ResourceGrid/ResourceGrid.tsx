import "./ResourceGrid.scss";

type Props = { children: React.ReactNode };

export default function ResourceGrid({ children }: Props) {
  return <div className="grid">{children}</div>;
}
