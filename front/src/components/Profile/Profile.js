import React, { useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import BookingPage from '../Booking/BookingPage';

// ====== Оформленный компонент МОИ БРОНИ ======
function MyBookings() {
  const myBookingsSample = [
    {
      id: 1,
      tableLabel: "Стол 2",
      seat: 4,
      date: "2025-09-15",
      timeFrom: "17:00",
      timeTo: "20:00",
      createdAt: "2025-09-13 13:15",
    },
    {
      id: 2,
      tableLabel: "Стол 4",
      seat: 2,
      date: "2025-09-16",
      timeFrom: "15:00",
      timeTo: "18:00",
      createdAt: "2025-09-14 11:47",
    },
    {
      id: 3,
      tableLabel: "Стол 1",
      seat: 6,
      date: "2025-09-17",
      timeFrom: "19:00",
      timeTo: "22:00",
      createdAt: "2025-09-14 12:55",
    },
  ];

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
  }

  return (
    <div style={{
      maxWidth: 800,
      margin: "0 auto",
      padding: "28px 20px 20px 20px",
      background: "rgba(32, 35, 54, 0.96)",
      borderRadius: 22,
      boxShadow: "0 10px 40px #1c1849a0",
      color: "#f5f6fa"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 26,
        letterSpacing: 0.5,
        background: "linear-gradient(95deg, #19dfa5 0%, #40c6f6 80%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        Ваши бронирования
      </h2>
      {myBookingsSample.length === 0 ? (
        <div style={{ textAlign: "center", color: "#c9cee3", fontSize: 20, padding: "40px 0 28px 0" }}>
          Бронирования мест пока не найдены.<br />
          <span role="img" aria-label="no bookings">🪑</span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {myBookingsSample.map((b) => (
            <div key={b.id} style={{
              background: "#232743",
              borderRadius: 14,
              boxShadow: "0 2px 16px #0002",
              display: "flex",
              alignItems: "center",
              padding: "22px 26px",
              gap: 28,
              position: "relative"
            }}>
              <div style={{
                minWidth: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(95deg, #19dfa587 0%, #40c6f699 80%)",
                color: "#27213b",
                fontWeight: 900,
                fontSize: 28,
                boxShadow: "0 4px 10px #2221"
              }}>
                {b.tableLabel.replace(/[^0-9]/g, '') || <span>🍪</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#19dfa5", marginBottom: 4 }}>
                  {b.tableLabel}
                  <span style={{ color: "#fff", marginLeft: 15 }}>
                    Место: <b style={{ color: "#41bbae" }}>{b.seat}</b>
                  </span>
                </div>
                <div style={{ fontSize: 17, marginBottom: 5, color: "#bfcada" }}>
                  <span>Дата: <b style={{ color: "#fff" }}>{formatDate(b.date)}</b></span>
                  <span style={{ marginLeft: 17 }}>
                    Время: <b style={{ color: "#fff" }}>{b.timeFrom} – {b.timeTo}</b>
                  </span>
                </div>
                <div style={{ fontSize: 15, color: "#5ec2ff" }}>
                  Забронировано: {b.createdAt}
                </div>
              </div>
              <div style={{
                alignSelf: "flex-start",
                fontSize: 32,
                color: "#62e2c4",
                marginLeft: 8
              }}>🪑</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ====== Боковая панель с навигацией ======
function ProfileSidebar({ isOpen, toggle }) {
  const location = useLocation();
  const links = [
    { to: '/profile/booking', label: 'Бронь места' },
    { to: '/profile/my-bookings', label: 'Мои брони' },
    { to: '/profile/donations', label: 'Донаты' },
  ];
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: isOpen ? 0 : '-240px',
        width: 240,
        height: '100%',
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        transition: 'left 0.3s ease',
        boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        paddingTop: 30,
      }}
    >
      <button
        onClick={toggle}
        style={{
          position: 'absolute',
          top: 15,
          right: -40,
          width: 35,
          height: 35,
          borderRadius: '50%',
          border: 'none',
          background: '#3b82f6',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? '◀' : '▶'}
      </button>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {links.map(({ to, label }) => (
            <li key={to} style={{ marginBottom: 15 }}>
              <Link
                to={to}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  borderRadius: 8,
                  backgroundColor:
                    location.pathname === to ? '#2563eb' : 'transparent',
                  color:
                    location.pathname === to ? '#e0e7ff' : '#cbd5e1',
                  fontWeight: location.pathname === to ? '700' : '500',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

// ====== Профиль пользователя ======
function UserProfile() {
  const user = {
    email: 'user@example.com',
    role: 'user',
    name: 'Иван Иванов',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  };
  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        padding: 30,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <img
          src={user.avatarUrl}
          alt="User avatar"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 0 12px rgba(59,130,246,0.5)',
          }}
        />
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>{user.name}</h2>
      <div style={{ fontSize: 18, color: '#374151', lineHeight: 1.6 }}>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
      </div>
    </div>
  );
}

// ====== Красивая страница донатов ======
function Donations() {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      setError('Введите корректную сумму.');
      setSuccess('');
      return;
    }
    setSuccess('Спасибо за вашу поддержку!');
    setError('');
    setAmount('');
    // Тут можно добавить API-запрос на внесение доната, если потребуется
  }

  return (
    <div className="donations-page" style={{
      maxWidth: 430,
      margin: '55px auto 0',
      background: 'rgba(32, 35, 54, 0.96)',
      borderRadius: 22,
      boxShadow: '0 16px 48px #1c1849a0',
      padding: '2.8rem 2.2rem 2.1rem 2.2rem',
      textAlign: 'center',
      color: '#ecebf2'
    }}>
      <h2
        style={{
          fontSize: '2.3rem',
          background: 'linear-gradient(92deg, #19dfa5 0%, #40c6f6 85%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          marginBottom: '1.1rem'
        }}
      >Донаты для команды</h2>
      <p style={{ color: '#c9cee3', fontSize: '1.14rem', marginBottom: '1.8rem' }}>
        Поддержите наш проект и внесите свой вклад в развитие команды MISIS × Sber.<br />
        Все средства идут на организацию будущих мероприятий, печеньки и техническое обновление.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: '1.1rem' }}>
        <input
          type="number"
          className="input"
          style={{
            width: '100%', padding: '1rem', borderRadius: 9,
            background: '#212433', color: '#ecebf2', fontSize: '1.21rem', border: '1.4px solid #40c6f6'
          }}
          value={amount}
          min={1}
          placeholder="Введите сумму (₽)"
          onChange={e => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="button"
          style={{
            width: '100%', padding: '1.05rem', marginTop: '0.7rem',
            background: 'linear-gradient(93deg, #19dfa5 0%, #40c6f6 100%)',
            color: '#222', fontWeight: 700, borderRadius: 9, fontSize: '1.19rem'
          }}
        >
          Отправить донат
        </button>
      </form>
      {success && <div className="success" style={{ color: '#19d47a', fontWeight: 600, marginTop: '1.5rem' }}>{success}</div>}
      {error && <div className="error" style={{ color: '#ff4b6c', fontWeight: 600, marginTop: '1.2rem' }}>{error}</div>}
      <div style={{ fontSize: '1.05rem', color: '#43d6c3', marginTop: '2.7rem' }}>
        Ваша поддержка — это вдохновение для всей команды.<br />
        Спасибо за вклад в наше будущее!
      </div>
    </div>
  );
}

// ====== Общий компонент ПРОФИЛЯ ======
export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((v) => !v);

  return (
    <div style={{ display: 'flex' }}>
      <ProfileSidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <main
        style={{
          marginLeft: sidebarOpen ? 240 : 0,
          padding: 30,
          flexGrow: 1,
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #fef3c7 100%)',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Routes>
          <Route path="" element={<UserProfile />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="donations" element={<Donations />} />
        </Routes>
      </main>
    </div>
  );
}
