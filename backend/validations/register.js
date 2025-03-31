import { body } from "express-validator";

export const registerValidation = [
	// Валидация данных
	body("fullName").notEmpty().withMessage("Full name is required"),
	body("email").isEmail().withMessage("Invalid email format"),
	body("password")
		.isLength({ min: 4 })
		.withMessage("Password must be at least 6 characters long"),
	body("avatarUrl")
		.optional()
		.isURL()
		.withMessage("Avatar URL must be a valid URL"),
];
