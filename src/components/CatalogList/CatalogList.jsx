import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnaires } from '../../redux/questionnaire/operations.js';
import {
  selectQuestionnaires,
  selectIsPagination,
} from '../../redux/questionnaire/selectors.js';
import CatalogItem from '../CatalogItem/CatalogItem.jsx';
import PaginationControls from '../PaginationControls/PaginationControls.jsx';
import s from './CatalogList.module.css';

const CatalogList = () => {
  const dispatch = useDispatch();
  const catalogData = useSelector(selectQuestionnaires);
  const { page, perPage } = useSelector(selectIsPagination);

  useEffect(() => {
    dispatch(getQuestionnaires({ page, perPage }));
  }, [dispatch, page, perPage]);

  return (
    <div>
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
