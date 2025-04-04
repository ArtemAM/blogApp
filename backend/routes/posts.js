import { Router } from "express";
import { validationResult } from "express-validator";
import { postValidation } from "../validations.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
	createPost,
	getAllPosts,
	getPostById,
	incrementPostViews,
	deletePostById,
	updatePostById,
} from "../services/postService.js";

const router = Router();

// Маршрут для создания статьи
router.post("/", authMiddleware, postValidation, async (req, res) => {
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
router.get("/", async (req, res) => {
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

// Маршрут для получения одной статьи
router.get("/:id", async (req, res) => {
	try {
		const postId = req.params.id; // Получаем ID статьи из параметров маршрута

		// Увеличиваем счетчик просмотров
		await incrementPostViews(postId);

		// Вызов функции для получения статьи из базы данных
		const post = await getPostById(postId);

		// Если статья не найдена, возвращаем 404
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		// Возвращаем данные статьи
		res.status(200).json(post);
	} catch (err) {
		console.error("Error fetching post:", err);
		res.status(500).json({ error: "Failed to fetch post" });
	}
});

// Маршрут для удаления статьи
router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		const postId = req.params.id; // Получаем ID статьи из параметров маршрута
		const userId = req.user.id; // Получаем ID пользователя из токена

		// Вызов функции для удаления статьи
		const deleted = await deletePostById(postId, userId);

		// Если статья не найдена или пользователь не является её автором
		if (!deleted) {
			return res.status(404).json({
				error: "Post not found or you are not authorized to delete this post",
			});
		}

		// Возвращаем успешный ответ
		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		console.error("Error deleting post:", err);
		res.status(500).json({ error: "Failed to delete post" });
	}
});

// Маршрут для обновления статьи
router.put("/:id", authMiddleware, postValidation, async (req, res) => {
	try {
		const postId = req.params.id; // Получаем ID статьи из параметров маршрута
		const userId = req.user.id; // Получаем ID пользователя из токена
		const { title, text, tags, imageUrl } = req.body; // Получаем данные для обновления

		// Вызов функции для обновления статьи
		const updated = await updatePostById(
			postId,
			userId,
			title,
			text,
			tags,
			imageUrl
		);

		// Если статья не найдена или пользователь не является её автором
		if (!updated) {
			return res.status(404).json({
				error: "Post not found or you are not authorized to update this post",
			});
		}

		// Возвращаем успешный ответ
		res.status(200).json({ message: "Post updated successfully", postId });
	} catch (err) {
		console.error("Error updating post:", err);
		res.status(500).json({ error: "Failed to update post" });
	}
});

export default router;
