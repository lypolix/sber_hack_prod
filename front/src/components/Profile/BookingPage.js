import React, { useState, useEffect } from "react";
import Booking from "./Booking";         // Ваш компонент выбора мест
import Calendar from "./Calendar";       // Компонент календаря даты
import { fetchBookedSeats, bookSeat } from "../api/bookings"; // Ваша работа с API

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState({}); // { tableId: [seatNumbers] }
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dateKey = selectedDate.toISOString().split("T")[0];

  // Загружаем забронированные места при смене даты
  useEffect(() => {
    async function loadBooked() {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Пользователь не авторизован");
        setBookedSeats({});
        return;
      }
      try {
        const data = await fetchBookedSeats(dateKey); // запрос к backend с датой
        setBookedSeats(data);
        setError("");
      } catch (e) {
        setError("Ошибка загрузки забронированных мест");
        setBookedSeats({});
      }
    }
    loadBooked();
  }, [dateKey]);

  // Функция бронирования места
  async function handleBook() {
    if (!selectedTable || !selectedSeat) {
      setError("Выберите стол и место");
      setSuccess("");
      return;
    }

    if (bookedSeats[selectedTable]?.includes(selectedSeat)) {
      setError("Место занято");
      setSuccess("");
      return;
    }

    try {
      await bookSeat(selectedTable, selectedSeat, dateKey);
      setSuccess(`Забронировано: стол ${selectedTable}, место ${selectedSeat}, дата ${dateKey}`);
      setError("");
      setBookedSeats(prev => {
        const bookedCopy = { ...prev };
        if (!bookedCopy[selectedTable]) bookedCopy[selectedTable] = [];
        bookedCopy[selectedTable].push(selectedSeat);
        return bookedCopy;
      });
      setSelectedSeat(null);
    } catch (err) {
      setError("Ошибка бронирования");
      setSuccess("");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20, color: "#ecebf2", background: "#181e2c", borderRadius: 16 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#ecebf2" }}>Бронирование</h2>
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <Booking
        tablesSelected={selectedTable}
        onTableSelect={setSelectedTable}
        seatSelected={selectedSeat}
        onSeatSelect={setSelectedSeat}
        bookedSeats={bookedSeats}
      />
      {error && <div style={{ color: "red", marginTop: 15, textAlign: "center" }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 15, textAlign: "center" }}>{success}</div>}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={handleBook}
          style={{
            padding: "10px 24px",
            fontSize: 16,
            cursor: "pointer",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#19dfa5",
            color: "#222",
            fontWeight: "bold",
            boxShadow: "0 4px 12px #1ba98f",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#15c994")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#19dfa5")}
        >
          Забронировать
        </button>
      </div>
    </div>
  );
}
