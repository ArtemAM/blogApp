import sqlite3 from "sqlite3";
import createUserTable from "./tables/usersTable.js";
import createPostsTable from "./tables/postsTable.js";
import { seedPosts } from "./seedPosts.js";

// Подключение к базе данных
const db = new sqlite3.Database("./database.sqlite", (err) => {
	if (err) {
		console.error("Error connecting to SQLite database:", err);
	} else {
		console.log("Connected to SQLite database");
	}
});

// Создание таблиц
const initializeDatabase = async () => {
	try {
		// Создаем таблицы последовательно
		await createUserTable(db);
		await createPostsTable(db);

		// Добавляем данные после создания таблиц
		await seedPosts();
		console.log("Database initialized successfully");
	} catch (err) {
		console.error("Error initializing database:", err.message);
	}
};

export { db, initializeDatabase };
