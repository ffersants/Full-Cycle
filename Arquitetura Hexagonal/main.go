package main

import (
	"database/sql"

	db2 "github.com/ffersants/full-cycle/adapters/db"
	"github.com/ffersants/full-cycle/application"
)

func main() {
	db, _ := sql.Open("sqlite3", "db.sqlite")
	productDbAdapter := db2.NewProductDb(db)
	productService := application.NewProductService(productDbAdapter)
	productService.Create("teste produto", 25)
}
