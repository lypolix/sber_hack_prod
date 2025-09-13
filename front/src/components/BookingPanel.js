// BookingPanel.js
import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

const BookingPanel = () => {
  const [date, setDate] = useState(null);
  const [seat, setSeat] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (!date) {
      setError('Пожалуйста, выберите дату');
      setSuccess('');
      return;
    }
    if (!seat) {
      setError('Пожалуйста, выберите место');
      setSuccess('');
      return;
    }
    setError('');

    try {
      // Пример вызова API для бронирования (замени URL и данные по необходимости)
      const response = await fetch('http://localhost:8080/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, seat }),
      });

      if (response.ok) {
        setSuccess('Бронирование успешно!');
        setError('');
        setShow(false);
        setDate(null);
        setSeat('');
      } else {
        const data = await response.json();
        setError(data.error || 'Ошибка при бронировании');
        setSuccess('');
      }
    } catch (err) {
      setError('Ошибка сети');
      setSuccess('');
    }
  };

  return (
    <div>
      <button onClick={() => setShow(true)} className="misis-btn">
        Забронировать место
      </button>
      {show && (
        <div className="booking-card">
          <Calendar
            selected={date}
            onChange={setDate}
            minDate={new Date()}
          />
          <select value={seat} onChange={e => setSeat(e.target.value)} className="input">
            <option value="">Выберите место</option>
            <option value="table1">Стол 1 (6 мест)</option>
            <option value="table2">Стол 2 (6 мест)</option>
            <option value="table3">Стол с печеньками</option>
            {/* Добавьте остальные места по необходимости */}
          </select>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button onClick={handleSubmit} className="button">Подтвердить бронь</button>
          <button onClick={() => setShow(false)} className="button" style={{marginLeft: '10px', background: '#c0392b'}}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
