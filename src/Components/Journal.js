import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import cardStyles from './WelcomeCard.module.css';

export default function Journal() {
  let navigate = useNavigate();
  let params = useParams();
  let [artTitle, setArtTitle] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/arts/${Object.values(params)[0]}`
      )
      .then((res) => {
        setArtTitle(res.data.title);
      });
  }, [params]);

  const formik = useFormik({
    initialValues: {
      title: '',
      entry: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      entry: Yup.string().required('Required').min(40),
    }),
    onSubmit: async (values, { resetForm }) => {
      let newDate = new Date(Date.now());
      newDate = newDate.toISOString();

      const body = {
        person_id: +sessionStorage.getItem('id'),
        art_id: +Object.values(params)[0],
        art_title: artTitle,
        title: values.title,
        entry: values.entry,
        date: newDate,
      };

      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/journals`, body)
        .then(() => {
          resetForm({ values: '' });
          navigate(`/journals/{${sessionStorage.getItem('id')}}`);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className={cardStyles['main-page-content']}>
      <form
        className={cardStyles['content-card']}
        onSubmit={formik.handleSubmit}
      >
        <h2>Journal Entry</h2>
        {artTitle && <h5 style={{ marginBottom: '1ch' }}>for {artTitle}</h5>}
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
        <fieldset>
          <legend>
            <h4>Inspire</h4>
          </legend>
          <textarea
            className={cardStyles['entryText']}
            id="entry"
            name="entry"
            rows="10"
            maxLength="4050"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.entry}
          />
        </fieldset>
        {isSubmitClicked && formik.errors.entry && <p>{formik.errors.entry}</p>}
        <button type="submit" onClick={() => setIsSubmitClicked(true)}>
          Save
        </button>
      </form>
    </div>
  );
}
