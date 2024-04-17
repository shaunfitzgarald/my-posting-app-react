import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
