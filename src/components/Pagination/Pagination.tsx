import "./Pagination.scss";

type Props = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pagination({ page, hasPrev, hasNext, totalPages, onPrev, onNext }: Props) {
  return (
    <div className="pager">
      <button className="pager__btn" disabled={!hasPrev} onClick={onPrev}>
        Previous Page
      </button>

      <div className="pager__info">
        Page {page}/{totalPages}
      </div>

      <button className="pager__btn pager__btn--primary" disabled={!hasNext} onClick={onNext}>
        Next Page
      </button>
    </div>
  );
}
