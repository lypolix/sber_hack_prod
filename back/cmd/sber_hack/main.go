package main

import (
<<<<<<< HEAD
<<<<<<< HEAD
    "log"
    "sber_hack/back/config"
    "sber_hack/back/handlers"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    config.InitDB()
    r := gin.Default()

    r.Use(cors.Default())

    // Отдача фронтенда
    r.Static("/", "./frontend_build")

    // API роуты
    auth := r.Group("/api/auth")
    {
        auth.POST("/register", handlers.RegisterHandler)
        auth.POST("/login", handlers.LoginHandler)
    }

    // Фallback для всех несуществующих маршрутов - отдаём index.html для React SPA
    r.NoRoute(func(c *gin.Context) {
        c.File("./frontend_build/index.html")
    })

    log.Println("Server started on :8080")
    r.Run(":8080")
=======
	"log"
	"sber_hack/back/config"
	"sber_hack/back/handlers"
=======
    "log"
    "sber_hack/back/config"
    "sber_hack/back/handlers"
    "strings"
>>>>>>> 7b691c3 (Сохраняю текущие изменения перед rebase)

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    config.InitDB()
    r := gin.Default()
    r.Use(cors.Default())

    // Группа API
    api := r.Group("/api")
    {
        auth := api.Group("/auth")
        auth.POST("/register", handlers.RegisterHandler)
        auth.POST("/login", handlers.LoginHandler)

        api.GET("/bookings", handlers.GetUserBookings)
        // Другие API маршруты...
    }

    // Раздача статических файлов (React build output)
    r.Static("/static", "./frontend_build/static")

    // Главная страница SPA
    r.GET("/", func(c *gin.Context) {
        c.File("./frontend_build/index.html")
    })

    // Фоллбек для SPA — отдаём index.html на любые не-API запросы
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
        // Все остальные запросы — SPA
        c.File("./frontend_build/index.html")
    })

<<<<<<< HEAD
	log.Println("Server started on :8080")
	r.Run(":8080")
>>>>>>> 1657044 (Удалён подмодуль, добавлен front как обычная рабочая папка)
=======
    log.Println("Server started on :8080")
    r.Run(":8080")
>>>>>>> 7b691c3 (Сохраняю текущие изменения перед rebase)
}
