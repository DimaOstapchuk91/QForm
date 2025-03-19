import { useEffect } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import s from './OptionsField.module.css';

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
    <ul className={s.optionList}>
      {fields.map((option, optIndex) => (
        <li className={s.question} key={option.id}>
          <label className={s.label}>
            <p className={s.inputName}>Options:</p>
            <Controller
              name={`questions.${questionIndex}.options.${optIndex}`}
              control={control}
              render={({ field }) => (
                <input
                  className={s.inputForm}
                  {...field}
                  placeholder={`Option ${optIndex + 1}`}
                />
              )}
            />
          </label>
          <button
            className={s.questionBtnDell}
            type='button'
            onClick={() => remove(optIndex)}
          >
            Remove Option
          </button>
        </li>
      ))}
      <button
        className={s.questionBtn}
        type='button'
        onClick={() => append('')}
      >
        Add Option
      </button>
    </ul>
  );
};
export default OptionsField;
