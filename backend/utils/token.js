import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (payload) => {
	return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};
