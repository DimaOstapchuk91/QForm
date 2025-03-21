import { useNavigate, useParams } from 'react-router-dom';
import Questionnaire from '../../components/Questionnaire/Questionnaire.jsx';
import s from './FillQuestionnaire.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectIsError,
  selectOneQuestionnaire,
} from '../../redux/questionnaire/selectors.js';
import { getQuestionnairesById } from '../../redux/questionnaire/operations.js';

const FillQuestionnaire = () => {
  const { id } = useParams();
  const isError = useSelector(selectIsError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getQuestionnairesById(id));
    };
    fetchData();
  }, [dispatch, id]);

  const dataItem = useSelector(selectOneQuestionnaire);

  useEffect(() => {
    if (isError) {
      navigate('*');
    }
  }, [isError, navigate]);

  return (
    <section className='container'>
      <div className={s.pageWrap}>
        {dataItem && <Questionnaire dataItem={dataItem} />}
      </div>
    </section>
  );
};
export default FillQuestionnaire;
