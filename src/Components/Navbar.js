import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuClosed, setisMenuClosed] = useState(true);
  const menuBar = useRef(null);
  const { currentUser, logout } = useAuth();

  return (
    <nav id={styles['top-nav']}>
      <ul>
        <Link onClick={() => setisMenuClosed(true)} to="/">
          <li className={styles['rotate']} style={{ fontWeight: '700' }}>
            <span>K</span>
            <span>I</span>
            <span>I</span>
            <span className="key-circle">O</span>
          </li>
        </Link>
        <div className={styles['right-items']} style={{ display: 'flex' }}>
          <div
            ref={menuBar}
            className={styles['menu-opener']}
            onClick={() => {
              setisMenuClosed(!isMenuClosed);
            }}
            style={{
              width: '96.609px',
              justifyContent: 'center',
            }}
          >
            <li style={{ fontSize: '1.7em' }}>&equiv;</li>
          </div>

          {currentUser && (
            <>
              <Link
                onClick={() => setisMenuClosed(true)}
                className={isMenuClosed ? styles['none'] : undefined}
                to={`/explore/${sessionStorage.getItem('id')}`}
              >
                <li>Explore</li>
              </Link>
              <Link
                onClick={() => setisMenuClosed(true)}
                className={isMenuClosed ? styles['none'] : undefined}
                to="/saveart"
              >
                <li>Save Art</li>
              </Link>
              <Link
                onClick={() => setisMenuClosed(true)}
                className={isMenuClosed ? styles['none'] : undefined}
                to={`/personal/${sessionStorage.getItem('id')}`}
              >
                <li>My Art</li>
              </Link>
              <Link
                onClick={() => setisMenuClosed(true)}
                className={isMenuClosed ? styles['none'] : undefined}
                to={`/journals/${sessionStorage.getItem('id')}`}
              >
                <li>Entries</li>
              </Link>
            </>
          )}
          <Link
            onClick={() => setisMenuClosed(true)}
            className={isMenuClosed ? styles['none'] : undefined}
            to="/auth"
          >
            <li
              onClick={() => {
                currentUser && logout();
              }}
            >
              {currentUser ? 'Log Out' : 'Start Here'}
            </li>
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
