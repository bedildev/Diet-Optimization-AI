import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LocalContext = createContext(null);

const initialUsers = [
  {
    name: 'Demo User',
    email: 'demo@nutriai.local',
    password: 'password123',
  },
];

const initialProfile = {
  goal: 'Menjaga energi harian',
  calories: 2100,
  budget: 45000,
  allergy: 'Tidak ada',
  diet: 'Seimbang',
};

const initialRecommendation = {
  summary: 'Menu tinggi protein, kaya serat, dan tetap hemat untuk aktivitas produktif.',
  score: 92,
  meals: [
    {
      time: 'Sarapan',
      menu: 'Oat pisang, telur rebus, dan susu rendah lemak',
      calories: 520,
      protein: 28,
      cost: 14000,
    },
    {
      time: 'Makan siang',
      menu: 'Nasi merah, ayam panggang, tumis buncis, dan tempe',
      calories: 760,
      protein: 46,
      cost: 21000,
    },
    {
      time: 'Makan malam',
      menu: 'Sup tahu sayur, kentang kukus, dan pepaya',
      calories: 610,
      protein: 31,
      cost: 17000,
    },
  ],
};

function readStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

function normalizeRecommendation(value) {
  if (!value || !Array.isArray(value.meals)) {
    return initialRecommendation;
  }

  return value;
}

function normalizeUsers(value) {
  return Array.isArray(value) ? value : initialUsers;
}

function normalizeProfile(value) {
  if (!value || typeof value !== 'object') {
    return initialProfile;
  }

  return { ...initialProfile, ...value };
}

function LocalProvider({ children }) {
  const [users, setUsers] = useState(() => normalizeUsers(readStorage('nutriai-users', initialUsers)));
  const [authUser, setAuthUser] = useState(() => readStorage('nutriai-auth-user', null));
  const [profile, setProfile] = useState(() => normalizeProfile(readStorage('nutriai-profile', initialProfile)));
  const [recommendation, setRecommendation] = useState(() => normalizeRecommendation(readStorage('nutriai-recommendation', initialRecommendation)));

  useEffect(() => {
    localStorage.setItem('nutriai-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('nutriai-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('nutriai-recommendation', JSON.stringify(recommendation));
  }, [recommendation]);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('nutriai-auth-user', JSON.stringify(authUser));
      return;
    }

    localStorage.removeItem('nutriai-auth-user');
  }, [authUser]);

  function register({ name, email, password }) {
    const normalizedEmail = email.toLowerCase();
    const isRegistered = users.some((user) => user.email === normalizedEmail);

    if (isRegistered) {
      throw new Error('Email sudah terdaftar.');
    }

    setUsers((currentUsers) => [
      ...currentUsers,
      { name, email: normalizedEmail, password },
    ]);
  }

  function login({ email, password }) {
    const normalizedEmail = email.toLowerCase();
    const user = users.find((item) => item.email === normalizedEmail && item.password === password);

    if (!user) {
      throw new Error('Email atau password tidak sesuai.');
    }

    setAuthUser({ name: user.name, email: user.email });
  }

  function logout() {
    setAuthUser(null);
  }

  function optimizeMenu(nextProfile) {
    setProfile(nextProfile);

    const calories = Number(nextProfile.calories);
    const budget = Number(nextProfile.budget);
    const breakfast = Math.round(calories * 0.25);
    const lunch = Math.round(calories * 0.4);
    const dinner = calories - breakfast - lunch;

    const dietMenu = {
      Seimbang: ['Telur dadar bayam', 'Ayam panggang', 'Sup tahu sayur'],
      'Tinggi protein': ['Greek yogurt dan telur', 'Dada ayam lada hitam', 'Tumis tempe brokoli'],
      Vegetarian: ['Oat chia dan kedelai', 'Gado-gado telur', 'Sup kacang merah'],
      'Rendah gula': ['Roti gandum alpukat', 'Ikan kukus', 'Capcay tofu'],
    };

    const selected = dietMenu[nextProfile.diet] || dietMenu.Seimbang;

    setRecommendation({
      summary: `Optimasi dibuat untuk target "${nextProfile.goal}" dengan batas Rp${budget.toLocaleString('id-ID')} per hari.`,
      score: Math.min(98, Math.max(75, Math.round(88 + (budget / 20000)))),
      meals: [
        {
          time: 'Sarapan',
          menu: `${selected[0]}, buah lokal, dan air putih`,
          calories: breakfast,
          protein: nextProfile.diet === 'Tinggi protein' ? 34 : 24,
          cost: Math.round(budget * 0.28),
        },
        {
          time: 'Makan siang',
          menu: `${selected[1]}, nasi merah, sayur hijau, dan tempe`,
          calories: lunch,
          protein: nextProfile.diet === 'Vegetarian' ? 32 : 44,
          cost: Math.round(budget * 0.43),
        },
        {
          time: 'Makan malam',
          menu: `${selected[2]}, kentang kukus, dan pepaya`,
          calories: dinner,
          protein: nextProfile.diet === 'Tinggi protein' ? 36 : 28,
          cost: Math.round(budget * 0.29),
        },
      ],
    });
  }

  const contextValue = useMemo(() => ({
    authUser,
    login,
    logout,
    optimizeMenu,
    profile,
    recommendation,
    register,
  }), [authUser, profile, recommendation, users]);

  return (
    <LocalContext.Provider value={contextValue}>
      {children}
    </LocalContext.Provider>
  );
}

function useLocal() {
  const context = useContext(LocalContext);

  if (!context) {
    throw new Error('useLocal harus digunakan di dalam LocalProvider.');
  }

  return context;
}

export { LocalProvider, useLocal };
