import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAnswer } from '../../redux/questionnaire/operations.js';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './Questionnaire.module.css';
import { schemaAnswer } from '../../utils/validations.js';
import { NavLink } from 'react-router-dom';

const Questionnaire = ({ dataItem }) => {
  const { name, description, questions, _id } = dataItem;
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [startTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({});

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schemaAnswer),
    mode: 'onChange',
    defaultValues: {
      answers: Object.fromEntries(
        questions?.map(question => [
          question._id,
          question.questionType === 'checkbox' ? [] : '',
        ])
      ),
    },
  });

  const onSubmit = data => {
    dispatch(postAnswer({ questionnaireId: _id, answers: data.answers }));

    setAnswers(data.answers);

    setShowResults(true);
  };

  const currentQuestion = questions[step];
  const currentAnswer = watch(`answers.${currentQuestion._id}`);

  useEffect(() => {
    if (currentQuestion.questionType === 'text' && !showResults) {
      setValue(`answers.${currentQuestion._id}`, '');
    }
  }, [step, setValue, currentQuestion, showResults]);

  const isNextDisabled =
    currentQuestion.questionType === 'checkbox'
      ? currentAnswer?.length === 0
      : !currentAnswer;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {showResults ? (
        <div>
          <h2 className={s.formTitle}>Your answers:</h2>
          <ul className={s.answerList}>
            {questions?.map((question, index) => (
              <li key={question._id}>
                <p className={s.answerQuestionText}>{`${index + 1}. ${
                  question.questionText
                }`}</p>
                <p className={s.answerText}>
                  {Array.isArray(answers[question._id])
                    ? answers[question._id].join(', ')
                    : answers[question._id]}
                </p>
              </li>
            ))}
          </ul>

          <p className={s.time}>
            {`Your time completing the questionnaire: ${Math.floor(
              (Date.now() - startTime) / 1000 / 60
            )}m 
            ${Math.floor(((Date.now() - startTime) / 1000) % 60)}s`}
          </p>

          <div className={s.btnWrap}>
            <NavLink className={s.questionBtn} to='/questionnaires'>
              Back Catalog
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <h1 className={s.formTitle}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h1>
          <p className={s.formDescription}>
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </p>

          <div className={s.questionsWrap}>
            <p className={s.questionText}>{currentQuestion.questionText}</p>

            {currentQuestion.questionType === 'text' && (
              <label>
                <Controller
                  name={`answers.${currentQuestion._id}`}
                  control={control}
                  render={({ field }) => (
                    <textarea className={s.inputText} {...field} rows='3' />
                  )}
                />
              </label>
            )}
            <div className={s.questionRadio}>
              {currentQuestion.questionType === 'radio' &&
                currentQuestion.options.map((option, index) => (
                  <label key={index}>
                    <Controller
                      name={`answers.${currentQuestion._id}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          className={s.radioInput}
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
            </div>
            <div className={s.questionRadio}>
              {currentQuestion.questionType === 'checkbox' &&
                currentQuestion.options.map((option, index) => (
                  <label key={index}>
                    <Controller
                      name={`answers.${currentQuestion._id}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          className={s.radioInput}
                          {...field}
                          type='checkbox'
                          value={option}
                          checked={field.value?.includes(option)}
                          onChange={e => {
                            const isChecked = e.target.checked;
                            let newValue = isChecked
                              ? [...field.value, option]
                              : field.value.filter(val => val !== option);
                            field.onChange(newValue);
                          }}
                        />
                      )}
                    />
                    {option}
                  </label>
                ))}
            </div>

            {errors.answers?.[currentQuestion._id] && (
              <p style={{ color: 'red' }}>
                {errors.answers[currentQuestion._id].message}
              </p>
            )}
          </div>

          <div className={s.btnWrap}>
            {step < questions.length - 1 ? (
              <button
                className={s.questionBtn}
                type='button'
                onClick={() => setStep(step + 1)}
                disabled={isNextDisabled}
              >
                Next
              </button>
            ) : (
              <button
                className={s.questionBtn}
                type='submit'
                disabled={!isValid}
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default Questionnaire;
