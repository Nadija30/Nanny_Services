/* eslint-disable react/prop-types */
import css from './ApoitmentForm.module.css';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { CustomSelect } from '../Select/Select';

const num = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;

const validationSchema = Yup.object().shape({
  address: Yup.string().min(1, 'Too Short!').required('Required'),
  phone: Yup.string()
    .matches(num, { message: 'Please enter a valid number' })
    .required('Required'),
  childAge: Yup.number().positive().integer().required('Required'),
  time: Yup.string()
    .oneOf([
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
    ])
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  parentName: Yup.string().min(1, 'Too Short!').required('Required'),
  comment: Yup.string(),
});

export const Appointment = ({ img, name }) => {
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);
    resetForm();
  };
  return (
    <>
      <h3 className={css.title}>Make an appointment with a babysitter</h3>
      <p className={css.description}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>
      <div className={css.nameWrapper}>
        <img className={css.img} src={img} alt="avatar" />
        <div>
          <p className={css.nany}>Your nanny</p>
          <p>{name}</p>
        </div>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          address: '',
          phone: '',
          childAge: '',
          time: '',
          email: '',
          parentName: '',
          comment: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.field} ${
                  errors.address && touched.address ? css.error : ''
                }`}
                name="address"
                placeholder="Address"
              />
              {errors.address && touched.address && (
                <p className={css.textError}>{errors.address}</p>
              )}
            </div>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.field} ${
                  errors.phone && touched.phone ? css.error : ''
                }`}
                name="phone"
                type="number"
                placeholder="+380"
              />
              {errors.phone && touched.phone && (
                <p className={css.textError}>{errors.phone}</p>
              )}
            </div>
            <div className={css.fieldWrapper}>
              <Field
                className={`${css.field} ${
                  errors.childAge && touched.childAge ? css.error : ''
                }`}
                name="childAge"
                type="number"
                placeholder="Child's age"
              />
              {errors.childAge && touched.childAge && (
                <p className={css.textError}>{errors.childAge}</p>
              )}
            </div>
            <div className={css.fieldWrapper}>
              <CustomSelect className={css.field} />
            </div>

            <div className={`${css.fieldWrapper} ${css.width}`}>
              <Field
                className={`${css.field}  ${
                  errors.email && touched.email ? css.error : ''
                }`}
                name="email"
                type="email"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <p className={css.textError}>{errors.email}</p>
              )}
            </div>
            <div className={`${css.fieldWrapper} ${css.width}`}>
              <Field
                className={`${css.field} ${
                  errors.parentName && touched.parentName ? css.error : ''
                }`}
                name="parentName"
                placeholder="Father's or mother's name"
              />
              {errors.parentName && touched.parentName && (
                <p className={css.textError}>{errors.parentName}</p>
              )}
            </div>
            <Field
              className={`${css.field} ${css.comment}`}
              as="textarea"
              name="comment"
              placeholder="Comment"
            />
            <button className={css.button} type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
