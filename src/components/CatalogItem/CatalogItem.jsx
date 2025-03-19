import { useNavigate } from 'react-router-dom';

const CatalogItem = ({ dataItem }) => {
  const navigate = useNavigate();

  const { name, description, _id, completions } = dataItem;

  return (
    <li
      onClick={() => navigate(`/questionnaire/${_id}`, { state: { dataItem } })}
      style={{ cursor: 'pointer' }}
    >
      <p>{name}</p>
      <p>{description}</p>
      <p>{completions}</p>
    </li>
  );
};
export default CatalogItem;
