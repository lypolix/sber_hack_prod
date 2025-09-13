import React from "react";

// Имитация данных о бронированиях пользователя.
// В реальном проекте это должно приходить с backend/API.
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

export default function MyBookings() {
  // В будущем тут должен быть fetch/axios запрос на backend
  const bookings = myBookingsSample; // Здесь реальные данные пользователя

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
      {bookings.length === 0 ? (
        <div style={{ textAlign: "center", color: "#c9cee3", fontSize: 20, padding: "40px 0 28px 0" }}>
          Бронирования мест пока не найдены.<br />
          <span role="img" aria-label="no bookings">🪑</span>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {bookings.map((b) => (
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
