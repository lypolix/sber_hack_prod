package handlers

import (
    "net/http"
    "sber_hack/back/repositories"
    "github.com/gin-gonic/gin"
)

func GetProfileHandler(c *gin.Context) {
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
    user, err := repositories.GetUserByID(userID)
    if err != nil || user == nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "User not found"})
        return
    }
    // Возвращаем пользователя без пароля
    c.JSON(http.StatusOK, gin.H{
        "id": user.ID,
        "email": user.Email,
        // добавьте другие поля по необходимости
    })
}
