import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cardStyles from './WelcomeCard.module.css';

const ArtView = ({ props }) => {
  const [gallery, setGallery] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [artId, setArtId] = useState(-1);
  // const [textareaText, setTextareaText] = useState('');
  // const [isYouTube, setIsYouTube] = useState(false);
  const descriptionRef = useRef(null);
  let navigate = useNavigate();

  // const getPersonal = () => {
  //   if (props.editable) {
  //     axios
  //       .get(`http://localhost:5580/personal/${sessionStorage.getItem('id')}`)
  //       .then((res) => {
  //         console.log(res);
  //         setGallery(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     axios
  //       .get(`http://localhost:5580/explore/${sessionStorage.getItem('id')}`)
  //       .then((res) => {
  //         console.log(res);
  //         setGallery(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  useEffect(() => {
    setGallery([]);
    if (props.editable) {
      axios
        .get(`http://localhost:5580/personal/${sessionStorage.getItem('id')}`)
        .then((res) => {
          console.log(res);
          setGallery(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`http://localhost:5580/explore/${sessionStorage.getItem('id')}`)
        .then((res) => {
          console.log(res);
          setGallery(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [props.editable]);

  const redirect = (path) => {
    return navigate(path);
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
        await axios.put(`http://localhost:5580/personal/${props.userId}`, body);
        // setGallery(getPersonal());
      } else {
        console.log('Error');
      }
    }
  };

  return (
    <div
      className={`${cardStyles['main-page-content']} ${cardStyles['flex-r']}`}
    >
      {/* <div className={cardStyles['content-card']}>ViewArt</div> */}
      {gallery.map((attr) => {
        return (
          <div
            key={attr.art_id}
            className={cardStyles.flex}
            style={{
              // width: '50%',
              border: '1px solid blue',
              background: '#fbf7f5',
              borderRadius: '0.7em',
              // display: 'flex',
              // gap: '1ch',
              // flexWrap: 'wrap',
              // justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <h2>{attr.title}</h2>

              <div style={{ fontSize: '14px', margin: '3px' }}>
                ({attr.media_type})
              </div>
            </div>
            {props.editable && (
              <button
                onClick={() => redirect(`/journal/${attr.art_id}`)}
                style={{
                  border: '1px solid darkblue',
                  color: 'darkblue',
                }}
              >
                Add Entry
              </button>
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
                    ? `https://img.youtube.com/vi/${attr.media_url}/sddefault.jpg`
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
                  // background: 'white',
                  color: 'black',
                  padding: '0 4px',
                  borderRadius: '3px',
                }}
              >
                {isEdit && artId === attr.art_id ? (
                  <textarea
                    className={cardStyles['editDesc']}
                    rows="5"
                    // onChange={(e) => {
                    //   setTextareaText(e.target.value);
                    // }}
                    // value={textareaText}
                    // style={{
                    //   fontSize: '0.9em',
                    // }}
                    defaultValue={attr.description}
                    // onClick={() => console.log(this)}
                    // style={{ whiteSpace: 'pre-line' }}
                    ref={descriptionRef}
                  />
                ) : (
                  <>{attr.description}</>
                )}
              </p>
            </span>
            {/* <div style={{ display: 'flex', width: '100%' }}> */}

            {props.editable && (
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
                // disabled={

                // }
              >
                {isEdit && artId === attr.art_id
                  ? 'Submit Edit'
                  : 'Edit Description'}
              </button>
            )}
            {/* {!isEdit ? 'Edit Description' : 'Submit Edit'}
              
              {/* <button
                style={{
                  border: '1px solid darkred',
                  margin: '1ch',
                  color: 'darkred',
                }}
              >
                Delete
              </button> */}
            {/* </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ArtView;
