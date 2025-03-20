import { NavLink } from 'react-router-dom';
import s from './CatalogItem.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal.jsx';
import DeleteQuestionnaireModal from '../Modal/DeleteQuestionnaireModal/DeleteQuestionnaireModal.jsx';

const CatalogItem = ({ dataItem }) => {
  const { name, description, _id, completions, questions } = dataItem;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsOpen = () => {
    setIsModalOpen(true);
  };

  const handleIsClose = () => {
    setIsModalOpen(false);
  };

  return (
    <li className={s.catalogItem}>
      <div className={s.itemHeaderWrap}>
        <h3 className={s.itemTitle}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <div className={s.changeItem}>
          <NavLink className={s.editBtn} to={`/questionnaire/${_id}/edit`}>
            Edit
          </NavLink>
          <button className={s.dellBtn} type='button' onClick={handleIsOpen}>
            Dell
          </button>
        </div>
      </div>
      <p className={s.itemDescription}>
        {description.charAt(0).toUpperCase() + name.slice(1)}
      </p>
      <div className={s.itemInfo}>
        <p className={s.itemInfotext}>
          Questions:{''}
          <span>{` ${questions.length}`}</span>
        </p>
        <p className={s.itemInfotext}>
          Passed:<span>{` ${completions}`}</span>
        </p>
      </div>
      <div className={s.linkWrap}>
        <NavLink className={s.startBtn} to={`/questionnaire/${_id}`}>
          Start
        </NavLink>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleIsClose}>
        <DeleteQuestionnaireModal
          isOpen={isModalOpen}
          onClose={handleIsClose}
          id={_id}
        />
      </Modal>
    </li>
  );
};
export default CatalogItem;
