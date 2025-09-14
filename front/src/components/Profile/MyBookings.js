import React, { useEffect, useState } from "react";

// Форматирование даты для пользователя
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" });
}

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Пользователь не авторизован");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/bookings", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Требуется авторизация");
        if (!res.ok) throw new Error("Ошибка загрузки бронирований");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ color: "#c9cee3", textAlign: "center", marginTop: 50 }}>
        Загрузка бронирований...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: 50 }}>
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "28px 20px 20px 20px",
        background: "rgba(32, 35, 54, 0.96)",
        borderRadius: 22,
        boxShadow: "0 10px 40px #1c184a",
        color: "#f5f6fa",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 26,
          letterSpacing: 0.5,
          background: "linear-gradient(95deg, #19dfa5, #40c6f6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Ваши бронирования
      </h2>

      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", color: "#c9cee3", fontSize: 20, padding: "40px 0" }}>
          Бронирования мест пока не найдены.<br />
          <span role="img" aria-label="no bookings">🪑</span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {bookings.map((b) => (
            <div
              key={b.id}
              style={{
                background: "#232743",
                borderRadius: 14,
                boxShadow: "0 2px 16px #0009",
                display: "flex",
                alignItems: "center",
                padding: "22px 26px",
                gap: 28,
                position: "relative",
              }}
            >
              <div
                style={{
                  minWidth: 64,
                  height: 64,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(95deg, #19dfa5a8 0%, #40c6f699 80%)",
                  color: "#272743",
                  fontWeight: 900,
                  fontSize: 28,
                  boxShadow: "0 4px 10px #222",
                }}
              >
                {b.place_name.replace(/[^0-9]/g, "") || <span>🍪</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#19dfa5", marginBottom: 4 }}>
                  {b.place_name}
                  <span style={{ color: "#fff", marginLeft: 15 }}>
                    Место: <b style={{ color: "#41bbae" }}>{b.seat_number}</b>
                  </span>
                </div>
                <div style={{ fontSize: 17, marginBottom: 5, color: "#bfcada" }}>
                  <span>
                    Дата: <b style={{ color: "#fff" }}>{formatDate(b.start_time)}</b>
                  </span>
                  {/* Убрано отображение времени бронирования */}
                </div>
                <div style={{ fontSize: 15, color: "#5f87ad" }}>
                  Забронировано: {new Date(b.created_at).toLocaleString()}
                </div>
              </div>
              <div style={{ alignSelf: "flex-start", fontSize: 32, color: "#62e2c4", marginLeft: 8 }}>
                🪑
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
