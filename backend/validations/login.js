import { body } from "express-validator";

export const loginValidation = [
	// Валидация данных
	body("email").isEmail().withMessage("Invalid email format"),
	body("password").isLength({ min: 4 }).withMessage("Password is required"),
];
