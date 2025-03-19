import CreateQForm from '../../components/CreateQForm/CreateQForm.jsx';
import s from './CreateQuestionnaire.module.css';

const CreateQuestionnaire = () => {
  return (
    <section className='container'>
      <div className={s.pageWrap}>
        <CreateQForm />
      </div>
    </section>
  );
};
export default CreateQuestionnaire;
