import e from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./db.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import userRoute from "./routes/user.js";
import postsRoute from "./routes/posts.js";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoute from "./routes/upload.js";

dotenv.config();
const app = e();
const PORT = process.env.PORT;

// Определяем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Инициализация базы данных
initializeDatabase();

app.use(e.json());

// Подключение маршрутов
app.use("/", registerRoute);
app.use("/", loginRoute);
app.use("/", userRoute);
app.use("/", postsRoute);
app.use("/", uploadRoute);

// Раздача статических файлов из папки uploads
app.use("/uploads", e.static(path.join(__dirname, "uploads")));

// Обработка неизвестных маршрутов
app.use((req, res, next) => {
	res.status(404).json({ error: "Page not found" });
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}
	console.log(`Server is running on port ${PORT}`);
});
