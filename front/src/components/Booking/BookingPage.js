import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const tables = [
  { id: 1, label: "Стол 1", seats: 6 },
  { id: 2, label: "Стол 2", seats: 6 },
  { id: 3, label: "Стол с печеньками", seats: 0, isCookies: true },
  { id: 4, label: "Стол 4", seats: 6 },
  { id: 5, label: "Стол 5", seats: 6 },
  { id: 6, label: "Стол 6", seats: 6 },
];

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [booked, setBooked] = useState({}); // { [dateKey]: { [tableId]: [seatNums] } }

  // Загрузка занятых мест с backend при изменении даты
  useEffect(() => {
    async function loadBooked() {
      const token = localStorage.getItem("jwtToken");
      const dateKey = getDateKey(selectedDate);
      if (!token) {
        setError("Пользователь не авторизован");
        setBooked({});
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/booked-seats?date=${dateKey}`, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        if (!response.ok) throw new Error("Ошибка загрузки забронированных мест");
        const data = await response.json();
        setBooked({ [dateKey]: data });
        setError("");
      } catch (e) {
        setError(e.message || "Ошибка загрузки");
        setBooked({});
      }
    }
    loadBooked();
  }, [selectedDate]);

  const currentBookedSeats = () => {
    const dateKey = getDateKey(selectedDate);
    return booked[dateKey]?.[selectedTable] || [];
  };

  const handleBook = async () => {
    if (!selectedTable || !selectedSeat) {
      setError("Выберите стол и место!");
      setSuccess("");
      return;
    }
    const dateKey = getDateKey(selectedDate);
    const tableBooked = booked[dateKey]?.[selectedTable] || [];
    if (tableBooked.includes(selectedSeat)) {
      setError("Место уже занято!");
      setSuccess("");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Пользователь не авторизован");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({
          date: dateKey,
          tableId: selectedTable,
          seatNumber: selectedSeat
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Ошибка бронирования");
      }
      // Обновляем локально список занятых мест
      setBooked(prev => {
        const newBooked = { ...prev };
        if (!newBooked[dateKey]) newBooked[dateKey] = {};
        if (!newBooked[dateKey][selectedTable]) newBooked[dateKey][selectedTable] = [];
        newBooked[dateKey][selectedTable] = [...newBooked[dateKey][selectedTable], selectedSeat];
        return newBooked;
      });
      setSuccess(
        `Бронирование успешно: ${tables.find(t => t.id === selectedTable).label}, место ${selectedSeat}, дата ${selectedDate.toLocaleDateString()}`
      );
      setError("");
      setSelectedSeat(null);
    } catch (e) {
      setError(e.message);
      setSuccess("");
    }
  };

  const handleTableSelect = (tableId, isCookies) => {
    if (isCookies) return;
    setSelectedTable(tableId);
    if (selectedTable !== tableId) setSelectedSeat(null);
    setError("");
    setSuccess("");
  };

  const handleSeatSelect = (seatNum) => {
    if (currentBookedSeats().includes(seatNum)) {
      setError("Это место уже занято!");
      setSuccess("");
      return;
    }
    setSelectedSeat(seatNum);
    setError("");
    setSuccess("");
  };

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: 20, color: "#ecebf2", background: "#181e2c", borderRadius: 16 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24, color: "#ecebf2" }}>Бронирование места</h2>
      <div style={{ display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "space-around", alignItems: "flex-start" }}>
        <div style={{ minWidth: 300 }}>
          <label style={{ fontWeight: 600, marginBottom: 8, display: "block", color: "#ecebf2" }}>Выберите дату:</label>
          <div style={{ background: "#232c4b", borderRadius: 12, padding: "10px 8px" }}>
            <ReactCalendar
              onChange={date => {
                setSelectedDate(date);
                setSelectedSeat(null);
                setSuccess("");
                setError("");
              }}
              value={selectedDate}
              minDate={new Date()}
            />
          </div>
        </div>
        <div style={{ minWidth: 370 }}>
          <label style={{ fontWeight: 600, marginBottom: 8, display: "block", color: "#ecebf2" }}>Выберите стол и место:</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Верхний ряд */}
            <div style={{ display: "flex", gap: 18 }}>
              {tables.slice(0, 3).map(table => (
                <div key={table.id} style={{ minWidth: 90, textAlign: "center" }}>
                  <div
                    onClick={() => handleTableSelect(table.id, table.isCookies)}
                    style={{
                      padding: "8px 0",
                      borderRadius: 9,
                      background: table.isCookies
                        ? "#fceabb"
                        : selectedTable === table.id
                          ? "#19dfa5"
                          : "#232c4b",
                      color: table.isCookies ? "#d2691e" : "#ecebf2",
                      fontWeight: 600,
                      boxShadow: "0 2px 8px #232c4bb1",
                      cursor: table.isCookies ? "default" : "pointer",
                      marginBottom: 6,
                      border: table.isCookies ? "2px dashed #FFA07A" : "none",
                      fontSize: 16,
                      userSelect: "none",
                    }}
                  >
                    {table.label}
                    {table.isCookies && " 🍪"}
                  </div>
                  {!table.isCookies && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                      {[...Array(table.seats)].map((_, idx) => {
                        const seatNum = idx + 1;
                        const busy = booked[getDateKey(selectedDate)]?.[table.id]?.includes(seatNum);
                        const selected = selectedSeat === seatNum && selectedTable === table.id;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSeatSelect(seatNum)}
                            disabled={selectedTable !== table.id || busy}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: "50%",
                              border: busy ? "2px solid #ff4b6c" : (selected ? "2px solid #19dfa5" : "1px solid #b5c7f2"),
                              background: busy ? "#ffdddd" : (selected ? "#37f4a1" : "#ecebf2"),
                              color: busy ? "#ff4b6c" : "#222",
                              fontWeight: 600,
                              cursor: busy ? "not-allowed" : (selectedTable === table.id ? "pointer" : "not-allowed"),
                              opacity: busy ? 0.5 : 1,
                            }}>
                            {seatNum}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Нижний ряд */}
            <div style={{ display: "flex", gap: 18 }}>
              {tables.slice(3).map(table => (
                <div key={table.id} style={{ minWidth: 90, textAlign: "center" }}>
                  <div
                    onClick={() => handleTableSelect(table.id, table.isCookies)}
                    style={{
                      padding: "8px 0",
                      borderRadius: 9,
                      background: selectedTable === table.id ? "#19dfa5" : "#232c4b",
                      color: "#ecebf2",
                      fontWeight: 600,
                      boxShadow: "0 2px 8px #232c4bb1",
                      cursor: "pointer",
                      marginBottom: 6,
                      fontSize: 16,
                    }}
                  >
                    {table.label}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                    {[...Array(table.seats)].map((_, idx) => {
                      const seatNum = idx + 1;
                      const busy = booked[getDateKey(selectedDate)]?.[table.id]?.includes(seatNum);
                      const selected = selectedSeat === seatNum && selectedTable === table.id;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSeatSelect(seatNum)}
                          disabled={selectedTable !== table.id || busy}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            border: busy ? "2px solid #ff4b6c" : (selected ? "2px solid #19dfa5" : "1px solid #b5c7f2"),
                            background: busy ? "#ffdddd" : (selected ? "#37f4a1" : "#ecebf2"),
                            color: busy ? "#ff4b6c" : "#222",
                            fontWeight: 600,
                            cursor: busy ? "not-allowed" : (selectedTable === table.id ? "pointer" : "not-allowed"),
                            opacity: busy ? 0.5 : 1
                          }}>
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 400, margin: "25px auto 0 auto", textAlign: "center", color: "#ecebf2" }}>
        {error && <div className="error" style={{ color: "#ff4b6c" }}>{error}</div>}
        {success && <div className="success" style={{ color: "#19d47a" }}>{success}</div>}
        <button
          className="misis-btn"
          style={{ fontSize: 18, width: "100%", marginTop: 12 }}
          onClick={handleBook}
        >
          Подтвердить бронирование
        </button>
      </div>
    </div>
  );
}
