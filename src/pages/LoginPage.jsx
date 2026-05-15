import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

function LoginPage({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');

    try {
      onLogin({ email, password });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-heading">
        <h1>SISTEM OPTIMASI MENU MAKANAN BERGIZI BERBASIS AI</h1>
        <p>UNTUK GIZI SEIMBANG SERTA REKOMENDASI AKSI UNTUK ANAK SEKOLAH</p>
      </div>

      <form className="auth-panel auth-form" onSubmit={handleSubmit}>
        <div>
          <h2>Login</h2>
          <p>Masuk untuk melanjutkan ke akun Anda</p>
        </div>

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={onEmailChange} placeholder="Masukkan email Anda" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={onPasswordChange} placeholder="Masukkan kata sandi Anda" required />

        {errorMessage ? <p className="form-message form-message--error">{errorMessage}</p> : null}

        <button className="button button--primary" type="submit">Masuk</button>
        <div className="auth-divider"><span>atau</span></div>
        <button className="button button--google" type="button">G Masuk dengan Google</button>

        <p className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
        </p>
      </form>
    </section>
  );
}

export default LoginPage;
