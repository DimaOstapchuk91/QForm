import { useLocation } from 'react-router-dom';
import Questionnaire from '../../components/Questionnaire/Questionnaire.jsx';

const FillQuestionnaire = () => {
  const location = useLocation();
  const dataItem = location.state?.dataItem;

  if (!dataItem) return <p>Sorry, an error occurred.</p>;

  return (
    <section className='container'>
      <Questionnaire dataItem={dataItem} />
    </section>
  );
};
export default FillQuestionnaire;
