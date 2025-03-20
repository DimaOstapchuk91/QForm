import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnaires } from '../../redux/questionnaire/operations.js';
import { selectQuestionnaires } from '../../redux/questionnaire/selectors.js';
import CatalogItem from '../CatalogItem/CatalogItem.jsx';
import s from './CatalogList.module.css';

const CatalogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionnaires());
  }, [dispatch]);

  const catalogData = useSelector(selectQuestionnaires);

  return (
    <ul className={s.catalogList}>
      {catalogData.map(item => (
        <CatalogItem key={item._id} dataItem={item} />
      ))}
    </ul>
  );
};
export default CatalogList;
