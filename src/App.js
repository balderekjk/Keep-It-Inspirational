import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './Components/PrivateRoute';
import Navbar from './Components/Navbar';
import WelcomeCard from './Components/WelcomeCard';
import AuthForm from './Components/AuthForm';
import SaveArt from './Components/SaveArt';
import Journal from './Components/Journal';
import ArtView from './Components/ArtView';
import JournalView from './Components/JournalView';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const findUserId = (userId) => {
    window.sessionStorage.setItem('id', userId);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <WelcomeCard
                props={{
                  findUserId: findUserId,
                }}
              />
            }
          />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/saveart"
            element={<PrivateRoute Component={SaveArt} />}
          />
          <Route
            path="/journal/:id"
            element={<PrivateRoute Component={Journal} />}
          />
          <Route
            path="/personal/:id"
            element={
              <PrivateRoute
                Component={ArtView}
                props={{
                  editable: true,
                }}
              />
            }
          />
          <Route
            path="/explore/:id"
            element={<ArtView props={{ editable: false }} />}
          />
          <Route
            path="/journals/:id"
            element={<PrivateRoute Component={JournalView} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
