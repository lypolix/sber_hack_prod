package config

import (
    "database/sql"
    "log"
    "sync"

    _ "github.com/lib/pq"
)

var (
    DB   *sql.DB
    once sync.Once
)

func InitDB() {
    once.Do(func() {
        var err error
        connStr := "postgres://postgres:1234@localhost:5432/sberhackdb?sslmode=disable"
        DB, err = sql.Open("postgres", connStr)
        if err != nil {
            log.Fatal("DB connection error:", err)
        }
        if err = DB.Ping(); err != nil {
            log.Fatal("DB ping error:", err)
        }
        log.Println("Database connected")
    })
}
