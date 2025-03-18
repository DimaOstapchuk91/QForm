import { useEffect } from 'react';
import { getQuestionnaires } from '../../redux/questionnaire/operations.js';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = '';
    const page = 1;
    dispatch(getQuestionnaires({ params, page }));
  }, [dispatch]);

  return <div>HomePage</div>;
};
export default HomePage;
