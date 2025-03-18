import { useEffect } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';

const OptionsField = ({ control, questionIndex, questionTypes }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });
  useEffect(() => {
    if (
      (questionTypes === 'radio' || questionTypes === 'checkbox') &&
      fields.length === 0
    ) {
      append('');
    }
  }, [questionTypes, fields.length, append]);

  return (
    <ul>
      <label>Options:</label>
      {fields.map((option, optIndex) => (
        <li key={option.id}>
          <Controller
            name={`questions.${questionIndex}.options.${optIndex}`}
            control={control}
            render={({ field }) => (
              <input {...field} placeholder={`Option ${optIndex + 1}`} />
            )}
          />
          <button type='button' onClick={() => remove(optIndex)}>
            Remove Option
          </button>
        </li>
      ))}
      <button type='button' onClick={() => append('')}>
        Add Option
      </button>
    </ul>
  );
};
export default OptionsField;
