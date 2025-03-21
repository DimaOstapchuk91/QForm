import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { questionnaireCreateSchema } from '../../utils/validations.js';
import s from './EditForm.module.css';
import OptionsField from '../OptionsField/OptionsField.jsx';
import { useEffect } from 'react';
import { patchQuestionnaire } from '../../redux/questionnaire/operations.js';

const EditForm = ({ dataItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id, name, description, questions = [] } = dataItem || {};

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(questionnaireCreateSchema),
    defaultValues: {
      name: name || '',
      description: description || '',
      questions:
        questions.length > 0
          ? questions
          : [{ questionText: '', questionType: 'text' }],
    },
  });

  useEffect(() => {
    if (dataItem) {
      reset({
        name,
        description,
        questions: questions.map(q => ({
          ...q,
          options: q.questionType === 'text' ? [] : q.options || [],
        })),
      });
    }
  }, [dataItem, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const questionTypes = useWatch({
    control,
    name: 'questions',
  });

  const onSubmit = credentials => {
    dispatch(patchQuestionnaire({ id: _id, credentials, navigate }));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.formTitle}>Edit Questionnaire</h2>

      <label className={s.labelForm}>
        <p className={s.inputName}>Questionnaire Name:</p>
        <Controller
          name='name'
          control={control}
          render={({ field }) => <input className={s.inputForm} {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label className={s.labelForm}>
        <p className={s.inputName}>Description:</p>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <textarea className={s.inputForm} {...field} />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </label>

      <ul className={s.questionList}>
        {fields.map((item, index) => (
          <li className={s.questionWrap} key={item.id}>
            <div className={s.question}>
              <label className={s.label}>
                <p className={s.inputName}>Question {index + 1}</p>
                <input
                  className={s.inputForm}
                  {...register(`questions[${index}].questionText`)}
                />
              </label>

              <label>
                <Controller
                  name={`questions[${index}].questionType`}
                  control={control}
                  render={({ field }) => (
                    <select className={s.inputFormSelect} {...field}>
                      <option value='text'>Text</option>
                      <option value='radio'>Radio</option>
                      <option value='checkbox'>Checkbox</option>
                    </select>
                  )}
                />
              </label>

              <button
                className={s.questionBtnDell}
                type='button'
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>

            {(questionTypes?.[index]?.questionType === 'radio' ||
              questionTypes?.[index]?.questionType === 'checkbox') && (
              <OptionsField
                control={control}
                questionIndex={index}
                questionTypes={questionTypes?.[index]?.questionType}
              />
            )}
          </li>
        ))}
        <button
          className={s.questionBtn}
          type='button'
          onClick={() => append({ questionText: '', questionType: 'text' })}
        >
          Add Another Question
        </button>
      </ul>

      <div className={s.submitWrap}>
        <button className={s.submitBtn} type='submit'>
          Submit Questionnaire
        </button>
      </div>
    </form>
  );
};

export default EditForm;
