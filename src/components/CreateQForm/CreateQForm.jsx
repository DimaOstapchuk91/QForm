import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { postQuestionnaire } from '../../redux/questionnaire/operations.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { questionnaireCreateSchema } from '../../utils/validations.js';
import { useDispatch } from 'react-redux';
import s from './CreateQForm.module.css';
import OptionsField from '../OptionsField/OptionsField.jsx';
import { useNavigate } from 'react-router-dom';

const CreateQForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(questionnaireCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      questions: [
        { questionText: '', questionType: 'text' },
        { questionText: '', questionType: 'text' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const questionTypes = useWatch({
    control,
    name: 'questions',
  });
  console.log('test1:', questionTypes);

  const onSubmit = credentials => {
    dispatch(postQuestionnaire({ credentials, navigate }));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.formTitle}>Create Questionnaire</h2>
      <label className={s.labelForm} htmlFor='name'>
        <p className={s.inputName}>Questionnaire Name:</p>
        <Controller
          name='name'
          control={control}
          render={({ field }) => <input className={s.inputForm} {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label className={s.labelForm} htmlFor='description'>
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

export default CreateQForm;
