import CatalogList from '../../components/CatalogList/CatalogList.jsx';
import { NavLink } from 'react-router-dom';
import s from './CatalogQPage.module.css';

const CatalogQPage = () => {
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
