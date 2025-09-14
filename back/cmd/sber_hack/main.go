package main

import (
    "log"
    "os"
    "sber_hack/back/config"
    "sber_hack/back/handlers"
    "sber_hack/back/middlewares"

    "strings"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Проверка и вывод значения JWT_SECRET для отладки
    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        log.Fatal("JWT_SECRET is not set in environment")
    }
    log.Println("JWT_SECRET value:", secret) // Уберите или закомментируйте после проверки

    config.InitDB()

    r := gin.Default()
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // Укажите фронтенд домен
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))

    api := r.Group("/api")
    {
        auth := api.Group("/auth")
        auth.POST("/register", handlers.RegisterHandler)
        auth.POST("/login", handlers.LoginHandler)

        api.GET("/bookings", handlers.GetUserBookings)

        api.GET("/profile", middlewares.JWTAuthMiddleware(), handlers.GetProfileHandler)
    }

    r.Static("/static", "./frontend_build/static")

    r.GET("/", func(c *gin.Context) {
        c.File("./frontend_build/index.html")
    })

    r.NoRoute(func(c *gin.Context) {
        path := c.Request.URL.Path
        if strings.HasPrefix(path, "/api") {
            c.JSON(404, gin.H{"error": "API endpoint not found"})
            return
        }
        if strings.HasPrefix(path, "/static") {
            c.JSON(404, gin.H{"error": "Static file not found"})
            return
        }
        c.File("./frontend_build/index.html")
    })

    log.Println("Server started on :8080")
    r.Run(":8080")
}
