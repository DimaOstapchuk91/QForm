import { useDispatch } from 'react-redux';
import s from './DeleteQuestionnaireModal.module.css';
// import Loader from '../../Loader/Loader.jsx';
import { deleteQuestionnaires } from '../../../redux/questionnaire/operations.js';

const DeleteQuestionnaireModal = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(deleteQuestionnaires(id));
    onClose();
  };

  return (
    <div className={s.modalWrapp}>
      <div className={s.modalContent}>
        <h2 className={s.titleDelete}>Delete Questionnaire</h2>

        <p className={s.textDelete}>Delete Questionnaire?</p>
        <div className={s.wrappBtn}>
          <button type='button' className={s.btnDelete} onClick={handleDelete}>
            Delete
          </button>
          <button type='button' className={s.btnCancel} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteQuestionnaireModal;
