import { Router } from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Маршрут для загрузки изображений
router.post("/", authMiddleware, upload.single("image"), (req, res) => {
	try {
		// Если файл был загружен, возвращаем путь к файлу
		if (!req.file) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		const imageUrl = `/uploads/${req.file.filename}`;
		res.status(201).json({ message: "File uploaded successfully", imageUrl });
	} catch (err) {
		console.error("Error uploading file:", err);
		res.status(500).json({ error: "Failed to upload file" });
	}
});

export default router;
