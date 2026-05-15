import React from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  ['recommendation', 'Rekomendasi AI', 'AI menganalisis kebutuhan gizi dan preferensi untuk memberikan menu terbaik.'],
  ['chart', 'OPTIMASI Gizi', 'Menampilkan kandungan gizi lengkap dari setiap menu yang direkomendasikan.'],
  ['calendar', 'Mentoring Harian', 'Pantau asupan gizi harian anak secara berkala.'],
];

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1>OPTIMASI MENU MAKANAN ANAK DENGAN AI</h1>
          <p>
            Sistem cerdas untuk membantu sekolah merencanakan menu makanan bergizi seimbang serta memberikan 
            rekomendasi aksi terbaik untuk anak sekolah.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/register">Mulai Sekarang</Link>
            <Link className="button button--secondary" to="/">Pelajari Lebih Lanjut</Link>
          </div>
        </div>

        <div className="nutrition-visual" aria-label="Preview rekomendasi menu">
          <span className="mascot mascot--large" />
        </div>
      </section>

      <section className="section" id="fitur">
        <div className="section__header">
          <h2>FITUR UTAMA</h2>
        </div>
        <div className="feature-grid">
          {benefits.map(([icon, title, description]) => (
            <article className="feature-card" key={title}>
              <span className={`feature-card__icon feature-card__icon--${icon}`} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="home-cta" id="manfaat">
          <span className="home-cta__badge">Food Safety</span>
          <div>
            <h3>Mulai Jaga Gizi Anak Sekarang</h3>
            <p>Langkah kecil hari ini untuk masa depan yang lebih sehat.</p>
          </div>
          <Link className="button button--primary" to="/register">Daftar Sekarang {'->'}</Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
