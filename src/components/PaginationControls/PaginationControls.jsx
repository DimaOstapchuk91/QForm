import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/questionnaire/slice.js';
import s from './PaginationControls.module.css';
import { selectIsPagination } from '../../redux/questionnaire/selectors.js';

const PaginationControls = () => {
  const dispatch = useDispatch();
  const { page, totalPages, hasNextPage, hasPreviousPage } =
    useSelector(selectIsPagination);

  const handleNextPage = () => {
    if (hasNextPage) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePrevPage = () => {
    if (hasPreviousPage) {
      dispatch(setPage(page - 1));
    }
  };

  const handlePageClick = newPage => {
    if (newPage !== page) {
      dispatch(setPage(newPage));
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={s.pagination}>
      <button
        className={s.paginationBtn}
        onClick={handlePrevPage}
        disabled={!hasPreviousPage}
      >
        Prev
      </button>

      <ul className={s.paginationList}>
        {getPageNumbers().map((pageNum, index) => (
          <li key={index}>
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={pageNum === page ? s.active : s.disabled}
            >
              {pageNum}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={s.paginationBtn}
        onClick={handleNextPage}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
