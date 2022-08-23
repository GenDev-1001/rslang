import './Pagination.scss';

export const Pagination = () => {
  return (
    <div className="pagination">
      <ul className="pagination-ul">
        <li className="pagination-first">
          <button className="pagination-first__btn pagination-btn">&#60;&#60;</button>
        </li>
        <li className="pagination-prev">
          <button className="pagination-prev__btn pagination-btn">&#60;</button>
        </li>
        <li className="pagination-page">
          <button className="pagination-page__btn pagination-btn">1</button>
        </li>
        <li className="pagination-next">
          <button className="pagination-next__btn pagination-btn">&#62;</button>
        </li>
        <li className="pagination-last">
          <button className="pagination-last__btn pagination-btn">&#62;&#62;</button>
        </li>
      </ul>
    </div>
  );
};
