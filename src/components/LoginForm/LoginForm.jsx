import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './LoginForm.module.css';
import * as yup from 'yup';
import sprite from '../../img/sprite.svg';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlise';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleLogin = async (email, password) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userId = user.uid;
      const userEmail = user.email;
      const userName = user.displayName;

      const accessToken = await user.getIdToken();

      dispatch(
        setUser({
          email: userEmail,
          id: userId,
          token: accessToken,
          name: userName,
        })
      );

      navigate('catalog');
    } catch (error) {
      console.error('Error login user:', error);

      let errorMessage =
        'An error occurred while logging in. Please try again later.';

      // Перевіряємо тип помилки та встановлюємо відповідне повідомлення
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your email and try again.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage =
          'Invalid password. Please check your password and try again.';
      }

      toast.error(errorMessage);
    }
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
              Sign In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
