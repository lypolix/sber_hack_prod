package handlers

import (
	"net/http"
	"sber_hack/back/repositories"
	"github.com/gin-gonic/gin"
)

// Возвращает список бронирований пользователя по userID из контекста (или параметров, авторизация должна быть)
// Тут для примера userID заглушка int, надо привести к int64 для вызова репозитория
func GetUserBookings(c *gin.Context) {
	userIDInt := 1 // TODO: получить из JWT/сессии как int или иной тип

	// Приводим int к int64
	userID := int64(userIDInt)

	bookings, err := repositories.GetBookingsByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get bookings"})
		return
	}

	c.JSON(http.StatusOK, bookings)
}
