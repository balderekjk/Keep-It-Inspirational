import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cardStyles from './WelcomeCard.module.css';

const ArtView = (props) => {
  const [gallery, setGallery] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(0);
  const [artId, setArtId] = useState(-1);
  const descriptionRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    setGallery([]);
    if (props.editable) {
      axios
        .get(
          `${
            process.env.REACT_APP_SERVER_URL
          }/personal/${sessionStorage.getItem('id')}`
        )
        .then((res) => {
          setGallery(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/explore/${sessionStorage.getItem(
            'id'
          )}`
        )
        .then((res) => {
          setGallery(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props.editable]);

  const redirect = (path) => {
    return navigate(path);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/arts/${artId}`)
      .then((res) => {
        setGallery('');
        window.location.reload();
      });
  };

  const handleSubmitEdit = async (artIdDb) => {
    if (isEdit) {
      if (
        /fuck|fag|nigg|cunt|gook|\bchink|bitch|(\S*\*\S)/gi.test(
          descriptionRef.current.value
        )
      ) {
        return alert('Please revise your wording before submitting');
      }
      const body = {
        art_id: +artIdDb,
        description: descriptionRef.current.value,
      };
      if (artIdDb === artId) {
        await axios.put(
          `${
            process.env.REACT_APP_SERVER_URL
          }/personal/${sessionStorage.getItem('id')}`,
          body
        );
      } else {
        console.log('Error');
      }
    }
  };

  return (
    <div
      className={`${cardStyles['main-page-content']} ${cardStyles['flex-r']}`}
    >
      {gallery.map((attr) => {
        return (
          <div
            key={attr.art_id}
            className={cardStyles.flex}
            style={{
              border: '1px solid blue',
              background: '#fbf7f5',
              borderRadius: '0.7em',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <h2>{attr.title}</h2>

              <div style={{ fontSize: '14px', marginLeft: '3px' }}>
                ({attr.media_type})
              </div>
            </div>
            {props.editable && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <button
                  onClick={() => redirect(`/journal/${attr.art_id}`)}
                  style={{
                    border: '1px solid darkblue',
                    color: 'darkblue',
                  }}
                >
                  Add Entry
                </button>
                <div>
                  <button
                    onClick={() => {
                      if (isDelete === 0) {
                        setArtId(attr.art_id);
                      } else if (isDelete === 1 && attr.art_id === artId) {
                        handleDelete();
                      }
                      if (isDelete < 1) {
                        setIsDelete(isDelete + 1);
                      } else {
                        setIsDelete(0);
                      }
                    }}
                    style={{
                      width: 'fit-content',
                      border:
                        artId === attr.art_id && isDelete === 1
                          ? '1px solid red'
                          : '1px solid darkblue',
                      color:
                        artId === attr.art_id && isDelete === 1
                          ? 'red'
                          : 'darkblue',
                    }}
                  >
                    Delete
                  </button>
                  {isDelete > 0 && artId === attr.art_id && (
                    <button
                      onClick={() => {
                        setIsDelete(0);
                      }}
                      style={{
                        width: 'fit-content',
                        border: '1px solid darkblue',
                        color: 'darkblue',
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
            <a
              style={{ cursor: 'pointer' }}
              href={
                attr.media_url.length === 11
                  ? `https://youtu.be/${attr.media_url}`
                  : attr.media_url
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt={`${attr.title} personal description`}
                src={
                  attr.media_url.length === 11
                    ? `https://img.youtube.com/vi/${attr.media_url}/hqdefault.jpg`
                    : attr.media_url
                }
                style={{
                  width: '97%',

                  border: '2px solid transparent',
                  borderRadius: '5px',
                }}
              />
              <p style={{ fontSize: '0.9em', margin: '0' }}>
                {attr.media_url.length === 11 && 'YouTube Link'}
              </p>
            </a>
            <span style={{ display: 'flex' }}>
              <p
                style={{
                  fontSize: '16px',
                  whiteSpace: 'pre-line',
                  color: 'black',
                  padding: '0 4px',
                  borderRadius: '3px',
                }}
              >
                {isEdit && artId === attr.art_id ? (
                  <textarea
                    className={cardStyles['editDesc']}
                    rows="5"
                    defaultValue={attr.description}
                    ref={descriptionRef}
                  />
                ) : (
                  <>{attr.description}</>
                )}
              </p>
            </span>

            {props.editable && (
              <>
                <button
                  onClick={() => {
                    setArtId(attr.art_id);
                    setIsEdit(!isEdit);
                    handleSubmitEdit(attr.art_id);
                    isEdit && window.location.reload();
                  }}
                  style={{
                    border: '1px solid darkblue',
                    color: 'darkblue',
                  }}
                >
                  {isEdit && artId === attr.art_id
                    ? 'Submit Edit'
                    : 'Edit Description'}
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArtView;
