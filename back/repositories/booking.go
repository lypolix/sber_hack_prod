package repositories

import (
	"sber_hack/back/config"
	"time"
)

// Booking модель бронирования
type Booking struct {
	ID        int64     `json:"id"`
	UserID    int64     `json:"user_id"`
	PlaceName string    `json:"place_name"`
	StartTime time.Time `json:"start_time"`
	EndTime   time.Time `json:"end_time"`
}

// GetBookingsByUserID возвращает список бронирований по userID
func GetBookingsByUserID(userID int64) ([]*Booking, error) {
	rows, err := config.DB.Query(
		`SELECT id, user_id, place_name, start_time, end_time
		FROM bookings
		WHERE user_id = $1
		ORDER BY start_time DESC`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []*Booking
	for rows.Next() {
		b := &Booking{}
		err := rows.Scan(&b.ID, &b.UserID, &b.PlaceName, &b.StartTime, &b.EndTime)
		if err != nil {
			return nil, err
		}
		list = append(list, b)
	}
	return list, nil
}
