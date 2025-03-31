import e from "express";
import dotenv from "dotenv";
import { initializeDatabase } from "./db.js";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";

dotenv.config();
const app = e();
const PORT = process.env.PORT;

// Инициализация базы данных
initializeDatabase();

app.use(e.json());

// Подключение маршрутов
app.use("/", registerRoute);
app.use("/", loginRoute);

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}
	console.log(`Server is running on port ${PORT}`);
});
