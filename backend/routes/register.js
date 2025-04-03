import { Router } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { registerValidation } from "../validations.js";
import { findUserByEmail, createUser } from "../services/userService.js";
import { generateToken } from "../utils/token.js";

const router = Router();

router.post("/register", registerValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { fullName, email, password, avatarUrl } = req.body;

	try {
		// Проверка, существует ли пользователь с таким email
		const user = await findUserByEmail(email);
		if (user) {
			return res.status(400).json({ error: "Email is already in use" });
		}

		// Хэширование пароля
		const passwordHash = await bcrypt.hash(password, 10);

		// Создание пользователя
		const newUser = await createUser(fullName, email, passwordHash, avatarUrl);

		// Генерация токена
		const token = generateToken({ id: newUser.id });

		// Возвращаем ответ с токеном
		res.status(201).json({
			message: "User registered successfully",
			id: newUser.id,
			fullName: newUser.fullName,
			email: newUser.email,
			avatarUrl: newUser.avatarUrl,
			createdAt: newUser.createdAt,
			token,
		});
	} catch (err) {
		console.error("Error during registration:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
