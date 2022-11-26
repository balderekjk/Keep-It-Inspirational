import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cardStyles from './WelcomeCard.module.css';
import formStyles from './AuthForm.module.css';

export default function Remember() {
  const [date, setDate] = useState('');
  // const [isSignIn, setIsSignIn] = useState(true);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  // const [isPrivate, setIsPrivate] = useState(null);

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
    onSubmit: (values, { resetForm }) => {
      let currentTime = new Date(Date.now());
      console.log('reached');
      setDate(currentTime.toISOString());
      resetForm({ values: '' });
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

  let sub = formik.values.description;

  console.log(sub);

  return (
    <div className={cardStyles['main-page-content']}>
      {date}
      {/* {date.substring(4, 16).concat(date.substring(16, 21))} */}
      <form
        className={cardStyles['content-card']}
        onSubmit={formik.handleSubmit}
      >
        <h2>Save Art</h2>
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
              value="Series"
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
      <div
        style={{
          width: '100%',
          border: '1px solid red',
          // display: 'flex',
          // gap: '1ch',
          // flexWrap: 'wrap',
          // justifyContent: 'center',
        }}
      >
        <div
          // className={cardStyles['content-card']}
          style={{
            // background: 'hsl(220, 70%, 35%)',
            color: 'hsl(240, 100%, 17%)',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              background: 'white',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <h2>{formik.values.title}</h2>
              <div style={{ fontSize: '14px', margin: '3px' }}>
                ({formik.values.type})
              </div>
            </div>
            <button className={formStyles['add-journal']}>Add Entry</button>
            <img
              src={formik.values.mediaUpload}
              style={{
                width: '100%',

                border: '2px solid transparent',
                borderRadius: '5px',
              }}
            />
            <span style={{ display: 'flex' }}>
              <p
                style={{
                  fontSize: '16px',
                  // background: 'white',
                  color: 'black',
                  padding: '0 4px',
                  borderRadius: '3px',
                }}
                title="sub"
              >
                {sub[100] ? sub.substring(0, 100) + '...' : sub}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
