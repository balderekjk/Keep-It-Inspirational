import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Navbar from './Components/Navbar';
import WelcomeCard from './Components/WelcomeCard';
import AuthForm from './Components/AuthForm';
import Remember from './Components/Remember';
import Journal from './Components/Journal';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomeCard />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/remember"
            element={<PrivateRoute Component={Remember} />}
          />
          <Route
            path="/journal"
            element={<PrivateRoute Component={Journal} />}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
