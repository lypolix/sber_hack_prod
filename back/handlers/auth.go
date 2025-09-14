package handlers

import (
    "net/http"
    "os"
    "time"
    "sber_hack/back/models"
    "sber_hack/back/repositories"
    "sber_hack/back/utils"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)


type AuthRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=6"`
}

func RegisterHandler(c *gin.Context) {
    var req AuthRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    existingUser, _ := repositories.GetUserByEmail(req.Email)
    if existingUser != nil {
        c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
        return
    }

    hashedPassword, err := utils.HashPassword(req.Password)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }

    user := &models.User{
        Email:    req.Email,
        Password: hashedPassword,
    }

    if err := repositories.CreateUser(user); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

func LoginHandler(c *gin.Context) {
    var req AuthRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    user, err := repositories.GetUserByEmail(req.Email)
    if err != nil || user == nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    if !utils.CheckPasswordHash(req.Password, user.Password) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
        return
    }

    // Получаем секрет из окружения
    jwtSecret := []byte(os.Getenv("JWT_SECRET"))
    if len(jwtSecret) == 0 {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT secret is not configured"})
        return
    }

    // Генерация JWT токена
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user_id": user.ID,
        "exp":     time.Now().Add(time.Hour * 72).Unix(), // срок жизни токена 72 часа
    })

    tokenString, err := token.SignedString(jwtSecret)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message": "Login successful",
        "token":   tokenString,
    })
}
