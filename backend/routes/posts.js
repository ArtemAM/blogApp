import { Router } from "express";
import { validationResult } from "express-validator";
import { postValidation } from "../validations.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createPost, getAllPosts } from "../services/postService.js";

const router = Router();

// Маршрут для создания статьи
router.post("/posts", authMiddleware, postValidation, async (req, res) => {
	// Проверка ошибок валидации
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, text, tags, imageUrl } = req.body;
	const userId = req.user.id; // Получаем ID пользователя из токена

	try {
		// Вызов функции для добавления статьи в базу данных
		const postId = await createPost(userId, title, text, tags, imageUrl);

		// Возвращаем успешный ответ с ID созданной статьи
		res.status(201).json({
			message: "Post created successfully",
			postId,
		});
	} catch (err) {
		console.error("Error creating post:", err);
		res.status(500).json({ error: "Failed to create post" });
	}
});

// Маршрут для получения всех статей
router.get("/posts", async (req, res) => {
	try {
		// Вызов функции для получения всех статей
		const posts = await getAllPosts();

		// Возвращаем список статей
		res.status(200).json(posts);
	} catch (err) {
		console.error("Error fetching posts:", err);
		res.status(500).json({ error: "Failed to fetch posts" });
	}
});

export default router;
