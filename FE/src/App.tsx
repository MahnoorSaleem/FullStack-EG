import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Welcome from './pages/Welcome';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoutes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute
                path="/welcome"
                element={<Welcome />}
              />
            }
          />
          <Route path="/app" element={<SignIn />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
