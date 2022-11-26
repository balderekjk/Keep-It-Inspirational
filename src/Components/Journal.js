import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cardStyles from './WelcomeCard.module.css';
import formStyles from './AuthForm.module.css';

export default function Journal() {
  // const [isSignIn, setIsSignIn] = useState(true);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  // const [isPrivate, setIsPrivate] = useState(null);

  const formik = useFormik({
    initialValues: {
      prompt: '',
      title: '',
      type: '',
      privacy: '',
      mediaUpload: '',
      description: '',
    },
    validationSchema: Yup.object({
      prompt: Yup.string(),
      title: Yup.string().required('Required'),
      type: Yup.string().required('Required'),
      privacy: Yup.string().required('Required'),
      mediaUpload: Yup.string().matches(
        /youtube.com|youtu.be|themoviedb.org|tmdb.org|pinimg.com/,
        'Link not accepted'
      ),
      description: Yup.string().test(
        'no-slurs',
        'Revise wording',
        function (value) {
          if (value) {
            if (
              value.match(
                /fuck|fag|nigg|cunt|gook|\bchink|bitch|(\S*\*\S)/gi
              ) !== null
            ) {
              // setIsPrivate(true);
              return false;
            }
            // setIsPrivate(false);
            return true;
          }
        }
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm({ values: '' });
    },
  });

  // useEffect(() => {
  //   console.log('reached me');
  // }, [isPrivate]);

  const handlePromptSelect = (e) => {
    formik.values.prompt = e.target.value;
    console.log(formik);
  };

  const handleTypeButtons = (e) => {
    formik.values.type = e.target.value;
    console.log(formik);
  };

  const handlePrivacyButtons = (e) => (formik.values.privacy = e.target.value);

  let sub = formik.values.description;

  let example =
    'What is the meaning of this existence? What can you do to stop asking yourself this question? How long can this title go on? Does it keep stretching out beyond the screen? As life stretches beyond our screams, our pleas for mercy?';

  console.log(sub[28]);

  return (
    <div className={cardStyles['main-page-content']}>
      <form
        className={cardStyles['content-card']}
        onSubmit={formik.handleSubmit}
      >
        <h2>Journal Entry</h2>
        <input
          id="title"
          name="title"
          type="text"
          maxLength="115"
          placeholder="entry title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {isSubmitClicked && formik.errors.title && <p>{formik.errors.title}</p>}
        <fieldset id="privacy-field">
          <legend>
            <h4>Share Setting</h4>
          </legend>
          <div className={formStyles['radio-group']}>
            <input
              type="radio"
              id="private"
              name="privacy"
              onChange={(e) => handlePrivacyButtons(e)}
              onBlur={formik.handleBlur}
              value="private"
            />
            <label htmlFor="private">Private</label>
            <input
              type="radio"
              id="public"
              name="privacy"
              onChange={(e) => handlePrivacyButtons(e)}
              onBlur={formik.handleBlur}
              value="public"
            />
            <label htmlFor="public">Public</label>
          </div>
        </fieldset>
        {isSubmitClicked && formik.errors.privacy && (
          <p>{formik.errors.privacy}</p>
        )}
        <fieldset>
          <legend>
            <h4>Inspire</h4>
          </legend>
          <textarea
            id="description"
            name="description"
            rows="10"
            maxLength="4050"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </fieldset>
        {formik.values.description && formik.errors.description && (
          <p>{formik.errors.description}</p>
        )}
        <button type="submit" onClick={() => setIsSubmitClicked(true)}>
          Save
        </button>
      </form>
    </div>
  );
}
