import { useParams } from 'react-router-dom';
import EditForm from '../../components/EditForm/EditForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionnairesById } from '../../redux/questionnaire/operations.js';
import { useEffect } from 'react';
import { selectOneoneQuestionnaire } from '../../redux/questionnaire/selectors.js';

const EditQuestionnaire = () => {
  const { id } = useParams();
  const dataItem = useSelector(selectOneoneQuestionnaire);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestionnairesById(id));
  }, []);

  return (
    <section className='container'>
      <EditForm dataItem={dataItem} />
    </section>
  );
};
export default EditQuestionnaire;
