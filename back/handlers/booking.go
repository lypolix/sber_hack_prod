package handlers

import (
    "fmt"
    "net/http"
    "sber_hack/back/repositories"
    "time"

    "github.com/gin-gonic/gin"
)

type BookingRequest struct {
    PlaceName  string `json:"place_name" binding:"required"`
    SeatNumber int    `json:"seat_number" binding:"required"`
    Date       string `json:"date" binding:"required"` // в формате YYYY-MM-DD
}

func CreateBookingHandler(c *gin.Context) {
    var req BookingRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }
    userID, ok := userIDValue.(int64)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
        return
    }

    date, err := time.Parse("2006-01-02", req.Date)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
        return
    }

    // Пример фиксированного времени брони (можно сделать более гибко)
    startTime := time.Date(date.Year(), date.Month(), date.Day(), 17, 0, 0, 0, time.Local)
    endTime := time.Date(date.Year(), date.Month(), date.Day(), 20, 0, 0, 0, time.Local)

    booking := &repositories.Booking{
        UserID:    userID,
        PlaceName: req.PlaceName,
        SeatNumber: req.SeatNumber,
        StartTime: startTime,
        EndTime:   endTime,
    }

    if err := repositories.CreateBooking(booking); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create booking"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Booking created successfully"})
}

func GetUserBookings(c *gin.Context) {
    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }
    userID, ok := userIDValue.(int64)
    if !ok {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
        return
    }

    bookings, err := repositories.GetBookingsByUserID(userID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get bookings"})
        return
    }

    c.JSON(http.StatusOK, bookings)
}

func GetBookedSeatsHandler(c *gin.Context) {
    dateStr := c.Query("date")
    if dateStr == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "date query parameter required"})
        return
    }
    date, err := time.Parse("2006-01-02", dateStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid date format"})
        return
    }

    seatsMap, err := repositories.GetBookedSeatsByDate(date)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get booked seats"})
        return
    }

    // Преобразуем ключи из place_name ("стол X") в числовые tableId
    converted := make(map[int][]int)
    for placeName, seats := range seatsMap {
        var tableNum int
        _, err := fmt.Sscanf(placeName, "стол %d", &tableNum)
        if err != nil {
            continue // если не соответствует формату, игнорируем
        }
        converted[tableNum] = seats
    }

    c.JSON(http.StatusOK, converted) // map[int][]int: tableId -> []seatNumbers
}

func BookSeatHandler(c *gin.Context) {
    userIDValue, exists := c.Get("userID")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        return
    }
    userID := userIDValue.(int64)

    var req struct {
        Date       string `json:"date"`
        TableId    int    `json:"tableId"`
        SeatNumber int    `json:"seatNumber"`
    }
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }
    date, err := time.Parse("2006-01-02", req.Date)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
        return
    }

    placeName := fmt.Sprintf("стол %d", req.TableId)
    startTime := time.Date(date.Year(), date.Month(), date.Day(), 17, 0, 0, 0, date.Location())
    endTime := time.Date(date.Year(), date.Month(), date.Day(), 20, 0, 0, 0, date.Location())

    booking := &repositories.Booking{
        UserID:     userID,
        PlaceName:  placeName,
        SeatNumber: req.SeatNumber,
        StartTime:  startTime,
        EndTime:    endTime,
    }

    err = repositories.CreateBooking(booking)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to book seat"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Seat booked successfully"})
}
