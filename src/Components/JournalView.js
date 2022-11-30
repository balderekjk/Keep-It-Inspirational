import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Remember from './Remember';
import axios from 'axios';
import cardStyles from './WelcomeCard.module.css';

const JournalView = ({ props }) => {
  const [gallery, setGallery] = useState([]);
  const [startEdit, setStartEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5580/journals/${sessionStorage.getItem('id')}`)
      .then((res) => {
        console.log(res);
        setGallery(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.userId]);

  return (
    <div
      className={`${cardStyles['main-page-content']} ${cardStyles['flex-r']}`}
    >
      {gallery.map((attr) => {
        return (
          <div
            key={attr.journal_id}
            className={cardStyles.flex}
            style={{
              // width: '50%',
              background: 'linear-gradient(white, hsl(0, 0%, 90%)',
              borderRadius: '0.7em',
              boxShadow: '1px 2px 2px grey',
              // display: 'flex',
              // gap: '1ch',
              // flexWrap: 'wrap',
              // justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2>{attr.title}</h2>
              <h4>{attr.art_title}</h4>
              <p>{attr.entry}</p>
              <p>{attr.date.substring(0, 10)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JournalView;
