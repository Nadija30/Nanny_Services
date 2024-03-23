import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './LoginForm.module.css';
import * as yup from 'yup';
import sprite from '../../img/sprite.svg';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlise';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailVisible, setEmailVisible] = useState(false);

  const handleClickPasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      const userName = user.displayName;
      user
        .getIdToken()
        .then((accessToken) => {
          console.log('User registered successfully:', user);
          console.log('Access Token:', accessToken);
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: accessToken,
              name: userName,
            })
          );
          navigate('catalog');
        })
        .catch(() => allert('Invalid user'));
    });
  };

  const hasFieldError = (errors, fieldName) => errors[fieldName];
  const isFieldValid = (errors, fieldName) => !errors[fieldName];
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        handleLogin(values.email, values.password);
        actions.setSubmitting(false);
      }}
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
                  value={values.email}
                  onChange={(e) => setFieldValue('email', e.target.value)}
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
                    value={values.password}
                    onChange={(e) => setFieldValue('password', e.target.value)}
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
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
