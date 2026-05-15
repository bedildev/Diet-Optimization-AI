import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

function RegisterPage({ onRegister }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');

    if (password.length < 8) {
      setErrorMessage('Password minimal 8 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi password belum sama.');
      return;
    }

    try {
      onRegister({ name, email, password });
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
          <h2>Register</h2>
          <p>Buat akun baru untuk memulai</p>
        </div>

        <label htmlFor="name">Nama Lengkap</label>
        <input id="name" type="text" value={name} onChange={onNameChange} placeholder="Masukkan nama lengkap Anda" required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={onEmailChange} placeholder="Masukkan email Anda" required />

        <label htmlFor="password">Kata Sandi</label>
        <input id="password" type="password" value={password} onChange={onPasswordChange} placeholder="Masukkan kata sandi Anda" required />

        <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
        <input id="confirmPassword" type="password" value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="Konfirmasi kata sandi Anda" required />

        {errorMessage ? <p className="form-message form-message--error">{errorMessage}</p> : null}

        <button className="button button--primary" type="submit">Daftar</button>

        <p className="auth-footer">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;
