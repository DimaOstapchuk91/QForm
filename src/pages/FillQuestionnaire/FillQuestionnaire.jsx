import { useNavigate, useParams } from 'react-router-dom';
import Questionnaire from '../../components/Questionnaire/Questionnaire.jsx';
import s from './FillQuestionnaire.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getQuestionnairesById } from '../../redux/questionnaire/operations.js';
import {
  selectIsError,
  selectOneoneQuestionnaire,
} from '../../redux/questionnaire/selectors.js';

const FillQuestionnaire = () => {
  const { id } = useParams();
  const isError = useSelector(selectIsError);
  const navigate = useNavigate();

  const dataItem = useSelector(selectOneoneQuestionnaire);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      navigate('*');
    }
  }, [isError, navigate]);

  useEffect(() => {
    dispatch(getQuestionnairesById(id));
  }, []);

  return (
    <section className='container'>
      <div className={s.pageWrap}>
        <Questionnaire dataItem={dataItem} />
      </div>
    </section>
  );
};
export default FillQuestionnaire;
