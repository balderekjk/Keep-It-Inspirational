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
            {/* style={{ marginTop: '3px' }} */}
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
            onClick={() => setisMenuClosed(!isMenuClosed)}
            style={{
              width: '96.609px',
              justifyContent: 'center',
            }}
          >
            <li style={{ fontSize: '1.7em' }}>&equiv;</li>
          </div>
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
          <Link
            onClick={() => setisMenuClosed(true)}
            className={isMenuClosed ? styles['none'] : undefined}
            to="/remember"
          >
            <li>Save Art</li>
          </Link>
          <Link
            onClick={() => setisMenuClosed(true)}
            className={isMenuClosed ? styles['none'] : undefined}
            to="/journal"
          >
            <li>Journal</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
