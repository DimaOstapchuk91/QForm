import { NavLink } from 'react-router-dom';
import s from './NotFoundPage.module.css';
import notFoundImage from '../../assets/img/404.png';

const NotFoundPage = () => {
  return (
    <section className='container'>
      <div className={s.notWrap}>
        <img className={s.notImg} src={notFoundImage} alt='NOT FOUND' />
        <div className={s.infoWrap}>
          <h2 className={s.notTitle}>
            OOPS!
            <br /> ERROR 404{' '}
          </h2>
          <p className={s.notText}>PAGE NOT FOUND</p>
          <NavLink className={s.notLink} to='/'>
            Back Home
          </NavLink>
        </div>
      </div>
    </section>
  );
};
export default NotFoundPage;
