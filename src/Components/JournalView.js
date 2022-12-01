import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cardStyles from './WelcomeCard.module.css';

const JournalView = () => {
  const [gallery, setGallery] = useState([]);
  const [journalId, setJournalId] = useState(-1);
  const [isDelete, setIsDelete] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/journals/${sessionStorage.getItem(
          'id'
        )}`
      )
      .then((res) => {
        setGallery(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/journals/${journalId}`)
      .then((res) => {
        setGallery('');
        window.location.reload();
      });
  };

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
              background: 'linear-gradient(white, hsl(0, 0%, 90%)',
              borderRadius: '0.7em',
              boxShadow: '1px 2px 2px grey',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                }}
              >
                <h2 style={{ width: '100%', marginLeft: '20px' }}>
                  {attr.title}
                </h2>
                <div
                  style={{
                    padding: '0 6px',
                    fontSize: '24px',
                    color:
                      isDelete === 1 && attr.journal_id === journalId && 'red',
                    cursor: 'pointer',
                    fontWeight:
                      isDelete === 1 && attr.journal_id === journalId && '600',
                  }}
                  onClick={() => {
                    if (isDelete === 0) {
                      setJournalId(attr.journal_id);
                    } else if (
                      isDelete === 1 &&
                      attr.journal_id === journalId
                    ) {
                      handleDelete();
                    }
                    if (isDelete < 1) {
                      setIsDelete(isDelete + 1);
                    } else {
                      setIsDelete(0);
                    }
                  }}
                >
                  X
                </div>
              </div>
              <h4>{attr.art_title}</h4>

              <p
                style={{
                  whiteSpace: 'pre-line',
                }}
              >
                {attr.entry}
              </p>
              <p>{attr.date.substring(0, 10)} (UTC)</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JournalView;
