const CatalogItem = ({ dataItem }) => {
  const { name, description, questions, _id, completions } = dataItem;
  return (
    <li>
      <p>{name}</p>
      <p>{description}</p>
      <p>{completions}</p>
    </li>
  );
};
export default CatalogItem;
