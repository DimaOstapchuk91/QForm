import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { postQuestionnaire } from '../../redux/questionnaire/operations.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { questionnaireCreateSchema } from '../../utils/validations.js';
import { useDispatch } from 'react-redux';
import s from './CreateQForm.module.css';
import OptionsField from '../OptionsField/OptionsField.jsx';
import { useNavigate } from 'react-router-dom';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import SortableItem from '../SortableItem/SortableItem.jsx';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const CreateQForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    setValue,
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

  const onSubmit = credentials => {
    dispatch(postQuestionnaire({ credentials, navigate }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex(field => field.id === active.id);
    const newIndex = fields.findIndex(field => field.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newFields = arrayMove(fields, oldIndex, newIndex);
      setValue('questions', newFields);
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.formTitle}>Create Questionnaire</h2>
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

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          <ul className={s.questionList}>
            {fields.map((item, index) => (
              <SortableItem id={item.id} key={item.id}>
                <li className={s.questionWrap} key={item.id}>
                  <div className={s.question}>
                    <label className={s.label}>
                      <p className={s.inputName}>Question {index + 1}</p>
                      <input
                        key={item.id}
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
              </SortableItem>
            ))}
            <button
              className={s.questionBtn}
              type='button'
              onClick={() => append({ questionText: '', questionType: 'text' })}
            >
              Add Another Question
            </button>
          </ul>
        </SortableContext>
      </DndContext>

      <div className={s.submitWrap}>
        <button className={s.submitBtn} type='submit'>
          Submit Questionnaire
        </button>
      </div>
    </form>
  );
};

export default CreateQForm;
