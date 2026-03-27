type Props = { message?: string };

export default function ErrorState({ message }: Props) {
  return (
    <div style={{ padding: 12, border: "1px solid #d9dee7", borderRadius: 6, background: "#fff" }}>
      <strong>Something went wrong.</strong>
      <p style={{ margin: "6px 0 0" }}>{message ?? "Try again."}</p>
    </div>
  );
}
