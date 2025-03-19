import { useNavigate } from 'react-router-dom';
import s from './CatalogItem.module.css';

const CatalogItem = ({ dataItem }) => {
  const navigate = useNavigate();

  const { name, description, _id, completions, questions } = dataItem;

  return (
    <li
      className={s.catalogItem}
      onClick={() => navigate(`/questionnaire/${_id}`, { state: { dataItem } })}
    >
      <h3 className={s.itemTitle}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
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
    </li>
  );
};
export default CatalogItem;
