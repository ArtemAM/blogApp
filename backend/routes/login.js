import { Router } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../services/userService.js";
import { generateToken } from "../utils/token.js";
import { loginValidation } from "../validations.js";

const router = Router();

router.post("/login", loginValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		// Проверяем, существует ли пользователь с таким email
		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Сравниваем хэш пароля
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
		if (!isPasswordValid) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		// Генерация токена
		const token = generateToken({ id: user.id });

		// Возвращаем токен и данные пользователя
		res.status(200).json({
			message: "Login successful",
			id: user.id,
			fullName: user.fullName,
			email: user.email,
			avatarUrl: user.avatarUrl,
			createdAt: user.createdAt,
			token,
		});
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
