import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { postQuestionnaire } from '../../redux/questionnaire/operations.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { questionnaireCreateSchema } from '../../utils/validations.js';
import { useDispatch } from 'react-redux';
import s from './CreateQForm.module.css';
import OptionsField from '../OptionsField/OptionsField.jsx';

const CreateQForm = () => {
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

  const onSubmit = data => {
    console.log('Form Data: ', data);
    dispatch(postQuestionnaire(data));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.labelForm} htmlFor='name'>
        Questionnaire Name:
        <Controller
          name='name'
          control={control}
          render={({ field }) => <input className={s.inputForm} {...field} />}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label className={s.labelForm} htmlFor='description'>
        Description:
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <textarea className={s.inputForm} {...field} />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </label>

      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <label>
              Question {index + 1}
              <input {...register(`questions[${index}].questionText`)} />
            </label>
            <label>
              <Controller
                name={`questions[${index}].questionType`}
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value='text'>Text</option>
                    <option value='radio'>Radio</option>
                    <option value='checkbox'>Checkbox</option>
                  </select>
                )}
              />
            </label>
            <button type='button' onClick={() => remove(index)}>
              Delete
            </button>

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
      </ul>

      <button
        type='button'
        onClick={() => append({ questionText: '', questionType: 'text' })}
      >
        Add Another Question
      </button>
      <button type='submit'>Create Questionnaire</button>
    </form>
  );
};

export default CreateQForm;
