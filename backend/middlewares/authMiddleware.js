import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Authorization token is missing or invalid" });
	}

	const token = authHeader.split(" ")[1];

	try {
		// Проверяем токен и извлекаем данные пользователя
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded; // Сохраняем данные пользователя в объекте запроса
		next();
	} catch (err) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
};
