import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './components/Profile/Profile'; // профиль с вложенными маршрутами
import BookingPage from './components/Booking/BookingPage'; // страница бронирования

function App() {
  return (
    <Router>
      <nav style={{ padding: 20, backgroundColor: '#222', color: 'white' }}>
        <Link to="/" style={{ marginRight: 15, color: 'lightblue', textDecoration: 'none' }}>
          Главная
        </Link>
        <Link to="/profile" style={{ marginRight: 15, color: 'lightblue', textDecoration: 'none' }}>
          Профиль
        </Link>
        <Link to="/booking" style={{ marginRight: 15, color: 'lightblue', textDecoration: 'none' }}>
          Бронирование
        </Link>
        <Link to="/login" style={{ color: 'lightblue', textDecoration: 'none' }}>
          Вход
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
