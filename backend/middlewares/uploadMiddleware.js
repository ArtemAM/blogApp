import multer from "multer";
import path from "path";

// Указываем папку для сохранения файлов
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Папка для сохранения файлов
	},
	filename: (req, file, cb) => {
		// Генерируем уникальное имя файла
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname); // Получаем расширение файла
		cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
	},
});

// Фильтр для проверки типа файла (например, только изображения)
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true); // Разрешаем загрузку
	} else {
		cb(new Error("Only image files are allowed"), false); // Отклоняем файл
	}
};

// Настраиваем multer
const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // Ограничение размера файла (5 MB)
});

export default upload;
