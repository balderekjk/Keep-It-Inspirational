import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import * as Yup from 'yup';
import cardStyles from './WelcomeCard.module.css';
import formStyles from './AuthForm.module.css';

export default function Remember({ props }) {
  // const [userId, setUserId] = useState(null);
  // const [date, setDate] = useState('');
  const { currentUser } = useAuth();
  // const [isSignIn, setIsSignIn] = useState(true);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  // const [isPrivate, setIsPrivate] = useState(null);

  // useEffect(() => {
  //   let foundUser = props.userList.filter((el) => {
  //     console.log(el);
  //     return el.email_address === currentUser.email;
  //   });
  //   foundUser && setUserId(foundUser[0].person_id);
  // }, [currentUser.email, props.userList]);

  console.log(currentUser);

  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      privacy: '',
      mediaUpload: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      type: Yup.string().required('Required'),
      privacy: Yup.string().required('Required'),
      mediaUpload: Yup.string().matches(
        /youtube.com|youtu.be|themoviedb.org|tmdb.org|pinimg.com/,
        'Link not accepted',
        { excludeEmptyString: true }
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
          }
          return true;
        }
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      values.mediaUpload = getYouTubeId();
      let newDate = new Date(Date.now());
      console.log('reached');
      newDate = newDate.toISOString();

      const body = {
        // +props.userId
        person_id: +sessionStorage.getItem('id'),
        title: values.title,
        media_type: values.type,
        privacy: values.privacy,
        media_url: values.mediaUpload,
        description: values.description,
        date: newDate,
      };

      await axios
        .post(`http://localhost:5580/arts`, body)
        .then(() => resetForm({ values: '' }))
        .catch((err) => console.log(err));
    },
  });

  // useEffect(() => {
  //   console.log('reached me');
  // }, [isPrivate]);

  const handleTypeButtons = (e) => {
    formik.values.type = e.target.value;
    console.log(formik);
  };

  const handlePrivacyButtons = (e) => (formik.values.privacy = e.target.value);

  const getYouTubeId = () => {
    if (formik.values.mediaUpload.includes('youtube.com')) {
      let sub1 = formik.values.mediaUpload.indexOf('?v=') + 3;
      let sub2 = sub1 + 11;
      return formik.values.mediaUpload.substring(sub1, sub2);
    } else if (formik.values.mediaUpload.includes('youtu.be')) {
      let sub1 = formik.values.mediaUpload.indexOf('.be/') + 4;
      let sub2 = sub1 + 11;
      return formik.values.mediaUpload.substring(sub1, sub2);
    } else {
      return formik.values.mediaUpload;
    }
  };

  let sub = formik.values.description;

  console.log(sub);

  return (
    <div className={cardStyles['main-page-content']}>
      {/* {date.substring(4, 16).concat(date.substring(16, 21))} */}
      <form
        className={cardStyles['content-card']}
        onSubmit={formik.handleSubmit}
      >
        <h2 onClick={() => getYouTubeId()}>Save Art</h2>
        <input
          id="title"
          name="title"
          type="text"
          maxLength="115"
          placeholder="art title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {isSubmitClicked && formik.errors.title && <p>{formik.errors.title}</p>}
        <fieldset id="artTypes">
          <legend>
            <h4>Art Type</h4>
          </legend>
          <div className={formStyles['radio-group']}>
            <input
              type="radio"
              id="movie"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="Movie"
            />
            <label htmlFor="movie">Movie</label>
            <input
              type="radio"
              id="book"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="Book"
            />
            <label htmlFor="book">Book</label>
            <input
              type="radio"
              id="speech"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="Speech"
            />
            <label htmlFor="speech">Speech</label>
            <input
              type="radio"
              id="static"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="Static/Visual"
            />
            <label htmlFor="static">Static/Visual</label>
            <input
              type="radio"
              id="series"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="TV Series"
            />
            <label htmlFor="series">TV Series</label>
            <input
              type="radio"
              id="poetry"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="Poetry"
            />
            <label htmlFor="poetry">Poetry</label>
            <input
              type="radio"
              id="podcast"
              name="type"
              onChange={(e) => handleTypeButtons(e)}
              onBlur={formik.handleBlur}
              value="Podcast"
            />
            <label htmlFor="podcast">Podcast</label>
          </div>
        </fieldset>
        {isSubmitClicked && formik.errors.type && <p>{formik.errors.type}</p>}
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
              value="Private"
            />
            <label htmlFor="private">Private</label>
            <input
              type="radio"
              id="public"
              name="privacy"
              onChange={(e) => handlePrivacyButtons(e)}
              onBlur={formik.handleBlur}
              value="Public"
            />
            <label htmlFor="public">Public</label>
          </div>
        </fieldset>
        {isSubmitClicked && formik.errors.privacy && (
          <p>{formik.errors.privacy}</p>
        )}
        <fieldset>
          <legend>
            <h4 style={{ marginBottom: '0' }}>
              Have a YouTube clip or an image?
            </h4>
          </legend>
          <p style={{ fontSize: '12px', margin: '2px 0' }}>
            Accepting links sourced from youtube.com, themoviedb.org, and
            pinterest.com
          </p>
          <input
            id="mediaUpload"
            name="mediaUpload"
            type="text"
            placeholder="youtube/image url"
            maxLength="115"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mediaUpload}
          ></input>
        </fieldset>
        {isSubmitClicked && formik.errors.mediaUpload && (
          <p>{formik.errors.mediaUpload}</p>
        )}
        <fieldset>
          <legend>
            <h4>How has this art moved you?</h4>
          </legend>
          <textarea
            id="description"
            name="description"
            rows="10"
            maxLength="4050"
            placeholder="highly recommended reflection space"
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
