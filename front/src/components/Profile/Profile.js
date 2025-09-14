import React from 'react';
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';

import BookingPage from '../Booking/BookingPage';
import MyBookings from './MyBookings';
import Donations from './Donations';
import ProfileInfo from './ProfileInfo';

export default function Profile() {
  const location = useLocation();

  const menuItems = [
    { path: 'info', label: 'Информация' },
    { path: 'booking', label: 'Оформить бронь' },
    { path: 'my-bookings', label: 'Мои брони' },
    { path: 'donations', label: 'Донаты' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '80vh', fontFamily: "'Montserrat', Arial, sans-serif" }}>
      <nav
        style={{
          width: '220px',
          background: 'rgba(32, 35, 54, 0.9)',
          padding: '1rem',
          borderRadius: '12px',
          marginRight: '2rem',
          color: '#c9cee3',
        }}
      >
        <h3 style={{ color: '#19dfa5', marginBottom: '1rem' }}>Меню профиля</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {menuItems.map(item => (
            <li key={item.path} style={{ margin: '1rem 0' }}>
              <NavLink
                to={`/profile/${item.path}`}  // абсолютный путь для корректной навигации
                end={item.path === 'info'}    // чтобы "Информация" была активной только на точном совпадении
                style={({ isActive }) => ({
                  color: isActive ? '#40c6f6' : '#c9cee3',
                  textDecoration: 'none',
                  fontWeight: isActive ? '700' : 'normal',
                })}
                replace={true} // заменять историю, а не добавлять
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route index element={<Navigate to="info" replace />} />
          <Route path="info" element={<ProfileInfo />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="donations" element={<Donations />} />
          <Route path="*" element={<div>Выберите раздел в меню слева.</div>} />
        </Routes>
      </main>
    </div>
  );
}
