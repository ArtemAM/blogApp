import e from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { db, initializeDatabase } from "./db.js";
import { registerValidation } from "./validations/register.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

dotenv.config();
const app = e();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

// Инициализация базы данных
initializeDatabase();

app.use(e.json());

app.get("/", (req, res) => {
	res.send("Hello World! This is the backend server.");
});

app.post("/register", registerValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullName, email, password, avatarUrl } = req.body;

	try {
		// Проверка, существует ли пользователь с таким email
		const queryCheck = `SELECT * FROM users WHERE email = ?`;
		db.get(queryCheck, [email], async (err, user) => {
			if (err) {
				return res.status(500).json({ error: "Database error" });
			}
			if (user) {
				return res.status(400).json({ error: "Email is already in use" });
			}

			// Хэширование пароля
			const passwordHash = await bcrypt.hash(password, 10);

			// Добавление пользователя в базу данных
			const queryInsert = `INSERT INTO users (fullName, email, passwordHash, avatarUrl) VALUES (?, ?, ?, ?)`;
			db.run(
				queryInsert,
				[fullName, email, passwordHash, avatarUrl || null],
				function (err) {
					if (err) {
						console.error("Error inserting user:", err); // Логируем ошибку
						return res.status(500).json({ error: "Error registering user" });
					}

					// Генерация токена на основе ID пользователя
					const token = jwt.sign({ id: this.lastID }, SECRET_KEY, {
						expiresIn: "1h",
					});

					// Возвращаем ответ с токеном
					res.status(201).json({
						message: "User registered successfully",
						userId: this.lastID,
						token,
					});
				}
			);
		});
	} catch (err) {
		res.status(500).json({ error: "Internal server error" });
	}
});

app.post("/login", (req, res) => {
	jwt.sign(
		{ email: req.body.email, password: req.body.password },
		SECRET_KEY,
		{ expiresIn: "1h" },
		(err, token) => {
			if (err) {
				return res.status(500).json({ error: "Error generating token" });
			}
			res.json({ token });
		}
	);
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}
	console.log(`Server is running on port ${PORT}`);
});
