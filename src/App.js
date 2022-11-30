import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './Components/PrivateRoute';
import Navbar from './Components/Navbar';
import WelcomeCard from './Components/WelcomeCard';
import AuthForm from './Components/AuthForm';
import Remember from './Components/Remember';
import Journal from './Components/Journal';
import ArtView from './Components/ArtView';
import JournalView from './Components/JournalView';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  const [userList, setUserList] = useState([]);
  let [userId, setUserId] = useState(-1);

  const findUserId = (userId) => {
    // setUserId(userId);
    window.sessionStorage.setItem('id', userId);
    setUserId(sessionStorage.getItem('id'));
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navbar
          props={{
            userId: userId,
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <WelcomeCard
                props={{
                  findUserId: findUserId,
                  // onGetUserList: getUserList,
                  userId: userId,
                }}
              />
            }
          />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/remember"
            element={
              <PrivateRoute
                Component={Remember}
                props={{
                  userId: userId,
                }}
              />
            }
          />
          <Route
            path="/journal/:id"
            element={
              <PrivateRoute
                Component={Journal}
                props={{
                  userId: userId,
                }}
              />
            }
          />
          <Route
            path="/personal/:id"
            element={
              <PrivateRoute
                Component={ArtView}
                props={{
                  userId: userId,
                  editable: true,
                }}
              />
            }
          />
          <Route
            path="/explore/:id"
            element={
              <PrivateRoute
                Component={ArtView}
                props={{
                  userId: userId,
                  editable: false,
                }}
              />
            }
          />
          <Route
            path="/journals/:id"
            element={
              <PrivateRoute
                Component={JournalView}
                props={{
                  userId: userId,
                }}
              />
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
