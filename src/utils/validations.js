import * as Yup from 'yup';

export const questionnaireCreateSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        questionText: Yup.string().required('Question text is required'),
        questionType: Yup.string()
          .oneOf(['text', 'radio', 'checkbox'])
          .required('Question type is required'),
        options: Yup.array()
          .of(Yup.string().required('Option is required'))
          .min(1, 'At least one option is required'),
      })
    )
    .min(1, 'At least one question is required'),
});
