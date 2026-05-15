import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { LocalProvider, useLocal } from './context/LocalContext';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecomendationPage from './pages/RecomendationPage';
import RegisterPage from './pages/RegisterPage';
import './styles.css';

function AppRoutes() {
  const navigate = useNavigate();
  const { authUser, login, logout, register } = useLocal();

  function handleLogin(payload) {
    login(payload);
    navigate('/dashboard');
  }

  function handleRegister(payload) {
    register(payload);
    navigate('/login');
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Layout authUser={authUser} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/rekomendasi" element={<RecomendationPage />} />
        <Route path="/recommendation" element={<Navigate to="/rekomendasi" replace />} />
        <Route path="/recomendation" element={<Navigate to="/rekomendasi" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <LocalProvider>
      <AppRoutes />
    </LocalProvider>
  );
}

export default App;
