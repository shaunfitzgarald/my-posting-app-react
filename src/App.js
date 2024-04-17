import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSuccessfulAuth = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);

  useEffect(() => {
    const setupAxiosInterceptors = () => {
      axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('jwt');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
      });

      axios.interceptors.response.use(response => response, error => {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
      });
    };

    setupAxiosInterceptors();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? 
              <Login handleSuccessfulAuth={handleSuccessfulAuth} /> : 
              <Navigate replace to="/dashboard" />
          } 
        />
        <Route 
          path="/register" 
          element={
            !isAuthenticated ? 
              <Registration handleSuccessfulAuth={handleSuccessfulAuth} /> : 
              <Navigate replace to="/dashboard" />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <Dashboard currentUser={currentUser} /> : // Passing currentUser to Dashboard component
              <Navigate replace to="/login" />
          } 
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
