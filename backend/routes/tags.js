import { Router } from "express";
import { getTags } from "../services/tagService.js";

const router = Router();

// Роут для получения тегов
router.get("/", async (req, res) => {
	try {
		// Получаем список тегов из базы данных
		console.log("fetch");
		const tags = await getTags();
		console.log(tags);

		// Если теги не найдены, возвращаем пустой массив
		if (!tags || tags.length === 0) {
			return res.status(200).json([]);
		}

		// Возвращаем список тегов
		res.status(200).json(tags);
	} catch (err) {
		console.error("Error fetching tags:", err);
		res.status(500).json({ error: "Internal server error" });
	}
});

export default router;
