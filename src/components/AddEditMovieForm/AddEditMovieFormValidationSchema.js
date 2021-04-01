import * as Yup from 'yup';

const schema = Yup.object({
  title: Yup.string().required('This is a required field.'),
  poster: Yup.string().url('Must be a valid url.').required('This is a required field.'),
  releaseDate: Yup.date(),
  genres: Yup.array().of(Yup.string()).min(1, 'Select at least one genre.').required(),
  overview: Yup.string().required('This is a required field.'),
  runtime: Yup.number()
    .typeError('Must be a number.')
    .min(0, 'Must be more than 0.')
    .required('This is a required field.'),
});

export default schema;
