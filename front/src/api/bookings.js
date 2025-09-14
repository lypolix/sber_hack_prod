// bookings.js

// Получение списка бронирований пользователя
export async function fetchUserBookings() {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Нет токена авторизации");
  
    const res = await fetch("http://localhost:8080/api/bookings", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
  
    if (res.status === 401) {
      throw new Error("Не авторизован");
    }
  
    if (!res.ok) {
      throw new Error("Ошибка при загрузке бронирований");
    }
  
    return await res.json();
  }
  
  // Получение забронированных на дату мест (через API /booked-seats)
  export async function fetchBookedSeats(date) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Нет токена авторизации");
  
    const res = await fetch(`http://localhost:8080/api/booked-seats?date=${date}`, {
      headers: { Authorization: "Bearer " + token }
    });
  
    if (!res.ok) throw new Error("Ошибка загрузки");
  
    // Ожидается объект вида { [tableId]: [seatNumbers] }
    return await res.json();
  }
  
  // Бронирование конкретного места
  export async function bookSeat(tableId, seatNumber, date) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Нет токена авторизации");
  
    const res = await fetch("http://localhost:8080/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ tableId, seatNumber, date })
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Ошибка бронирования");
    }
  }
  