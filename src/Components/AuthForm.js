import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import './AuthForm.module.css';
import cardStyles from './WelcomeCard.module.css';

export default function Signup() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState('');
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      isSignIn: isSignIn,
      email: '',
      // username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      isSignIn: Yup.boolean(),
      email: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .matches(/(?=.*[@])(?=.*\S+$)/, 'invalid email')
        .required('Required'),
      // username: Yup.string().when('isSignIn', {
      //   is: false,
      //   then: Yup.string()
      //     .min(4, 'Must be at least 4 characters')
      //     .max(40, 'Must be less than 40 characters')
      //     .required('Required'),
      // }),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Password must contain 8 characters, one uppercase, one lowercase, one number, and one special character'
        )
        .required('Required'),
      passwordConfirm: Yup.string().when('isSignIn', {
        is: false,
        then: Yup.string()
          .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
          })
          .required('Required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        isSignIn
          ? await login(values.email, values.password)
          : await signup(values.email, values.password);
        // .then((result) => {
        //     return result.user.updateProfile({
        //       displayName: values.username,
        //     });
        //   });
        navigate('/');
      } catch (error) {
        // setError(error);
        setError(error.message.substring(10));
      }
    },
  });

  return (
    <div className={cardStyles['main-page-content']}>
      <form
        className={cardStyles['content-card']}
        onSubmit={formik.handleSubmit}
      >
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="email address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {!isSignIn && formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}
        {/* {!isSignIn && (
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        )}
        {!isSignIn && formik.touched.username && formik.errors.username && (
          <p>{formik.errors.username}</p>
        )} */}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {!isSignIn && formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}
        {!isSignIn && (
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="retype password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
          />
        )}
        {!isSignIn &&
          formik.touched.passwordConfirm &&
          formik.errors.passwordConfirm && (
            <p>{formik.errors.passwordConfirm}</p>
          )}
        <button type="submit">{isSignIn ? 'Log In' : 'Register'}</button>
        {error && <p style={{ textAlign: 'center' }}>{error}</p>}
      </form>
      {
        <button onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'Create new account' : 'Sign In'}
        </button>
      }
    </div>
  );
}
