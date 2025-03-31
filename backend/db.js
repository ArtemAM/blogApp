import sqlite3 from "sqlite3";
import createUserTable from "./tables/usersTable.js";
import createPostsTable from "./tables/postsTable.js";

// Подключение к базе данных
const db = new sqlite3.Database("./database.sqlite", (err) => {
	if (err) {
		console.error("Error connecting to SQLite database:", err);
	} else {
		console.log("Connected to SQLite database");
	}
});

// Создание таблиц
const initializeDatabase = () => {
	createUserTable(db);
	createPostsTable(db);
};

export { db, initializeDatabase };
