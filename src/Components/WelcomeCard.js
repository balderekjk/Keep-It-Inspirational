import React from 'react';
import styles from './WelcomeCard.module.css';

const WelcomeCard = () => {
  return (
    <div className={styles['main-page-content']}>
      <div className={styles['content-card']}>
        <h1 style={{ padding: '0.3em' }}>Hi!</h1>
        <h2>
          Welcome to '<em>Keep It Inspirational</em>'
        </h2>
        <p>
          How many times have you been inspired or deeply moved by a piece of
          art?
        </p>
        <p>
          And then a few days later, you find yourself living the same way you
          always have?
        </p>
        <p>If you have ever felt that way before, this is the place for you.</p>
        <p>
          The mission of this site is to provide a tool for you to live up to
          the art that inspires you.
        </p>
        <p>And that tool is guided journaling.</p>
        <p>You are able to save all the art that has moved you here.</p>
        <p>
          And reflect on that art in ways that are helpful to your wellbeing.
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
