package repositories

import (
    "database/sql"
    "sber_hack/back/config"
    "sber_hack/back/models"
)

func CreateUser(user *models.User) error {
    _, err := config.DB.Exec(`INSERT INTO users (email, password) VALUES ($1, $2)`, user.Email, user.Password)
    return err
}

func GetUserByEmail(email string) (*models.User, error) {
    u := &models.User{}
    err := config.DB.QueryRow(`SELECT id, email, password FROM users WHERE email = $1`, email).
        Scan(&u.ID, &u.Email, &u.Password)
    if err == sql.ErrNoRows {
        return nil, nil
    }
    return u, err
}

func GetUserByID(id int64) (*models.User, error) {
    u := &models.User{}
    err := config.DB.QueryRow(`SELECT id, email, password FROM users WHERE id = $1`, id).Scan(&u.ID, &u.Email, &u.Password)
    if err == sql.ErrNoRows {
        return nil, nil
    }
    return u, err
}
