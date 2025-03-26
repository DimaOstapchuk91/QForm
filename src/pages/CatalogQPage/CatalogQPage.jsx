import CatalogList from '../../components/CatalogList/CatalogList.jsx';
import { NavLink } from 'react-router-dom';
import s from './CatalogQPage.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearStateQuestionareAnwers } from '../../redux/questionnaire/slice.js';

const CatalogQPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStateQuestionareAnwers());
  }, [dispatch]);
  return (
    <section className='container'>
      <div className={s.catalofWrap}>
        <div className={s.catalogHeader}>
          <h2 className={s.catalogTitle}>Questionnaire Catalog</h2>{' '}
          <NavLink className={s.catalogLink} to='/questionnaire/create'>
            Create New
          </NavLink>
        </div>
        <CatalogList />
      </div>
    </section>
  );
};
export default CatalogQPage;
