import { useParams } from 'react-router-dom';
import EditForm from '../../components/EditForm/EditForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnairesById } from '../../redux/questionnaire/operations.js';
import { useEffect } from 'react';
import { selectOneQuestionnaire } from '../../redux/questionnaire/selectors.js';
import s from './EditQuestionnaire.module.css';

const EditQuestionnaire = () => {
  const { id } = useParams();
  const dataItem = useSelector(selectOneQuestionnaire);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionnairesById(id));
  }, []);

  return (
    <section className='container'>
      <div className={s.pageWrap}>
        <EditForm dataItem={dataItem} />
      </div>
    </section>
  );
};
export default EditQuestionnaire;
