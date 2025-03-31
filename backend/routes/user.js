import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { findUserById } from "../services/userService.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
	try {
		// Получаем ID пользователя из токена
		const userId = req.user.id;

		// Ищем пользователя в базе данных
		const user = await findUserById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Возвращаем данные пользователя
		res.status(200).json({
			id: user.id,
			fullName: user.fullName,
			email: user.email,
			avatarUrl: user.avatarUrl,
			createdAt: user.createdAt,
		});
	} catch (err) {
		console.error("Error fetching user data:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
