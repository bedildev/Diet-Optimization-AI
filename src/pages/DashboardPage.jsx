import React from 'react';
import { Link } from 'react-router-dom';
import { useLocal } from '../context/LocalContext';

const sidebarItems = ['Dashboard', 'Rekomendasi Menu', 'Riwayat Menu', 'Laporan Gizi', 'Data Anak', 'Pengaturan', 'Bantuan', 'Keluar'];
const activities = ['Menu Harian Dibuat', 'Laporan Gizi', 'Pengingat', 'Rekomendasi'];
const quickActions = ['Buat Menu Baru', 'Lihat Rekomendasi', 'Laporan Gizi', 'Pengingat'];

function DashboardPage() {
  const { authUser, recommendation } = useLocal();
  const displayName = authUser?.name || 'Anemon Laut';

  return (
    <div className="workspace">
      <aside className="sidebar">
        {sidebarItems.map((item) => (
          <Link
            className={item === 'Dashboard' ? 'sidebar__item sidebar__item--active' : 'sidebar__item'}
            to={item === 'Rekomendasi Menu' ? '/rekomendasi' : '/dashboard'}
            key={item}
          >
            {item}
          </Link>
        ))}
        <span className="mascot mascot--small" />
      </aside>

      <section className="workspace-main dashboard">
        <div className="workspace-title">
          <h1>Selamat Datang, {displayName}!</h1>
          <span>Senin, 4 April 2026</span>
        </div>

        <div className="dashboard-top-grid">
          <section className="panel summary-panel">
            <h2>Ringkasan Kegiatan</h2>
            <div className="summary-metrics">
              {['Menu Dibuat', 'Hari Dipantau', 'Skor Gizi Rata-rata', 'Rekomendasi Aktif'].map((label) => (
                <div className="summary-metric" key={label}>
                  <span />
                  <strong>0</strong>
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="panel quick-panel">
            <h2>Aksi Cepat</h2>
            <div className="quick-grid">
              {quickActions.map((item) => (
                <Link className="quick-card" to={item === 'Lihat Rekomendasi' ? '/rekomendasi' : '/dashboard'} key={item}>
                  <span />
                  <div>
                    <strong>{item}</strong>
                    <p>{item === 'Buat Menu Baru' ? 'Dapatkan rekomendasi menu harian' : 'Lihat dan kelola data gizi anak'}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="dashboard-bottom-grid">
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
            <Link className="panel-link" to="/dashboard">Lihat Semua Aktivitas {'->'}</Link>
          </section>

          <aside className="panel latest-panel">
            <h2>Rekomendasi Terakhir</h2>
            <div className="latest-menu">
              <span />
              <div>
                <strong>Menu Seimbang Hari ini</strong>
                <p>Senin, 11 Mei 2026</p>
              </div>
            </div>
            <ul>
              {recommendation.meals.map((meal) => (
                <li key={meal.time}>{meal.menu.split(',')[0]}</li>
              ))}
            </ul>
            <Link className="button button--primary" to="/rekomendasi">Lihat Rincian Menu</Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
