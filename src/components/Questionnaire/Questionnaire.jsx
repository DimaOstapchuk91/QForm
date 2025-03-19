import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postAnswer } from '../../redux/questionnaire/operations.js';

const Questionnaire = ({ dataItem }) => {
  const { name, description, questions, completions, _id } = dataItem;

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      answers: questions.reduce((acc, question) => {
        acc[question._id] = question.questionType === 'checkbox' ? [] : '';
        return acc;
      }, {}),
    },
  });

  const onSubmit = data => {
    const { answers } = data;
    dispatch(postAnswer({ questionnaireId: _id, answers }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>Completions: {completions}</p>

      <ul>
        {questions.map(question => (
          <li key={question._id}>
            <p>{question.questionText}</p>

            {/* Текстове поле */}
            {question.questionType === 'text' && (
              <Controller
                name={`answers.${question._id}`}
                control={control}
                render={({ field }) => <textarea {...field} rows='3' />}
              />
            )}

            {/* Радіокнопки */}
            {question.questionType === 'radio' &&
              question.options.map((option, index) => (
                <label key={index}>
                  <Controller
                    name={`answers.${question._id}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type='radio'
                        value={option}
                        checked={field.value === option}
                      />
                    )}
                  />
                  {option}
                </label>
              ))}

            {/* Чекбокси */}
            {question.questionType === 'checkbox' &&
              question.options.map((option, index) => (
                <label key={index}>
                  <Controller
                    name={`answers.${question._id}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type='checkbox'
                        value={option}
                        checked={field.value?.includes(option)}
                        onChange={e => {
                          let newValue = [...field.value];
                          if (e.target.checked) {
                            newValue.push(option);
                          } else {
                            newValue = newValue.filter(val => val !== option);
                          }
                          field.onChange(newValue);
                        }}
                      />
                    )}
                  />
                  {option}
                </label>
              ))}

            {/* Відображення помилок */}
            {errors.responses?.[question._id] && (
              <p style={{ color: 'red' }}>
                {errors.responses[question._id].message}
              </p>
            )}
          </li>
        ))}
      </ul>

      <button type='submit'>Відправити</button>
    </form>
  );
};

export default Questionnaire;
