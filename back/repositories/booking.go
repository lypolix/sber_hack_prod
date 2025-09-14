package repositories

import (
    "sber_hack/back/config"
    "time"
)

type Booking struct {
    ID         int64     `json:"id"`
    UserID     int64     `json:"user_id"`
    PlaceName  string    `json:"place_name"`
    SeatNumber int       `json:"seat_number"`
    StartTime  time.Time `json:"start_time"`
    EndTime    time.Time `json:"end_time"`
    CreatedAt  time.Time `json:"created_at"`
}

// CreateBooking создаёт новую запись бронирования
func CreateBooking(b *Booking) error {
    _, err := config.DB.Exec(`
        INSERT INTO bookings (user_id, place_name, seat_number, start_time, end_time) 
        VALUES ($1, $2, $3, $4, $5)
    `, b.UserID, b.PlaceName, b.SeatNumber, b.StartTime, b.EndTime)
    return err
}

// GetBookingsByUserID возвращает список бронирований по userID
func GetBookingsByUserID(userID int64) ([]*Booking, error) {
    rows, err := config.DB.Query(`
        SELECT id, user_id, place_name, seat_number, start_time, end_time, created_at
        FROM bookings WHERE user_id = $1 ORDER BY start_time DESC
    `, userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var bookings []*Booking
    for rows.Next() {
        b := &Booking{}
        if err := rows.Scan(&b.ID, &b.UserID, &b.PlaceName, &b.SeatNumber, &b.StartTime, &b.EndTime, &b.CreatedAt); err != nil {
            return nil, err
        }
        bookings = append(bookings, b)
    }
    return bookings, nil
}

// GetBookedSeatsByDate возвращает map place_name -> []занятых seat_number для указанной даты
func GetBookedSeatsByDate(date time.Time) (map[string][]int, error) {
    rows, err := config.DB.Query(`
        SELECT place_name, seat_number FROM bookings 
        WHERE DATE(start_time) = $1
    `, date.Format("2006-01-02"))
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    booked := make(map[string][]int)
    for rows.Next() {
        var place string
        var seat int
        if err := rows.Scan(&place, &seat); err != nil {
            return nil, err
        }
        booked[place] = append(booked[place], seat)
    }
    return booked, nil
}
