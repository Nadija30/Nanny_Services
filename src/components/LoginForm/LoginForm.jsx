import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './LoginForm.module.css';
import * as yup from 'yup';
import sprite from '../../img/sprite.svg';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be no more than 16 characters')
    .matches(/^(?=.*[a-z])/, 'Please create a stronger password')
    .required('Required'),
});
const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClickPasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = ({ email, password }, { resetForm }) => {
    dispatch(
      login({
        email,
        password,
      })
    );
    resetForm();
  };

  const hasFieldError = (errors, fieldName) => errors[fieldName];
  const isFieldValid = (errors, fieldName) => !errors[fieldName];
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginValidationSchema}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <Form className={css.form} autoComplete="off">
          <div className={css.formContainer}>
            <div className={css.inputContainer}>
              <h2 className={css.title}>Log In</h2>
              <p className={css.text}>
                Welcome back! Please enter your credentials to access your
                account and continue your babysitter search.
              </p>
              <div className={css.wrap}>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  className={`${css.input}
              ${touched.email && !errors.email && css.success}
                    ${touched.email && errors.email && css.error}`}
                />
                {touched.email && isFieldValid(errors, 'email')}
                {touched.email && <ErrorMessage name="email" component="div" />}
                <div className={css.passwordWrap}>
                  <Field
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    className={`${css.input}
             ${touched.password && !errors.password && css.success}
                    ${touched.password && errors.password && css.error}`}
                  />

                  {touched.password && isFieldValid(errors, 'password')}
                  {passwordVisible ? (
                    <button
                      className={css.iconBtn}
                      type="button"
                      onClick={handleClickPasswordVisibility}
                    >
                      <svg className={css.svg}>
                        <use href={`${sprite}#icon-eye`} />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className={css.iconBtn}
                      type="button"
                      onClick={handleClickPasswordVisibility}
                    >
                      <svg className={css.svg}>
                        <use href={`${sprite}#icon-eye-off`} />
                      </svg>
                    </button>
                  )}
                  {touched.password && (
                    <ErrorMessage name="password" component="div" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={css.button}
            >
              Log In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
