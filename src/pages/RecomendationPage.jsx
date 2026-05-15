import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocal } from '../context/LocalContext';
import useInput from '../hooks/useInput';

const sidebarItems = ['Dashboard', 'Rekomendasi Menu', 'Riwayat Menu', 'Laporan Gizi', 'Data Anak', 'Pengaturan', 'Bantuan', 'Keluar'];
const nutritionRows = ['Kalori', 'Protein', 'Serat', 'Lemak', 'Karbohidrat', 'Persentase AKG (1 porsi)'];
const reasons = ['Menu Seimbang Hari ini', 'Sumber Protein Berkualitas', 'Tinggi Serat', 'Disukai Anak'];
const activities = ['Menu Harian Dibuat', 'Laporan Gizi', 'Pengingat', 'Rekomendasi'];

function RecomendationPage() {
  const navigate = useNavigate();
  const { optimizeMenu, profile, recommendation } = useLocal();
  const [goal] = useInput(profile.goal);
  const [calories] = useInput(profile.calories);
  const [budget] = useInput(profile.budget);
  const [allergy] = useInput(profile.allergy);
  const [diet] = useInput(profile.diet);

  function handleAdjust() {
    optimizeMenu({
      goal,
      calories: Number(calories),
      budget: Number(budget),
      allergy,
      diet,
    });
    navigate('/dashboard');
  }

  return (
    <div className="workspace">
      <aside className="sidebar">
        {sidebarItems.map((item) => (
          <Link
            className={item === 'Rekomendasi Menu' ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            to={item === 'Dashboard' ? '/dashboard' : '/rekomendasi'}
            key={item}
          >
            {item}
          </Link>
        ))}
        <span className="mascot mascot--small" />
      </aside>

      <section className="workspace-main recommendation-page">
        <div className="workspace-title">
          <h1>Rekomendasi Menu Makan Siang <span>AI</span></h1>
          <div className="workspace-actions">
            <span>Senin, 4 April 2026</span>
            <button className="button button--secondary" type="button" onClick={handleAdjust}>Sesuaikan Kebutuhan</button>
          </div>
        </div>

        <div className="recommendation-grid">
          <section className="panel menu-panel">
            <span className="panel-badge">Menu Direkomendasikan Oleh AI</span>
            <div className="menu-cards">
              {recommendation.meals.map((meal) => (
                <article className="menu-card" key={meal.time}>
                  <span />
                  <h3>Menu</h3>
                  <p>{meal.menu.split(',')[0]}</p>
                </article>
              ))}
              <article className="menu-card">
                <span />
                <h3>Menu</h3>
                <p>buah</p>
              </article>
              <article className="menu-card">
                <span />
                <h3>Menu</h3>
                <p>air putih</p>
              </article>
            </div>
            <p className="menu-note">
              Menu ini dirancang oleh AI untuk memenuhi kebutuhan gizi seimbang anak sekolah berdasarkan standar AKG (Angka Kecukupan Gizi).
            </p>
          </section>

          <aside className="panel nutrition-panel">
            <div className="panel-title-row">
              <h2>Informasi Gizi Total</h2>
              <span>Per Porsi</span>
            </div>
            {nutritionRows.map((row) => (
              <div className="nutrition-row" key={row}>
                <span>{row}</span>
                <strong>{row === 'Kalori' ? '0 kkal' : row.includes('Persentase') ? '0 %' : '0 g'}</strong>
              </div>
            ))}
          </aside>
        </div>

        <div className="recommendation-lower-grid">
          <section className="panel activity-panel">
            <h2>Aktivitas Terbaru</h2>
            <table>
              <thead>
                <tr>
                  <th>Aktivitas</th>
                  <th>Deskripsi</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity}>
                    <td>{activity}</td>
                    <td>-</td>
                    <td>-</td>
                    <td><button type="button">Lihat Detail</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside className="panel reason-panel">
            <h2>Mengapa Menu ini Direkomendasikan?</h2>
            {reasons.map((reason) => (
              <div className="reason-item" key={reason}>
                <span />
                <div>
                  <strong>{reason}</strong>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            ))}
          </aside>
        </div>

        <div className="download-strip">
          <p>Rekomendasi ini dapat berubah sesuai kebutuhan kalori, usia, dan kondisi khusus</p>
          <button className="button button--secondary" type="button">Unduh Menu PDF</button>
        </div>
      </section>
    </div>
  );
}

export default RecomendationPage;
