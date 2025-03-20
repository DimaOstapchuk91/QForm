import { useEffect } from 'react';
import { getQuestionnaires } from '../../redux/questionnaire/operations.js';
import { useDispatch } from 'react-redux';
import s from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = '';
    const page = 1;
    dispatch(getQuestionnaires({ params, page }));
  }, [dispatch]);

  return (
    <section className='container'>
      <div className={s.pageWrap}>
        <div className={s.homeWrap}>
          <h1 className={s.homeTitle}>
            QForm - a service for creating and completing questionnaires
          </h1>
          <p className={s.homeText}>
            Please note that our server is hosted on Render&apos;s free tier, so
            it may take up to 1 minute to fully load. Thank you for your
            patience!
          </p>
        </div>
      </div>
    </section>
  );
};
export default HomePage;
