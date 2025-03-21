import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnaires } from '../../redux/questionnaire/operations.js';
import {
  selectQuestionnaires,
  selectIsPagination,
} from '../../redux/questionnaire/selectors.js';
import CatalogItem from '../CatalogItem/CatalogItem.jsx';
import PaginationControls from '../PaginationControls/PaginationControls.jsx';
import s from './CatalogList.module.css';

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'totalQueston', label: 'Total Questions' },
  { value: 'completions', label: 'Completions' },
  { value: 'createdAt', label: 'Created At' },
  { value: 'updatedAt', label: 'Updated At' },
];

const CatalogList = () => {
  const dispatch = useDispatch();
  const catalogData = useSelector(selectQuestionnaires);
  const { page, perPage } = useSelector(selectIsPagination);

  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(getQuestionnaires({ page, perPage, sortBy, sortOrder }));
  }, [dispatch, page, perPage, sortBy, sortOrder]);

  return (
    <div>
      <div className={s.sortControls}>
        <label className={s.label}>
          <p>Sort by:</p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className={s.sortSelect}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={s.label}>
          <p>Order:</p>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className={s.sortSelect}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </label>
      </div>

      <ul className={s.catalogList}>
        {catalogData?.map(item => (
          <CatalogItem key={item._id} dataItem={item} />
        ))}
      </ul>

      <PaginationControls />
    </div>
  );
};

export default CatalogList;
