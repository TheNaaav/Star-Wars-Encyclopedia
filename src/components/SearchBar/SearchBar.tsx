import "./SearchBar.scss";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, placeholder, onChange }: Props) {
  return (
    <div className="search">
      <input
        className="search__input"
        value={value}
        placeholder={placeholder ?? "Enter your search query"}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="search__actions">
        <button className="search__btn search__btn--danger" type="button" title="Clear" onClick={() => onChange("")}>
          🧯
        </button>
        <button className="search__btn search__btn--ok" type="button" title="Search" onClick={() => onChange(value)}>
          ⚡
        </button>
      </div>
    </div>
  );
}
